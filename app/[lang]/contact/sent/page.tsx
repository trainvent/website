import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getDictionary } from "../../dictionaries";
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
		title: dict.contactSent.metadata.title,
		description: dict.contactSent.metadata.description,
	};
}

export default async function LocalizedContactSentPage({ params }: RouteProps) {
	const { lang } = await params;

	if (!hasLocale(lang)) {
		notFound();
	}

	const dict = await getDictionary(lang);

	return (
		<main className="site-shell">
			<div className="ambient ambient-top" aria-hidden="true" />
			<div className="ambient ambient-bottom" aria-hidden="true" />

			<section className="hero reveal">
				<p className="eyebrow">{dict.contactSent.eyebrow}</p>
				<h1>{dict.contactSent.title}</h1>
				<p className="hero-copy">{dict.contactSent.copy}</p>
				<div className="hero-actions">
					<Link className="btn btn-primary" href={`/${lang}`}>
						{dict.contactSent.backHome}
					</Link>
					<Link className="btn btn-secondary" href={`/${lang}/contact`}>
						{dict.contactSent.sendAnother}
					</Link>
				</div>
			</section>
		</main>
	);
}

