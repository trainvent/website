import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "../dictionaries";
import LocalizedSiteHeader from "../../components/localized-site-header";
import { hasLocale } from "@/lib/i18n";

type RouteProps = {
	params: Promise<{ lang: string }>;
};

const supportEmail = "support@trainvent.com";

export async function generateMetadata({
	params,
}: RouteProps): Promise<Metadata> {
	const { lang } = await params;

	if (!hasLocale(lang)) {
		return {};
	}

	return {
		title: "Software Support",
		description: "General software support page with a short guide and contact form.",
	};
}

export default async function LocalizedSoftwareSupportPage({
	params,
}: RouteProps) {
	const { lang } = await params;

	if (!hasLocale(lang)) {
		notFound();
	}

	const dict = await getDictionary(lang);
	const formAction =
		process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ??
		"https://formspree.io/f/your-form-id";

	return (
		<main className="site-shell">
			<div className="ambient ambient-top" aria-hidden="true" />
			<div className="ambient ambient-bottom" aria-hidden="true" />

			<LocalizedSiteHeader
				navLabel={dict.contact.navLabel}
				header={dict.header}
				locale={lang}
				currentPath="/software-supprt"
			/>

			<section className="hero connected-panel reveal reveal-delay-1">
				<p className="eyebrow">Software support</p>
				<h1>Software support</h1>
				<p className="hero-copy">
					Use this page for support requests. You can also email{" "}
					<a href={`mailto:${supportEmail}`}>{supportEmail}</a>. Please contact us
					with the email address you registered with.
				</p>
			</section>

			<section className="content-block reveal reveal-delay-2">
				<div className="section-head">
					<p className="eyebrow">Contact support</p>
					<h2>Send your request</h2>
				</div>
				<div className="contact-layout">
					<div className="contact-copy">
						<p className="body-copy">
							Tell us what you need and include the details that matter for your
							request.
						</p>
					</div>

					<form
						className="contact-form"
						action={formAction}
						method="POST"
					>
						<input
							type="text"
							name="_honey"
							className="contact-honeypot"
							tabIndex={-1}
							autoComplete="off"
						/>
						<input
							type="hidden"
							name="_subject"
							value="Software support request"
						/>

						<label className="field">
							<span>App</span>
							<select name="app" required defaultValue="">
								<option value="" disabled>
									Choose the app
								</option>
								<option value="stimmapp">Stimmapp</option>
								<option value="calcrow">Calcrow</option>
							</select>
						</label>

						<label className="field">
							<span>Registered email</span>
							<input
								type="email"
								name="email"
								placeholder="you@example.com"
								autoComplete="email"
								required
							/>
						</label>

						<label className="field">
							<span>Request type</span>
							<select name="requestType" required defaultValue="">
								<option value="" disabled>
									Choose the request type
								</option>
								<option value="account-access">Account access</option>
								<option value="bug-report">Bug report</option>
								<option value="billing-or-data">Billing or data question</option>
								<option value="other">Other support request</option>
							</select>
						</label>

						<label className="field">
							<span>Subject</span>
							<input
								type="text"
								name="subject"
								placeholder="Short summary of the issue"
								autoComplete="off"
								required
							/>
						</label>

						<label className="field">
							<span>Message</span>
							<textarea
								name="message"
								placeholder="Describe your request and include the relevant details."
								rows={8}
								required
							/>
						</label>

						<div className="contact-form-actions">
							<button className="btn btn-primary" type="submit">
								Send support request
							</button>
						</div>
					</form>
				</div>
			</section>
		</main>
	);
}
