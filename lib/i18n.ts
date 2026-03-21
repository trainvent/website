export const locales = ["en", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function hasLocale(value: string): value is Locale {
	return locales.includes(value as Locale);
}

export function getLocalizedHref(locale: Locale, pathname: string) {
	if (!pathname || pathname === "/") {
		return `/${locale}`;
	}

	return `/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

