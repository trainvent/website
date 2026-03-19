import type { Metadata } from "next";
import Script from "next/script";
import SiteHeader from "../components/site-header";

export const metadata: Metadata = {
	title: "Contact | Trainvent",
	description:
		"Contact Trainvent with your email, optional phone number or Telegram, and a short project message.",
};

export default function ContactPage() {
	const formAction =
		process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ??
		"https://formspree.io/f/your-form-id";
	const hcaptchaSiteKey =
		process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY ??
		"10000000-ffff-ffff-ffff-000000000001";

	return (
		<main className="site-shell">
			<Script
				src="https://js.hcaptcha.com/1/api.js"
				strategy="afterInteractive"
				async
				defer
			/>
			<div className="ambient ambient-top" aria-hidden="true" />
			<div className="ambient ambient-bottom" aria-hidden="true" />

			<SiteHeader navLabel="Contact page navigation" />

			<section className="hero connected-panel reveal reveal-delay-1">
				<p className="eyebrow">Contact</p>
				<p className="hero-copy">
					If you prefer not to use the form, you can also email us directly at:{" "}
					<a href="mailto:hello@trainvent.com">hello@trainvent.com</a>
				</p>
			</section>

			<section className="content-block reveal reveal-delay-2">
				<div className="contact-layout">
					<form
						className="contact-form contact-form-full"
						action={formAction}
						method="POST"
					>
						<input type="text" name="_honey" className="contact-honeypot" tabIndex={-1} autoComplete="off" />

						<label className="field">
							<span>Your email</span>
							<input
								type="email"
								name="email"
								placeholder="you@example.com"
								autoComplete="email"
								required
							/>
						</label>

						<label className="field">
							<span>Message</span>
							<textarea
								name="message"
								placeholder="Tell us what you need."
								rows={7}
								required
							/>
						</label>

						<div
							className="h-captcha"
							data-sitekey={hcaptchaSiteKey}
							data-theme="light"
						/>

						<div className="contact-optional">
							<p className="contact-optional-label">Optional alternative contact</p>

							<label className="field">
								<span>Phone number</span>
								<input
									type="tel"
									name="phone"
									placeholder="+49..."
									autoComplete="tel"
								/>
							</label>

							<label className="field">
								<span>Telegram</span>
								<input
									type="text"
									name="telegram"
									placeholder="@username"
									autoComplete="off"
								/>
							</label>
						</div>

						<div className="contact-form-actions">
							<button className="btn btn-primary" type="submit">
								Send message
							</button>
							<a className="btn btn-secondary" href="mailto:hello@trainvent.com">
								Email hello@trainvent.com
							</a>
						</div>
					</form>
				</div>
			</section>
		</main>
	);
}
