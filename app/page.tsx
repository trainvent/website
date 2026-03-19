import { createHash } from "node:crypto";
import Image from "next/image";
import SiteHeader from "./components/site-header";

type Service = {
	title: string;
	description: string;
	link?: string;
	linkLabel?: string;
};

type ProjectSite = {
	name: string;
	url: string;
	description: string;
	note?: string;
};

const services: Service[] = [
	{
		title: "Homeserver and Nextcloud Support",
		description:
			"Setup and support for self-hosted homeservers, Nextcloud, backups, remote access, and the small but important security basics that keep the system usable.",
		link: "/services/homeserver",
		linkLabel: "See homeserver help",
	},
	{
		title: "Bike Repair in Bielefeld",
		description:
			"Practical bicycle repair help in and around Bielefeld for everyday issues like brakes, gears, tubes, chains, and basic maintenance that gets your bike back on the road.",
		link: "/services/bike-repair",
		linkLabel: "See bike repair service",
	},
];

const projectSites: ProjectSite[] = [
	{
		name: "caesim",
		url: "https://caesim.com",
		description: "data filtering tool",
		note: "Not yet prototyped.",
	},
	{
		name: "calcrow",
		url: "https://calcrow.com",
		description: "single row calc sheet manipulation",
	},
	{
		name: "stimmapp",
		url: "https://stimmapp.net",
		description: "voting app",
	},
	{
		name: "portopener",
		url: "https://portopener.com",
		description: "universal network tool",
		note: "Not yet prototyped.",
	},
	{
		name: "trexip",
		url: "https://trexip.com",
		description: "cash registry system",
		note: "Not yet prototyped.",
	},
];

const homeTopics = [
	{ href: "#services", label: "Services" },
	{ href: "#projects", label: "Projects" },
	{ href: "#about", label: "About" },
];

const teamMembers = [
	{
		name: "Leon Marquardt",
		role: "Founder",
		photo: "/leon.jpg",
		mail: "leon@trainvent.com",
		gravatarEmail: "leon.marquardt@gmx.de",
		telegram: "lmarquar",
		phone: "+49160345542",
		website: "https://leonmarquardt.com",

	},
	{
		name: "seva",
		role: "Product & Operations Assistant",
		photo: "/seva.jpg",
		mail: "vyslezhivayu@gmail.com",
		telegram: "vyslezhivayu",
		phone: "",
		website: "https://vyslezhivayu.com/",

	},
	{
		name: "joe cronin",
		role: "Debugging",
		photo: "/default_avatar.png",
		mail: "",
		telegram: "",
		phone: "",
		website: "",
	}
];

function getGravatarUrl(email: string) {
	const normalizedEmail = email.trim().toLowerCase();
	const hash = createHash("md5").update(normalizedEmail).digest("hex");

	return `https://www.gravatar.com/avatar/${hash}?s=144&d=mp`;
}

function getGravatarProfileUrl(email: string) {
	const normalizedEmail = email.trim().toLowerCase();
	const hash = createHash("sha256").update(normalizedEmail).digest("hex");

	return `https://gravatar.com/${hash}`;
}

export default function Home() {
	return (
		<main className="site-shell">
			<div className="ambient ambient-top" aria-hidden="true" />
			<div className="ambient ambient-bottom" aria-hidden="true" />

			<SiteHeader />

			<section id="home" className="hero reveal reveal-delay-1">
				<p className="eyebrow">Intro</p>
				<h1>
					blowing fresh ideas.
				</h1>
				<p className="hero-copy">
					We combine product thinking, implementation and basic operations
					to create. Not every idea
					is a unicorn – we’re happy if something is useful and maybe profitable
					one day.
				</p>
				<div className="hero-actions">
					<a className="btn btn-primary" href="/contact">
						Start a project
					</a>
				</div>
				<nav className="topic-nav" aria-label="Homepage topics">
					<p className="topic-nav-label">Jump to a topic</p>
					<div className="topic-nav-links">
						{homeTopics.map((topic) => (
							<a key={topic.href} className="topic-chip" href={topic.href}>
								{topic.label}
							</a>
						))}
					</div>
				</nav>
			</section>

			<section id="services" className="content-block reveal reveal-delay-2">
				<div className="section-head">
					<p className="eyebrow">Services</p>
					<h2>Focused services with measurable outcomes</h2>
				</div>
				<div className="cards">
					{services.map((service) => (
						<article key={service.title} className="card">
							<h3>{service.title}</h3>
							<p>{service.description}</p>
							{service.link ? (
								<a
									className="inline-link"
									href={service.link}
									target="_blank"
									rel="noopener noreferrer"
								>
									{service.linkLabel}
								</a>
							) : null}
						</article>
					))}
				</div>
			</section>

			<section id="projects" className="content-block reveal reveal-delay-3">
				<div className="section-head">
					<p className="eyebrow">Projects</p>
					<h2>Other webpages across our project network</h2>
				</div>
				<p className="body-copy">
					A quick directory of other live project sites.
				</p>
				<div className="project-grid">
					{projectSites.map((site) => (
						<a
							key={site.name}
							className="project-tile"
							href={site.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							<span className="project-domain">{site.name}</span>
							<span className="project-description">{site.description}</span>
							{site.note ? (
								<span className="project-note">{site.note}</span>
							) : null}
							<span className="project-cta">Open site</span>
						</a>
					))}
				</div>
			</section>

			<section id="about" className="content-block reveal reveal-delay-4">
				<div className="section-head">
					<p className="eyebrow">About</p>
					<h2>This is us</h2>
				</div>
				<p className="body-copy">
					Trainvent is a modest company website trying to maximise on displaying a variety of new ideas.
					{" "}We strictly don&apos;t make use of dead animals since founding 24.2.2026.
				</p>
				<div className="team-grid">
					{teamMembers.map((member) => (
						<article key={member.name} className="team-card">
							<Image
								className="team-photo"
								src={member.photo}
								alt={`${member.name} profile`}
								width={72}
								height={72}
							/>
							<div>
								<h3>{member.name}</h3>
								<p className="team-role">{member.role}</p>
							</div>
							                 <div className="team-contact">
                                {member.mail ? (
                                    <a href={`mailto:${member.mail}`}>Mail</a>
                                ) : null}
                                {member.gravatarEmail ? (
                                    <a
                                        href={getGravatarProfileUrl(member.gravatarEmail)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Gravatar
                                    </a>
                                ) : null}
                                {member.telegram ? (
                                    <a
                                        href={`https://t.me/${member.telegram}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Telegram
                                    </a>
                                ) : null}
                                {member.phone ? <a href={`tel:${member.phone}`}>Phone</a> : null}
                                {member.website ? (
                                    <a
                                        href={member.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Website
                                    </a>
                                ) : null}
                                {!member.mail && !member.telegram && !member.phone && !member.website ? (
                                    <span>Contact on request</span>
                                ) : null}
                            </div>
						</article>
					))}
				</div>
			</section>

			<footer className="site-footer">
				<small>
					<a href="/imprint">Imprint</a>
				</small>
			</footer>
		</main>
	);
}
