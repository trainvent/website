import ProjectFaviconImage from "./project-favicon-image";

type ProjectFaviconProps = {
	siteUrl: string;
	className?: string;
};

function getFallbackFaviconCandidates(siteUrl: string) {
	const url = new URL(siteUrl);
	const origin = url.origin;
	const hostname = url.hostname;

	return [
		`${origin}/favicon.ico`,
		`${origin}/favicon.svg`,
		`${origin}/apple-touch-icon.png`,
		`${origin}/icon.png`,
		`https://icons.duckduckgo.com/ip3/${hostname}.ico`,
	];
}

function extractIconHrefs(html: string, siteUrl: string) {
	const hrefs = new Set<string>();

	for (const linkTag of html.match(/<link\b[^>]*>/gi) ?? []) {
		const relMatch = linkTag.match(/rel=(?:"([^"]*)"|'([^']*)')/i);
		const hrefMatch = linkTag.match(/href=(?:"([^"]*)"|'([^']*)')/i);

		const rel = relMatch?.[1] ?? relMatch?.[2] ?? "";
		const href = hrefMatch?.[1] ?? hrefMatch?.[2];

		if (!href || !/(^|\s)(icon|apple-touch-icon)(\s|$)/i.test(rel)) {
			continue;
		}

		hrefs.add(new URL(href, siteUrl).toString());
	}

	return [...hrefs];
}

async function getFaviconCandidates(siteUrl: string) {
	const fallbackCandidates = getFallbackFaviconCandidates(siteUrl);

	try {
		const response = await fetch(siteUrl, {
			cache: "force-cache",
			headers: {
				accept: "text/html,application/xhtml+xml",
			},
			redirect: "follow",
		});

		if (!response.ok) {
			return fallbackCandidates;
		}

		const html = await response.text();
		const discoveredCandidates = extractIconHrefs(html, siteUrl);

		return [...discoveredCandidates, ...fallbackCandidates];
	} catch {
		return fallbackCandidates;
	}
}

export default async function ProjectFavicon({
	siteUrl,
	className,
}: ProjectFaviconProps) {
	const candidates = await getFaviconCandidates(siteUrl);

	return (
		<ProjectFaviconImage
			candidates={candidates}
			className={className}
		/>
	);
}
