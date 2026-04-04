import SiteHeader from "./site-header";
import type { Dictionary } from "../[lang]/dictionaries";
import { getLocalizedHref, type Locale } from "@/lib/i18n";

type LocalizedSiteHeaderProps = {
	locale: Locale;
	header: Dictionary["header"];
	navLabel: string;
	currentPath: string;
};

export default function LocalizedSiteHeader({
	locale,
	header,
	navLabel,
	currentPath,
}: LocalizedSiteHeaderProps) {
	return (
		<SiteHeader
			navLabel={navLabel}
			brandHref={getLocalizedHref(locale, "/")}
			brandAriaLabel={header.brandAriaLabel}
			navItems={[
				{ href: getLocalizedHref(locale, "/"), label: header.navItems.home },
				{
					href: getLocalizedHref(locale, "/contact"),
					label: header.navItems.contact,
				},
				{
					href: getLocalizedHref(locale, "/sources"),
					label: header.navItems.dev,
				},
			]}
			locale={locale}
			currentPath={currentPath}
			languageLabel={header.languageLabel}
			localeNames={header.localeNames}
		/>
	);
}
