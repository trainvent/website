import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "./dictionaries";
import { hasLocale, locales } from "@/lib/i18n";

type LayoutProps = {
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
	return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await params;

	if (!hasLocale(lang)) {
		return {};
	}

	const dict = await getDictionary(lang);

	return {
		title: {
			default: dict.metadata.siteTitle,
			template: `%s | ${dict.metadata.siteTitle}`,
		},
		description: dict.metadata.siteDescription,
		alternates: {
			languages: {
				en: "/en",
				de: "/de",
			},
		},
	};
}

export default async function LocaleLayout({
	children,
	params,
}: LayoutProps) {
	const { lang } = await params;

	if (!hasLocale(lang)) {
		notFound();
	}

	return <div lang={lang}>{children}</div>;
}

