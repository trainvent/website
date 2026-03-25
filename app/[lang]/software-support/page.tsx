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

	const dict = await getDictionary(lang);

	return {
		title: dict.softwareSupport.metadata.title,
		description: dict.softwareSupport.metadata.description,
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
				currentPath="/software-support"
			/>

			<section className="hero connected-panel reveal reveal-delay-1">
				<p className="eyebrow">{dict.softwareSupport.eyebrow}</p>
				<h1>{dict.softwareSupport.title}</h1>
				<p className="hero-copy">
					{dict.softwareSupport.heroCopyBeforeEmail}{" "}
					<a href={`mailto:${supportEmail}`}>{supportEmail}</a>.{" "}
					{dict.softwareSupport.heroCopyAfterEmail}
				</p>
			</section>

			<section className="content-block reveal reveal-delay-2">
				<div className="section-head">
					<p className="eyebrow">{dict.softwareSupport.formEyebrow}</p>
					<h2>{dict.softwareSupport.formTitle}</h2>
				</div>
				<div className="contact-layout">
					<div className="contact-copy">
						<p className="body-copy">{dict.softwareSupport.formCopy}</p>
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
							value={dict.softwareSupport.formSubject}
						/>

						<label className="field">
							<span>{dict.softwareSupport.appLabel}</span>
							<select name="app" required defaultValue="">
								<option value="" disabled>
									{dict.softwareSupport.appPlaceholder}
								</option>
								<option value="stimmapp">
									{dict.softwareSupport.apps.stimmapp}
								</option>
								<option value="calcrow">
									{dict.softwareSupport.apps.calcrow}
								</option>
							</select>
						</label>

						<label className="field">
							<span>{dict.softwareSupport.emailLabel}</span>
							<input
								type="email"
								name="email"
								placeholder="you@example.com"
								autoComplete="email"
								required
							/>
						</label>

						<label className="field">
							<span>{dict.softwareSupport.requestTypeLabel}</span>
							<select name="requestType" required defaultValue="">
								<option value="" disabled>
									{dict.softwareSupport.requestTypePlaceholder}
								</option>
								<option value="account-access">
									{dict.softwareSupport.requestTypes.accountAccess}
								</option>
								<option value="bug-report">
									{dict.softwareSupport.requestTypes.bugReport}
								</option>
								<option value="billing-or-data">
									{dict.softwareSupport.requestTypes.billingOrData}
								</option>
								<option value="other">
									{dict.softwareSupport.requestTypes.other}
								</option>
							</select>
						</label>

						<label className="field">
							<span>{dict.softwareSupport.subjectLabel}</span>
							<input
								type="text"
								name="subject"
								placeholder={dict.softwareSupport.subjectPlaceholder}
								autoComplete="off"
								required
							/>
						</label>

						<label className="field">
							<span>{dict.softwareSupport.messageLabel}</span>
							<textarea
								name="message"
								placeholder={dict.softwareSupport.messagePlaceholder}
								rows={8}
								required
							/>
						</label>

						<div className="contact-form-actions">
							<button className="btn btn-primary" type="submit">
								{dict.softwareSupport.submitLabel}
							</button>
						</div>
					</form>
				</div>
			</section>
		</main>
	);
}
