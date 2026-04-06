"use client";

import { useState } from "react";

type ProjectFaviconProps = {
	siteUrl: string;
	className?: string;
};

function getFaviconCandidates(siteUrl: string) {
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

export default function ProjectFavicon({
	siteUrl,
	className,
}: ProjectFaviconProps) {
	const candidates = getFaviconCandidates(siteUrl);
	const [candidateIndex, setCandidateIndex] = useState(0);

	return (
		// External favicons stay tiny and don't benefit from Next image optimization.
		// eslint-disable-next-line @next/next/no-img-element
		<img
			className={className}
			src={candidates[candidateIndex]}
			alt=""
			width={16}
			height={16}
			loading="lazy"
			decoding="async"
			onError={() => {
				setCandidateIndex((currentIndex) =>
					currentIndex < candidates.length - 1 ? currentIndex + 1 : currentIndex,
				);
			}}
		/>
	);
}
