import ProjectFaviconImage from "./project-favicon-image";

type ProjectFaviconProps = {
	siteUrl: string;
	className?: string;
};

function createMonogramDataUri(url: URL) {
	const letter = (url.hostname.replace(/^www\./i, "")[0] ?? url.hostname[0] ?? "?").toUpperCase();
	const svg = `
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="${url.hostname}">
			<defs>
				<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stop-color="#0f172a" />
					<stop offset="100%" stop-color="#334155" />
				</linearGradient>
			</defs>
			<rect width="64" height="64" rx="14" fill="url(#g)" />
			<text x="32" y="41" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="30" font-weight="700" fill="#ffffff">${letter}</text>
		</svg>
	`.trim();

	return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function getFaviconCandidates(siteUrl: string) {
	const url = new URL(siteUrl);
	const hostname = url.hostname;

	return [
		`https://favicon.im/${hostname}`,
		`https://icon.horse/icon/${hostname}`,
		`https://icons.duckduckgo.com/ip3/${hostname}.ico`,
		`https://${hostname}/favicon.ico`,
		`https://${hostname}/favicon.svg`,
		`https://${hostname}/apple-touch-icon.png`,
		`https://${hostname}/icon.png`,
		createMonogramDataUri(url),
	];
}

export default function ProjectFavicon({
	siteUrl,
	className,
}: ProjectFaviconProps) {
	const candidates = getFaviconCandidates(siteUrl);

	return <ProjectFaviconImage candidates={candidates} className={className} />;
}
