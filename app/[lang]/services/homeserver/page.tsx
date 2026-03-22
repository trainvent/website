import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "../../dictionaries";
import LocalizedSiteHeader from "../../../components/localized-site-header";
import { hasLocale } from "@/lib/i18n";

type RouteProps = {
	params: Promise<{ lang: string }>;
};

const bookingUrl =
	"https://cloud.aiomvp.com/apps/calendar/appointment/xKz2fRgR7kj6";

const featureKeys = [
	"contacts",
	"calendar",
	"notes",
	"tasks",
	"passwords",
	"files",
] as const;

export async function generateMetadata({
	params,
}: RouteProps): Promise<Metadata> {
	const { lang } = await params;

	if (!hasLocale(lang)) {
		return {};
	}

	const dict = await getDictionary(lang);

	return {
		title: dict.homeserver.metadata.title,
		description: dict.homeserver.metadata.description,
	};
}

function NextcloudLogo() {
	return (
		<svg
			className="nextcloud-logo"
			viewBox="0 0 160 64"
			role="img"
			aria-label="Nextcloud logo"
		>
			<circle cx="26" cy="32" r="10" />
			<circle cx="80" cy="32" r="10" />
			<circle cx="134" cy="32" r="10" />
			<path d="M36 32h34a10 10 0 0 1 20 0h34" />
		</svg>
	);
}

function HomeserverGraphic() {
	return (
		<div className="homeserver-graphic" aria-hidden="true">
			<div className="homeserver-screen">
				<div className="homeserver-toolbar">
					<span />
					<span />
					<span />
				</div>
				<div className="homeserver-cloud">
					<NextcloudLogo />
				</div>
				<div className="homeserver-sync">
					<div className="homeserver-device homeserver-device-phone" />
					<div className="homeserver-device homeserver-device-server" />
					<div className="homeserver-device homeserver-device-laptop" />
				</div>
			</div>
		</div>
	);
}

function FeatureIcon({ feature }: { feature: typeof featureKeys[number] }) {
	switch (feature) {
		case "contacts":
			return (
				<svg viewBox="0 0 64 64" aria-hidden="true">
					<circle cx="32" cy="23" r="10" />
					<path d="M15 50c2-9 11-14 17-14s15 5 17 14" />
				</svg>
			);
		case "calendar":
			return (
				<svg viewBox="0 0 64 64" aria-hidden="true">
					<rect x="12" y="16" width="40" height="34" rx="6" />
					<path d="M12 26h40M22 12v8M42 12v8M22 34h8M34 34h8M22 42h8" />
				</svg>
			);
		case "notes":
			return (
				<svg viewBox="0 0 64 64" aria-hidden="true">
					<path d="M18 12h20l8 8v32H18z" />
					<path d="M38 12v10h8M24 30h16M24 38h16M24 46h10" />
				</svg>
			);
		case "tasks":
			return (
				<svg viewBox="0 0 64 64" aria-hidden="true">
					<rect x="14" y="14" width="36" height="36" rx="6" />
					<path d="M22 28l5 5 13-13M22 40h20" />
				</svg>
			);
		case "passwords":
			return (
				<svg viewBox="0 0 64 64" aria-hidden="true">
					<rect x="16" y="28" width="32" height="22" rx="5" />
					<path d="M23 28v-6a9 9 0 0 1 18 0v6M32 36v7" />
					<circle cx="32" cy="36" r="1.5" fill="currentColor" stroke="none" />
				</svg>
			);
		default:
			return (
				<svg viewBox="0 0 64 64" aria-hidden="true">
					<path d="M12 24h16l4 4h20v20a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4z" />
					<path d="M12 24v-8a4 4 0 0 1 4-4h12l4 4h12a4 4 0 0 1 4 4v4" />
				</svg>
			);
	}
}

export default async function LocalizedHomeserverPage({ params }: RouteProps) {
	const { lang } = await params;

	if (!hasLocale(lang)) {
		notFound();
	}

	const dict = await getDictionary(lang);

	return (
		<main className="site-shell">
			<LocalizedSiteHeader
				navLabel={dict.homeserver.navLabel}
				header={dict.header}
				locale={lang}
				currentPath="/services/homeserver"
			/>
			<section className="content-block connected-panel reveal reveal-delay-1">
				<div className="service-hero-layout">
					<div>
						<div className="section-head">
							<p className="eyebrow">{dict.homeserver.eyebrow}</p>
							<h1>{dict.homeserver.title}</h1>
						</div>
						<div className="service-badge-row">
							<NextcloudLogo />
							<span className="service-badge">{dict.homeserver.badge}</span>
						</div>
						<p className="body-copy">{dict.homeserver.copy}</p>
						<div className="hero-actions">
							<a
								className="btn btn-primary"
								href={bookingUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								{dict.homeserver.bookCta}
							</a>
							<a className="btn btn-secondary" href="mailto:leon@trainvent.com">
								{dict.homeserver.mailCta}
							</a>
						</div>
					</div>
					<HomeserverGraphic />
				</div>
			</section>

			<section className="content-block reveal reveal-delay-2">
				<div className="section-head">
					<p className="eyebrow">{dict.homeserver.detailsEyebrow}</p>
					<h2>{dict.homeserver.detailsTitle}</h2>
				</div>
				<p className="body-copy">{dict.homeserver.detailsCopy}</p>
				<div className="feature-grid">
					{featureKeys.map((feature) => (
						<article key={feature} className="feature-card">
							<div className="feature-icon">
								<FeatureIcon feature={feature} />
							</div>
							<div>
								<h3>{dict.homeserver.features[feature].name}</h3>
								<p>{dict.homeserver.features[feature].description}</p>
							</div>
						</article>
					))}
				</div>
			</section>

			<section className="content-block reveal reveal-delay-3">
				<div className="section-head">
					<p className="eyebrow">{dict.homeserver.helpEyebrow}</p>
					<h2>{dict.homeserver.helpTitle}</h2>
				</div>
				<div className="cards">
					<article className="card">
						<h3>{dict.homeserver.helpCards.planning.title}</h3>
						<p>{dict.homeserver.helpCards.planning.description}</p>
					</article>
					<article className="card">
						<h3>{dict.homeserver.helpCards.installation.title}</h3>
						<p>{dict.homeserver.helpCards.installation.description}</p>
					</article>
					<article className="card">
						<h3>{dict.homeserver.helpCards.support.title}</h3>
						<p>{dict.homeserver.helpCards.support.description}</p>
					</article>
				</div>
			</section>

			<section className="content-block reveal reveal-delay-4">
				<div className="section-head">
					<p className="eyebrow">{dict.homeserver.pricingEyebrow}</p>
					<h2>{dict.homeserver.pricingTitle}</h2>
				</div>
				<p className="body-copy">{dict.homeserver.pricingCopy}</p>
				<div className="team-contact service-contact-list">
					<a href={bookingUrl} target="_blank" rel="noopener noreferrer">
						{dict.homeserver.bookLink}
					</a>
					<a href="mailto:leon@trainvent.com">leon@trainvent.com</a>
					<a href="https://t.me/lmarquar" target="_blank" rel="noopener noreferrer">
						{dict.homeserver.telegramLabel}: @lmarquar
					</a>
					<a href="tel:+49160345542">+49 160 345542</a>
				</div>
			</section>
		</main>
	);
}
