import { redirect } from "next/navigation";

import { getLocalizedHref, hasLocale } from "@/lib/i18n";
import { getRedirectMetadata } from "@/lib/site";

type RouteProps = {
	params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: RouteProps) {
	const { lang } = await params;

	if (!hasLocale(lang)) {
		return {};
	}

	return getRedirectMetadata(getLocalizedHref(lang, "/sources"));
}

export default async function LocalizedDevPage({ params }: RouteProps) {
	const { lang } = await params;
	redirect(`/${lang}/sources/`);
}
