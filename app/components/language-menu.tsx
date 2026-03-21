"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { getLocalizedHref, locales, type Locale } from "@/lib/i18n";

type LanguageMenuProps = {
	locale: Locale;
	currentPath: string;
	languageLabel: string;
	localeNames: Record<Locale, string>;
};

const localeFlags: Record<Locale, string> = {
	en: "🇬🇧",
	de: "🇩🇪",
	nl: "🇳🇱",
	ja: "🇯🇵",
	hr: "🇭🇷",
};

export default function LanguageMenu({
	locale,
	currentPath,
	languageLabel,
	localeNames,
}: LanguageMenuProps) {
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handlePointerDown(event: MouseEvent) {
			if (!containerRef.current?.contains(event.target as Node)) {
				setOpen(false);
			}
		}

		function handleEscape(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setOpen(false);
			}
		}

		document.addEventListener("mousedown", handlePointerDown);
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("mousedown", handlePointerDown);
			document.removeEventListener("keydown", handleEscape);
		};
	}, []);

	return (
		<div className="lang-menu" ref={containerRef}>
			<button
				type="button"
				className="lang-menu-trigger"
				aria-haspopup="menu"
				aria-expanded={open}
				aria-label={languageLabel}
				onClick={() => setOpen((value) => !value)}
			>
				<span className="lang-menu-label">
					<span className="lang-menu-flag" aria-hidden="true">
						{localeFlags[locale]}
					</span>
					<span>{localeNames[locale]}</span>
				</span>
				<span className={`lang-menu-chevron${open ? " is-open" : ""}`} aria-hidden="true">
					▾
				</span>
			</button>
			{open ? (
				<div className="lang-menu-popover" role="menu" aria-label={languageLabel}>
					{locales.map((itemLocale) =>
						itemLocale === locale ? (
							<span
								key={itemLocale}
								className="lang-menu-item is-active"
								role="menuitem"
								aria-current="page"
							>
								<span className="lang-menu-label">
									<span className="lang-menu-flag" aria-hidden="true">
										{localeFlags[itemLocale]}
									</span>
									<span>{localeNames[itemLocale]}</span>
								</span>
							</span>
						) : (
							<Link
								key={itemLocale}
								href={getLocalizedHref(itemLocale, currentPath)}
								className="lang-menu-item"
								role="menuitem"
								onClick={() => setOpen(false)}
							>
								<span className="lang-menu-label">
									<span className="lang-menu-flag" aria-hidden="true">
										{localeFlags[itemLocale]}
									</span>
									<span>{localeNames[itemLocale]}</span>
								</span>
							</Link>
						),
					)}
				</div>
			) : null}
		</div>
	);
}
