"use client";

import { useEffect } from "react";

import { defaultLocale } from "@/lib/i18n";

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
		window.location.replace(`/${nextLocale}`);
	}, []);

	return null;
}
