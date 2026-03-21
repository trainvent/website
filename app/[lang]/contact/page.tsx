import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import { getDictionary } from "../dictionaries";
import SiteHeader from "../../components/site-header";
import { hasLocale } from "@/lib/i18n";

type RouteProps = {
	params: Promise<{ lang: string }>;
};

export async function generateMetadata({
	params,
}: RouteProps): Promise<Metadata> {
	const { lang } = await params;

	if (!hasLocale(lang)) {
		return {};
	}

	const dict = await getDictionary(lang);

	return {
		title: dict.contact.metadata.title,
		description: dict.contact.metadata.description,
	};
}

export default async function LocalizedContactPage({ params }: RouteProps) {
	const { lang } = await params;

	if (!hasLocale(lang)) {
		notFound();
	}

	const dict = await getDictionary(lang);
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

			<SiteHeader
				navLabel={dict.contact.navLabel}
				brandHref={`/${lang}`}
				brandAriaLabel={dict.header.brandAriaLabel}
				navItems={[
					{ href: `/${lang}`, label: dict.header.navItems.home },
					{ href: `/${lang}/contact`, label: dict.header.navItems.contact },
					{ href: `/${lang}/dev`, label: dict.header.navItems.dev },
					{ href: `/${lang}/imprint`, label: dict.header.navItems.imprint },
				]}
				locale={lang}
				currentPath="/contact"
				languageLabel={dict.header.languageLabel}
				localeNames={dict.header.localeNames}
			/>

			<section className="hero connected-panel reveal reveal-delay-1">
				<p className="eyebrow">{dict.contact.eyebrow}</p>
				<p className="hero-copy">
					{dict.contact.heroCopy}{" "}
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
						<input
							type="text"
							name="_honey"
							className="contact-honeypot"
							tabIndex={-1}
							autoComplete="off"
						/>

						<label className="field">
							<span>{dict.contact.emailLabel}</span>
							<input
								type="email"
								name="email"
								placeholder="you@example.com"
								autoComplete="email"
								required
							/>
						</label>

						<label className="field">
							<span>{dict.contact.messageLabel}</span>
							<textarea
								name="message"
								placeholder={dict.contact.messagePlaceholder}
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
							<p className="contact-optional-label">
								{dict.contact.optionalLabel}
							</p>

							<label className="field">
								<span>{dict.contact.phoneLabel}</span>
								<input
									type="tel"
									name="phone"
									placeholder="[+<cc>][<number>]"
									autoComplete="tel"
								/>
							</label>

							<label className="field">
								<span>{dict.contact.telegramLabel}</span>
								<input
									type="text"
									name="telegram"
									placeholder="@name"
									autoComplete="off"
								/>
							</label>
						</div>

						<div className="contact-form-actions">
							<button className="btn btn-primary" type="submit">
								{dict.contact.submitLabel}
							</button>
						</div>
					</form>
				</div>
			</section>
		</main>
	);
}

