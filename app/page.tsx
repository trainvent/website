import Image from "next/image";
import { createHash } from "node:crypto";

type Service = {
	title: string;
	description: string;
	link?: string;
	linkLabel?: string;
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

const projectSites = [
	{
		name: "caesim",
		url: "https://caesim.com",
		description: "data filtering tool",
	},
	{
		name: "calcrow",
		url: "https://calcrow.com",
		description: "single row calc sheet manipulation",
	},
	{
		name: "stimmapp",
		url: "https://stimmapp.eu",
		description: "voting app",
	},
	{
		name: "portopener",
		url: "https://portopener.com",
		description: "universal network tool",
	},
	{
		name: "trexip",
		url: "https://trexip.com",
		description: "cash registry system",
	},
	{
		name: "vmfpc",
		url: "https://vmfpc.com",
		description: "nutrition",
	},
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
	},
	{
		name: "seva",
		role: "Product & Operations Assistant",
		photo: "/seva.jpg",
		mail: "vyslezhivayu@gmail.com",
		telegram: "vyslezhivayu",
		phone: "",
	},
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

			<header className="topbar reveal">
				<a className="brand" href="#home" aria-label="Trainvent home">
					<Image
						className="brand-logo"
						src="/LeLogo.png"
						alt="Trainvent logo"
						width={32}
						height={32}
						priority
					/>
					<span className="brand-name">Trainvent</span>
				</a>
				<nav className="topnav" aria-label="Main navigation">
					<a
						href="https://music.trainvent.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						Music
					</a>
					<a
						href="https://trainvent.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						Shop
					</a>
					<a href="/dev">Sources</a>
					<a href="#services">Services</a>
					<a href="#projects">Projects</a>
					<a href="#about">About</a>
					<a href="#contact">Contact</a>
				</nav>
			</header>

			<section id="home" className="hero reveal reveal-delay-1">
				<p className="eyebrow">Engineering practical growth</p>
				<h1>
					Bringing fresh air in.
				</h1>
				<p className="hero-copy">
					We combine product thinking, implementation and basic operations
					support to help teams move forward with less friction. Not every idea
					is a unicorn – we’re happy if something is useful and maybe profitable
					one day.
				</p>
				<div className="hero-actions">
					<a className="btn btn-primary" href="#contact">
						Start a project
					</a>
				</div>
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
								{!member.mail && !member.telegram && !member.phone ? (
									<span>Contact on request</span>
								) : null}
							</div>
						</article>
					))}
				</div>
			</section>

			<section id="contact" className="content-block contact reveal reveal-delay-4">
				<div>
					<p className="eyebrow">Contact</p>
					<h2>Let&apos;s discuss your next build.</h2>
					<p className="body-copy">
						Send a short summary of your goals, timeline, and current setup.
					</p>
				</div>
				<div className="team-contact">
					<a className="btn btn-primary" href="mailto:hello@trainvent.com">
						hello@trainvent.com
					</a>
					<a
						href="https://t.me/trainvent"
						target="_blank"
						rel="noopener noreferrer"
					>
						Telegram
					</a>
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
