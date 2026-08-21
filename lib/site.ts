import type { Metadata } from "next";

import { getLocalizedHref, locales, type Locale } from "@/lib/i18n";

const configuredSiteUrl =
	process.env.NEXT_PUBLIC_SITE_URL ?? "https://next.trainvent.com";

export const siteUrl = new URL(
	configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`,
);

export const indexablePaths = [
	"/",
	"/contact",
	"/imprint",
	"/software-support",
	"/sources",
	"/services/bike-repair",
	"/services/homeserver",
] as const;

export function getAbsoluteUrl(pathname: string) {
	return new URL(pathname.replace(/^\//, ""), siteUrl).toString();
}

export function getPageAlternates(locale: Locale, pathname: string) {
	const languages = Object.fromEntries(
		locales.map((itemLocale) => [
			itemLocale,
			getAbsoluteUrl(getLocalizedHref(itemLocale, pathname)),
		]),
	);

	return {
		canonical: getAbsoluteUrl(getLocalizedHref(locale, pathname)),
		languages: {
			...languages,
			"x-default": getAbsoluteUrl(getLocalizedHref("en", pathname)),
		},
	};
}

export function getRedirectMetadata(targetPath: string): Metadata {
	return {
		alternates: {
			canonical: getAbsoluteUrl(targetPath),
		},
		robots: {
			index: false,
			follow: true,
		},
	};
}
