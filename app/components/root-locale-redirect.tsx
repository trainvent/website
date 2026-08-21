"use client";

import { useEffect } from "react";

import { defaultLocale } from "@/lib/i18n";

const languageLinks = [
	{ href: "/en/", label: "English" },
	{ href: "/de/", label: "Deutsch" },
	{ href: "/nl/", label: "Nederlands" },
	{ href: "/ja/", label: "日本語" },
	{ href: "/hr/", label: "Hrvatski" },
];

function detectLocale() {
	const languages = navigator.languages?.length
		? navigator.languages
		: [navigator.language];

	for (const language of languages) {
		const normalized = language.toLowerCase();

		if (normalized === "hr" || normalized.startsWith("hr-")) {
			return "hr";
		}

		if (normalized === "ja" || normalized.startsWith("ja-")) {
			return "ja";
		}

		if (normalized === "nl" || normalized.startsWith("nl-")) {
			return "nl";
		}

		if (normalized === "de" || normalized.startsWith("de-")) {
			return "de";
		}
	}

	return defaultLocale;
}

export default function RootLocaleRedirect() {
	useEffect(() => {
		const nextLocale = detectLocale();
		window.location.replace(`/${nextLocale}/`);
	}, []);

	return (
		<main className="site-shell">
			<section className="hero connected-panel">
				<p className="eyebrow">Trainvent</p>
				<h1>Choose your language</h1>
				<p className="hero-copy">
					We are taking you to the version that best matches your browser.
				</p>
				<nav className="hero-actions" aria-label="Available languages">
					{languageLinks.map((language) => (
						<a className="btn btn-secondary" href={language.href} key={language.href}>
							{language.label}
						</a>
					))}
				</nav>
			</section>
		</main>
	);
}
