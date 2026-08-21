import type { MetadataRoute } from "next";

import { getAbsoluteUrl, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: getAbsoluteUrl("/sitemap.xml"),
		host: siteUrl.origin,
	};
}
