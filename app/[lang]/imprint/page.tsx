import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "../dictionaries";
import LocalizedSiteHeader from "../../components/localized-site-header";
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
		title: dict.imprint.metadata.title,
		description: dict.imprint.metadata.description,
	};
}

export default async function LocalizedImprintPage({ params }: RouteProps) {
	const { lang } = await params;

	if (!hasLocale(lang)) {
		notFound();
	}

	const dict = await getDictionary(lang);

	return (
		<main className="site-shell">
			<LocalizedSiteHeader
				navLabel={dict.imprint.navLabel}
				header={dict.header}
				locale={lang}
				currentPath="/imprint"
			/>
			<section className="content-block connected-panel reveal reveal-delay-1">
				<p>{dict.imprint.providerLabel}</p>
				<address>
					<strong>Trainvent, owner Leon Marquardt</strong>
					<br />
					Ravensbergerstraße 75
					<br />
					33602 Bielefeld
					<br />
					{dict.imprint.phoneLabel}: +49 160 3455942
					<br />
					{dict.imprint.emailLabel}:{" "}
					<a href="mailto:support@trainvent.com">support@trainvent.com</a>
					<br />
					{dict.imprint.companyNumberLabel}: 143513874102001
					<br />
					{dict.imprint.responsibleLabel}: Leon Marquardt
				</address>
			</section>
		</main>
	);
}
