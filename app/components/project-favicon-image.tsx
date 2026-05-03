"use client";

import { useState } from "react";

type ProjectFaviconImageProps = {
	candidates: string[];
	className?: string;
};

export default function ProjectFaviconImage({
	candidates,
	className,
}: ProjectFaviconImageProps) {
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
