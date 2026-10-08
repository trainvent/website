"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";

type Labels = { label: string; help: string; error: string; preparing: string; notice: string; success: string; failed: string; uncertain: string; captcha: string };
type CaptchaWindow = Window & { hcaptcha?: {
	render: (element: HTMLElement, options: Record<string, unknown>) => string;
	remove: (widget: string) => void;
} };
const MAX_BYTES = 10 * 1024 * 1024;

function encodeFile(file: File): Promise<{ name: string; type: string; data: string }> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => reject(new Error("File read failed"));
		reader.onload = () => resolve({ name: file.name, type: file.type, data: String(reader.result).split(",")[1] });
		reader.readAsDataURL(file);
	});
}

export default function GoogleSupportForm({ endpoint, fallbackAction, labels, locale, siteKey, submitLabel, children }: {
	endpoint?: string; siteKey: string; submitLabel: string; fallbackAction: string; labels: Labels; locale: string; children: ReactNode;
}) {
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const frameName = `support-${useId().replace(/:/g, "")}`;
	const pending = useRef<string | null>(null);
	const captchaHost = useRef<HTMLDivElement>(null);
	const captchaWidget = useRef<string | null>(null);
	const captchaToken = useRef("");
	const [captchaVersion, setCaptchaVersion] = useState(0);
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		let disposed = false;
		const render = () => {
			const api = (window as CaptchaWindow).hcaptcha;
			if (disposed || !api || !siteKey || !captchaHost.current || captchaWidget.current !== null) return;
			captchaWidget.current = api.render(captchaHost.current, {
				sitekey: siteKey, hl: locale, theme: "light",
				callback: (token: string) => { captchaToken.current = token; },
				"expired-callback": () => { captchaToken.current = ""; },
				"error-callback": () => { captchaToken.current = ""; },
			});
		};
		render();
		const interval = setInterval(render, 200);
		return () => {
			disposed = true;
			clearInterval(interval);
			if (captchaWidget.current !== null) (window as CaptchaWindow).hcaptcha?.remove(captchaWidget.current);
			captchaWidget.current = null;
			captchaToken.current = "";
		};
	}, [siteKey, locale, success, captchaVersion]);

	useEffect(() => {
		function receive(event: MessageEvent) {
			// Google renders HtmlService inside a nested googleusercontent frame.
			// A random nonce ties its response to this submission, even across frames.
			if (!/^https:\/\/(?:script\.google\.com|(?:[a-z0-9-]+-)?script\.googleusercontent\.com)$/.test(event.origin)) return;
			const result = event.data;
			if (!result || result.type !== "trainvent-support-result" || !pending.current || result.nonce !== pending.current || typeof result.ok !== "boolean") return;
			if (timer.current) clearTimeout(timer.current);
			pending.current = null;
			setBusy(false);
			if (result.ok) { setSuccess(true); setError(""); }
			else { setError(labels.failed); setCaptchaVersion(version => version + 1); }
		}
		window.addEventListener("message", receive);
		return () => {
			window.removeEventListener("message", receive);
			if (timer.current) clearTimeout(timer.current);
		};
	}, [labels.failed]);

	async function submit(event: FormEvent<HTMLFormElement>) {
		if (!captchaToken.current) { event.preventDefault(); setError(labels.captcha); return; }
		if (!endpoint) return;
		event.preventDefault();
		if (busy || pending.current || success) return;
		const form = event.currentTarget;
		const values = new FormData(form);
		const files = values.getAll("attachments").filter((value): value is File => value instanceof File && value.size > 0);
		if (files.length > 3 || files.reduce((total, file) => total + file.size, 0) > MAX_BYTES) {
			setError(labels.error);
			return;
		}
		setError("");
		setBusy(true);
		try {
			const nonce = crypto.randomUUID();
			pending.current = nonce;
			const payload = Object.fromEntries(["app", "email", "requestType", "subject", "message", "_honey"].map(key => [key, String(values.get(key) ?? "")]));
			const input = document.createElement("input");
			input.type = "hidden";
			input.name = "payload";
			input.value = JSON.stringify({ ...payload, locale, nonce, returnOrigin: window.location.origin, captchaToken: captchaToken.current, files: await Promise.all(files.map(encodeFile)) });
			form.querySelector('input[name="payload"]')?.remove();
			form.appendChild(input);
			// POST to an invisible frame; only a confirmed Google response signals success.
			form.target = frameName;
			timer.current = setTimeout(() => {
				// Keep retry disabled: the request may have been saved despite a lost response.
				setError(labels.uncertain);
			}, 90000);
			HTMLFormElement.prototype.submit.call(form);
		} catch {
			pending.current = null;
			if (timer.current) clearTimeout(timer.current);
			setError(labels.error);
			setBusy(false);
		}
	}

	return <>
		<Script src="https://js.hcaptcha.com/1/api.js" strategy="afterInteractive" />
		{endpoint && <iframe name={frameName} title="Support submission response" hidden />}
		{success ? <div className="contact-form support-contact-form" role="status">{labels.success}</div> : <form className="contact-form support-contact-form" action={endpoint || fallbackAction} method="POST" onSubmit={submit}>
		{endpoint && <>
			<label className="field">
				<span>{labels.label}</span>
				<input type="file" name="attachments" multiple aria-describedby="support-upload-help" disabled={busy} />
				<small id="support-upload-help">{labels.help}</small>
			</label>
			<p className="body-copy">{labels.notice}</p>
		</>}
		<fieldset disabled={busy} className="support-form-fields">{children}</fieldset>
		<div ref={captchaHost} className="support-captcha" />
		<div className="contact-form-actions"><button className="btn btn-primary" type="submit" disabled={busy}>{submitLabel}</button></div>
		<p role="status" aria-live="polite">{error || (busy ? labels.preparing : "")}</p>
	</form>}
	</>;
}
