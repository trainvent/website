import { createHash } from "node:crypto";
import Image from "next/image";
import { notFound } from "next/navigation";

import type { Dictionary } from "./dictionaries";
import { getDictionary } from "./dictionaries";
import LocalizedSiteHeader from "../components/localized-site-header";
import { getLocalizedHref, hasLocale } from "@/lib/i18n";

type RouteProps = {
	params: Promise<{ lang: string }>;
};

type ProjectSiteKey = keyof Dictionary["home"]["projectDescriptions"];
type TeamMemberKey = keyof Dictionary["home"]["teamRoles"];

const projectSites: Array<{
	key: ProjectSiteKey;
	url: string;
	note?: "unprototyped";
}> = [
	{ key: "caesim", url: "https://caesim.com", note: "unprototyped" },
	{ key: "calcrow", url: "https://calcrow.com" },
	{ key: "stimmapp", url: "https://stimmapp.net" },
	{ key: "portopener", url: "https://portopener.com", note: "unprototyped" },
	{ key: "trexip", url: "https://trexip.com", note: "unprototyped" },
];

const teamMembers: Array<{
	key: TeamMemberKey;
	name: string;
	photo: string;
	mail: string;
	gravatarEmail?: string;
	telegram?: string;
	phone?: string;
	website?: string;
}> = [
	{
		key: "leon",
		name: "Leon Marquardt",
		photo: "/leon.jpg",
		mail: "leon@trainvent.com",
		gravatarEmail: "leon.marquardt@gmx.de",
		website: "https://leonmarquardt.com",
	},
	{
		key: "seva",
		name: "seva",
		photo: "/seva.jpg",
		mail: "vyslezhivayu@gmail.com",
		telegram: "vyslezhivayu",
		website: "https://vyslezhivayu.com/",
	},
	{
		key: "joe",
		name: "joe cronin",
		photo: "/default_avatar.png",
		mail: "",
	},
];

function getGravatarProfileUrl(email: string) {
	const normalizedEmail = email.trim().toLowerCase();
	const hash = createHash("sha256").update(normalizedEmail).digest("hex");

	return `https://gravatar.com/${hash}`;
}

