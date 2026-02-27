import Image from "next/image";

const services = [
	{
		title: "Digital Product Development",
		description: `Design and implementation of practical web systems for operations, sales, and service teams.
			We try to choose tools and hosting that minimise our footprint and are honest about what we can deliver.`,
	},
	{
		title: "Process Automation",
		description: `Reduce repetitive work with tailored automations, integrations, and reliable delivery workflows.
			We favour open‑source and low‑energy solutions where possible.`,
	},
	{
		title: "Private Shop",
		description:
			"Access our existing private shop and product catalog at LeMarq.",
		link: "https://lemarq.de",
		linkLabel: "Open lemarq.de",
	},
];

const teamMembers = [
	{
		name: "Leon Marquardt",
		role: "Founder",
		photo: "/leon.jpg",
		mail: "leon@trainvent.com",
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

export default function Home() {
	return (
		<main className="site-shell">
			<div className="ambient ambient-top" aria-hidden="true" />
			<div className="ambient ambient-bottom" aria-hidden="true" />

			<header className="topbar reveal">
				<a className="brand" href="#home" aria-label="Trainvent home">
					<Image
						className="brand-logo"
						src="/icon.png"
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
						href="https://lemarq.de"
						target="_blank"
						rel="noopener noreferrer"
					>
						Shop
					</a>
					<a href="/dev">Sources</a>
					<a href="#services">Services</a>
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

			<section id="about" className="content-block reveal reveal-delay-3">
				<div className="section-head">
					<p className="eyebrow">About</p>
					<h2>This is us</h2>
				</div>
				<p className="body-copy">
					Trainvent is a modest company website trying to maximise on displaying a variety of new ideas.
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
				<a className="btn btn-primary" href="mailto:hello@trainvent.com">
					hello@trainvent.com
				</a>
			</section>

			<footer className="site-footer">
				<small>
					<a href="/imprint">Imprint</a>
				</small>
			</footer>
		</main>
	);
}
