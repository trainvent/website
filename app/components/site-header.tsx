import Image from "next/image";
import Link from "next/link";

import { getLocalizedHref, locales, type Locale } from "@/lib/i18n";

type NavItem = {
	href: string;
	label: string;
	external?: boolean;
};

type SiteHeaderProps = {
	navLabel?: string;
	brandHref?: string;
	brandAriaLabel?: string;
	navItems?: NavItem[];
	locale?: Locale;
	currentPath?: string;
	languageLabel?: string;
	localeNames?: Record<Locale, string>;
};

const defaultNavItems: NavItem[] = [
	{ href: "/", label: "Home" },
	{ href: "/contact", label: "Contact" },
	{ href: "/dev", label: "Sources" },
	{ href: "/imprint", label: "Imprint" },
];

export default function SiteHeader({
	navLabel = "Main navigation",
	brandHref = "/",
	brandAriaLabel = "Trainvent home",
	navItems = defaultNavItems,
	locale,
	currentPath = "/",
	languageLabel = "Language",
	localeNames = {
		en: "English",
		de: "German",
	},
}: SiteHeaderProps) {
	return (
		<header className="topbar reveal">
			<Link className="brand" href={brandHref} aria-label={brandAriaLabel}>
				<Image
					className="brand-logo"
					src="/LeLogo.png"
					alt="Trainvent logo"
					width={32}
					height={32}
					priority
				/>
				<span className="brand-name">Trainvent</span>
			</Link>
			<div className="topbar-actions">
				<nav className="topnav" aria-label={navLabel}>
					{navItems.map((item) =>
						item.external ? (
							<a
								key={item.href}
								href={item.href}
								target="_blank"
								rel="noopener noreferrer"
							>
								{item.label}
							</a>
						) : (
							<Link key={item.href} href={item.href}>
								{item.label}
							</Link>
						),
					)}
				</nav>
				{locale ? (
					<nav className="lang-switcher" aria-label={languageLabel}>
						{locales.map((itemLocale) => {
							const href = getLocalizedHref(itemLocale, currentPath);

							return itemLocale === locale ? (
								<span key={itemLocale} aria-current="page">
									{localeNames[itemLocale]}
								</span>
							) : (
								<Link key={itemLocale} href={href}>
									{localeNames[itemLocale]}
								</Link>
							);
						})}
					</nav>
				) : null}
			</div>
		</header>
	);
}