export default async function LocalizedHomePage({ params }: RouteProps) {
	const { lang } = await params;

	if (!hasLocale(lang)) {
		notFound();
	}

	const dict = await getDictionary(lang);
	const activeProjectSites = projectSites.filter((site) => !site.note);
	const unprototypedProjectSites = projectSites.filter((site) => site.note);

	return (
		<main className="site-shell">
			<div className="ambient ambient-top" aria-hidden="true" />
			<div className="ambient ambient-bottom" aria-hidden="true" />

			<LocalizedSiteHeader
				navLabel={dict.home.navLabel}
				header={dict.header}
				locale={lang}
				currentPath="/"
			/>

			<section id="home" className="hero connected-panel reveal reveal-delay-1">
				<p className="eyebrow">{dict.home.eyebrow}</p>
				<h1>{dict.home.title}</h1>
				<p className="hero-copy">{dict.home.copy}</p>
				<div className="hero-actions">
					<a className="btn btn-primary" href={`/${lang}/contact`}>
						{dict.home.primaryCta}
					</a>
					<a
						className="btn btn-secondary"
						href="https://trainvent.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						{dict.home.secondaryCta}
						<svg
							className="btn-icon"
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 -960 960 960"
							width="24"
							fill="currentColor"
							aria-hidden="true"
						>
							<path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
						</svg>
					</a>
				</div>
				<nav className="topic-nav" aria-label={dict.home.topicNavAriaLabel}>
					<p className="topic-nav-label">{dict.home.topicNavLabel}</p>
					<div className="topic-nav-links">
						<a className="topic-chip" href="#services">
							{dict.home.topics.services}
						</a>
						<a className="topic-chip" href="#projects">
							{dict.home.topics.projects}
						</a>
						<a className="topic-chip" href="#about">
							{dict.home.topics.about}
						</a>
					</div>
				</nav>
			</section>

			<section id="services" className="content-block reveal reveal-delay-2">
				<div className="section-head">
					<p className="eyebrow">{dict.home.servicesEyebrow}</p>
					<h2>{dict.home.servicesTitle}</h2>
				</div>
				<div className="cards">
					<article className="card">
						<h3>{dict.home.services.homeserver.title}</h3>
						<p>{dict.home.services.homeserver.description}</p>
						<a
							className="inline-link"
							href={getLocalizedHref(lang, "/services/homeserver")}
						>
							{dict.home.services.homeserver.linkLabel}
						</a>
					</article>
					<article className="card">
						<h3>{dict.home.services.bikeRepair.title}</h3>
						<p>{dict.home.services.bikeRepair.description}</p>
						<a
							className="inline-link"
							href={getLocalizedHref(lang, "/services/bike-repair")}
						>
							{dict.home.services.bikeRepair.linkLabel}
						</a>
					</article>
				</div>
			</section>

			<section id="projects" className="content-block reveal reveal-delay-3">
				<div className="section-head">
					<p className="eyebrow">{dict.home.projectsEyebrow}</p>
					<h2>{dict.home.projectsTitle}</h2>
				</div>
				<p className="body-copy">{dict.home.projectsCopy}</p>
				<div className="project-grid">
					{activeProjectSites.map((site) => (
						<a
							key={site.key}
							className="project-tile"
							href={site.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							<span className="project-domain">{site.key}</span>
							<span className="project-description">
								{dict.home.projectDescriptions[site.key]}
							</span>
							<span className="project-cta">{dict.home.projectCta}</span>
						</a>
					))}
				</div>
				{unprototypedProjectSites.length > 0 ? (
					<div className="project-subsection">
						<p className="project-subheader">{dict.home.unprototypedLabel}</p>
						<div className="project-grid">
							{unprototypedProjectSites.map((site) => (
								<a
									key={site.key}
									className="project-tile"
									href={site.url}
									target="_blank"
									rel="noopener noreferrer"
								>
									<span className="project-domain">{site.key}</span>
									<span className="project-description">
										{dict.home.projectDescriptions[site.key]}
									</span>
									<span className="project-cta">{dict.home.projectCta}</span>
								</a>
							))}
						</div>
					</div>
				) : null}
			</section>

			<section id="about" className="content-block reveal reveal-delay-4">
				<div className="section-head">
					<p className="eyebrow">{dict.home.aboutEyebrow}</p>
					<h2>{dict.home.aboutTitle}</h2>
				</div>
				<p className="body-copy">{dict.home.aboutCopy}</p>
				<div className="team-grid">
					{teamMembers.map((member) => (
						<article key={member.key} className="team-card">
							<Image
								className="team-photo"
								src={member.photo}
								alt={`${member.name} profile`}
								width={72}
								height={72}
							/>
							<div>
								<h3>{member.name}</h3>
								<p className="team-role">{dict.home.teamRoles[member.key]}</p>
							</div>
							<div className="team-contact">
								{member.mail ? (
									<a href={`mailto:${member.mail}`}>
										{dict.home.contactLabels.mail}
									</a>
								) : null}
								{member.gravatarEmail ? (
									<a
										href={getGravatarProfileUrl(member.gravatarEmail)}
										target="_blank"
										rel="noopener noreferrer"
									>
										{dict.home.contactLabels.gravatar}
									</a>
								) : null}
								{member.telegram ? (
									<a
										href={`https://t.me/${member.telegram}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										{dict.home.contactLabels.telegram}
									</a>
								) : null}
								{member.phone ? (
									<a href={`tel:${member.phone}`}>
										{dict.home.contactLabels.phone}
									</a>
								) : null}
								{member.website ? (
									<a
										href={member.website}
										target="_blank"
										rel="noopener noreferrer"
									>
										{dict.home.contactLabels.website}
									</a>
								) : null}
								{!member.mail &&
								!member.telegram &&
								!member.phone &&
								!member.website ? (
									<span>{dict.home.contactLabels.fallback}</span>
								) : null}
							</div>
						</article>
					))}
				</div>
			</section>
		</main>
	);
}
