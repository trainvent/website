import type { Dictionary } from "../[lang]/dictionaries";
import { getLocalizedHref, type Locale } from "@/lib/i18n";

type LocalizedSiteFooterProps = {
	locale: Locale;
	labels: Dictionary["home"];
};

export default function LocalizedSiteFooter({
	locale,
	labels,
}: LocalizedSiteFooterProps) {
	return (
		<footer className="site-footer">
			<small>
				<a href={getLocalizedHref(locale, "/imprint")}>
					{labels.footerImprint}
				</a>
				{" · "}
				<a href={getLocalizedHref(locale, "/software-support")}>
					{labels.footerSupport}
				</a>
			</small>
		</footer>
	);
}
