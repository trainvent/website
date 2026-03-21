import type { Metadata } from "next";
import { notFound } from "next/navigation";

import DevPageClient from "../../components/dev-page-client";
import { getDictionary } from "../dictionaries";
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
		title: dict.dev.metadata.title,
		description: dict.dev.metadata.description,
	};
}

export default async function LocalizedDevPage({ params }: RouteProps) {
	const { lang } = await params;

	if (!hasLocale(lang)) {
		notFound();
	}

	const dict = await getDictionary(lang);

	return <DevPageClient dict={dict.dev} header={dict.header} locale={lang} />;
}
