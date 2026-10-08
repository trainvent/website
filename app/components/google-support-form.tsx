"use client";

import { useState, type FormEvent, type ReactNode } from "react";

type Labels = { label: string; help: string; error: string; preparing: string; notice: string };
const MAX_BYTES = 10 * 1024 * 1024;

function encodeFile(file: File): Promise<{ name: string; type: string; data: string }> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => reject(new Error("File read failed"));
		reader.onload = () => resolve({ name: file.name, type: file.type, data: String(reader.result).split(",")[1] });
		reader.readAsDataURL(file);
	});
}

export default function GoogleSupportForm({ endpoint, fallbackAction, labels, locale, children }: {
	endpoint?: string; fallbackAction: string; labels: Labels; locale: string; children: ReactNode;
}) {
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState(false);

	async function submit(event: FormEvent<HTMLFormElement>) {
		if (!endpoint) return;
		event.preventDefault();
		if (busy) return;
		const form = event.currentTarget;
		const values = new FormData(form);
		const files = values.getAll("attachments").filter((value): value is File => value instanceof File && value.size > 0);
		if (files.length > 3 || files.reduce((total, file) => total + file.size, 0) > MAX_BYTES) {
			setError(true);
			return;
		}
		setError(false);
		setBusy(true);
		try {
			const payload = Object.fromEntries(["app", "email", "requestType", "subject", "message", "_honey"].map(key => [key, String(values.get(key) ?? "")]));
			const input = document.createElement("input");
			input.type = "hidden";
			input.name = "payload";
			input.value = JSON.stringify({ ...payload, locale, files: await Promise.all(files.map(encodeFile)) });
			form.querySelector('input[name="payload"]')?.remove();
			form.appendChild(input);
			// Native navigation avoids Apps Script's cross-origin response restrictions.
			HTMLFormElement.prototype.submit.call(form);
		} catch {
			setError(true);
			setBusy(false);
		}
	}

	return <form className="contact-form support-contact-form" action={endpoint || fallbackAction} method="POST" onSubmit={submit}>
		{endpoint && <>
			<label className="field">
				<span>{labels.label}</span>
				<input type="file" name="attachments" multiple aria-describedby="support-upload-help" disabled={busy} />
				<small id="support-upload-help">{labels.help}</small>
			</label>
			<p className="body-copy">{labels.notice}</p>
		</>}
		<fieldset disabled={busy} className="support-form-fields">{children}</fieldset>
		<p role="status" aria-live="polite">{busy ? labels.preparing : error ? labels.error : ""}</p>
	</form>;
}
