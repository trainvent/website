import type { MetadataRoute } from "next";

import { getLocalizedHref, locales } from "@/lib/i18n";
import {
	getAbsoluteUrl,
	getPageAlternates,
	indexablePaths,
} from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	return indexablePaths.flatMap((pathname) =>
		locales.map((locale) => ({
			url: getAbsoluteUrl(getLocalizedHref(locale, pathname)),
			changeFrequency: pathname === "/" ? "weekly" : "monthly",
			priority: pathname === "/" ? 1 : 0.7,
			alternates: {
				languages: getPageAlternates(locale, pathname).languages,
			},
		})),
	);
}
