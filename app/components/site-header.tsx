import Image from "next/image";
import Link from "next/link";

type SiteHeaderProps = {
	navLabel?: string;
};

const navItems = [
	{ href: "/", label: "Home" },
	{ href: "/contact", label: "Contact" },
	{ href: "/dev", label: "Sources" },
	{ href: "/imprint", label: "Imprint" },
];

export default function SiteHeader({
	navLabel = "Main navigation",
}: SiteHeaderProps) {
	return (
		<header className="topbar reveal">
			<Link className="brand" href="/" aria-label="Trainvent home">
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
			<nav className="topnav" aria-label={navLabel}>
				{navItems.map((item) => (
					<Link key={item.href} href={item.href}>
						{item.label}
					</Link>
				))}
			</nav>
		</header>
	);
}
