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

export async function generateMetadata({
	params,
}: RouteProps): Promise<Metadata> {
	const { lang } = await params;

	if (!hasLocale(lang)) {
		return {};
	}

	const dict = await getDictionary(lang);

	return {
		title: dict.bikeRepair.metadata.title,
		description: dict.bikeRepair.metadata.description,
	};
}

export default async function LocalizedBikeRepairPage({ params }: RouteProps) {
	const { lang } = await params;

	if (!hasLocale(lang)) {
		notFound();
	}

	const dict = await getDictionary(lang);

	return (
		<main className="site-shell">
			<LocalizedSiteHeader
				navLabel={dict.bikeRepair.navLabel}
				header={dict.header}
				locale={lang}
				currentPath="/services/bike-repair"
			/>
			<section className="content-block connected-panel reveal reveal-delay-1">
				<div className="section-head">
					<p className="eyebrow">{dict.bikeRepair.eyebrow}</p>
					<h1>{dict.bikeRepair.title}</h1>
				</div>
				<p className="body-copy">{dict.bikeRepair.copyOne}</p>
				<p className="body-copy">{dict.bikeRepair.copyTwo}</p>
				<div className="hero-actions">
					<a
						className="btn btn-primary"
						href={bookingUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						{dict.bikeRepair.bookCta}
					</a>
					<a className="btn btn-secondary" href="mailto:leon@trainvent.com">
						{dict.bikeRepair.mailCta}
					</a>
				</div>
			</section>

			<section className="content-block reveal reveal-delay-2">
				<div className="section-head">
					<p className="eyebrow">{dict.bikeRepair.helpEyebrow}</p>
					<h2>{dict.bikeRepair.helpTitle}</h2>
				</div>
				<div className="cards">
					<article className="card">
						<h3>{dict.bikeRepair.helpCards.drivetrain.title}</h3>
						<p>{dict.bikeRepair.helpCards.drivetrain.description}</p>
					</article>
					<article className="card">
						<h3>{dict.bikeRepair.helpCards.wear.title}</h3>
						<p>{dict.bikeRepair.helpCards.wear.description}</p>
					</article>
					<article className="card">
						<h3>{dict.bikeRepair.helpCards.handoff.title}</h3>
						<p>{dict.bikeRepair.helpCards.handoff.description}</p>
					</article>
				</div>
			</section>

			<section className="content-block reveal reveal-delay-3">
				<div className="section-head">
					<p className="eyebrow">{dict.bikeRepair.pricingEyebrow}</p>
					<h2>{dict.bikeRepair.pricingTitle}</h2>
				</div>
				<p className="body-copy">{dict.bikeRepair.pricingCopy}</p>
				<div className="team-contact service-contact-list">
					<a href={bookingUrl} target="_blank" rel="noopener noreferrer">
						{dict.bikeRepair.bookLink}
					</a>
					<a href="mailto:leon@trainvent.com">leon@trainvent.com</a>
					<a href="https://t.me/lmarquar" target="_blank" rel="noopener noreferrer">
						{dict.bikeRepair.telegramLabel}: @lmarquar
					</a>
					<a href="tel:+49160345542">+49 160 345542</a>
				</div>
			</section>
		</main>
	);
}
