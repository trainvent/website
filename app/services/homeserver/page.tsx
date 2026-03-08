type NextcloudFeature = {
	name: string;
	description: string;
	icon: React.ReactNode;
};

const bookingUrl =
	"https://cloud.aiomvp.com/apps/calendar/appointment/xKz2fRgR7kj6";

const nextcloudFeatures: NextcloudFeature[] = [
	{
		name: "Contacts",
		description: "A shared address book for people, companies, and quick reachability.",
		icon: (
			<svg viewBox="0 0 64 64" aria-hidden="true">
				<circle cx="32" cy="23" r="10" />
				<path d="M15 50c2-9 11-14 17-14s15 5 17 14" />
			</svg>
		),
	},
	{
		name: "Calendar",
		description: "Appointments, reminders, and family or team scheduling in one place.",
		icon: (
			<svg viewBox="0 0 64 64" aria-hidden="true">
				<rect x="12" y="16" width="40" height="34" rx="6" />
				<path d="M12 26h40M22 12v8M42 12v8M22 34h8M34 34h8M22 42h8" />
			</svg>
		),
	},
	{
		name: "Notes",
		description: "Simple synced notes for ideas, checklists, and household information.",
		icon: (
			<svg viewBox="0 0 64 64" aria-hidden="true">
				<path d="M18 12h20l8 8v32H18z" />
				<path d="M38 12v10h8M24 30h16M24 38h16M24 46h10" />
			</svg>
		),
	},
	{
		name: "Tasks",
		description: "Track what needs doing without scattering reminders across apps.",
		icon: (
			<svg viewBox="0 0 64 64" aria-hidden="true">
				<rect x="14" y="14" width="36" height="36" rx="6" />
				<path d="M22 28l5 5 13-13M22 40h20" />
			</svg>
		),
	},
	{
		name: "Passwords",
		description: "A practical home base for credentials and sensitive shared access.",
		icon: (
			<svg viewBox="0 0 64 64" aria-hidden="true">
				<rect x="16" y="28" width="32" height="22" rx="5" />
				<path d="M23 28v-6a9 9 0 0 1 18 0v6M32 36v7" />
				<circle cx="32" cy="36" r="1.5" fill="currentColor" stroke="none" />
			</svg>
		),
	},
	{
		name: "Files",
		description: "Central file management and sync across laptop, phone, and home server.",
		icon: (
			<svg viewBox="0 0 64 64" aria-hidden="true">
				<path d="M12 24h16l4 4h20v20a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4z" />
				<path d="M12 24v-8a4 4 0 0 1 4-4h12l4 4h12a4 4 0 0 1 4 4v4" />
			</svg>
		),
	},
];

function NextcloudLogo() {
	return (
		<svg
			className="nextcloud-logo"
			viewBox="0 0 160 64"
			role="img"
			aria-label="Nextcloud logo"
		>
			<circle cx="26" cy="32" r="10" />
			<circle cx="80" cy="32" r="10" />
			<circle cx="134" cy="32" r="10" />
			<path d="M36 32h34a10 10 0 0 1 20 0h34" />
		</svg>
	);
}

function HomeserverGraphic() {
	return (
		<div className="homeserver-graphic" aria-hidden="true">
			<div className="homeserver-screen">
				<div className="homeserver-toolbar">
					<span />
					<span />
					<span />
				</div>
				<div className="homeserver-cloud">
					<NextcloudLogo />
				</div>
				<div className="homeserver-sync">
					<div className="homeserver-device homeserver-device-phone" />
					<div className="homeserver-device homeserver-device-server" />
					<div className="homeserver-device homeserver-device-laptop" />
				</div>
			</div>
		</div>
	);
}

export default function HomeserverServicePage() {
	return (
		<main className="site-shell">
			<section className="content-block reveal reveal-delay-1">
				<div className="service-hero-layout">
					<div>
						<div className="section-head">
							<p className="eyebrow">Service</p>
							<h1>Nextcloud and homeserver help</h1>
						</div>
						<div className="service-badge-row">
							<NextcloudLogo />
							<span className="service-badge">Self-hosted and practical</span>
						</div>
						<p className="body-copy">
							I help people set up a practical self-hosted system around
							Nextcloud and a small homeserver. That can include planning
							hardware, configuring host and installations with docker, remote
							access, backups, updates, file sync, and the basic security steps
							needed to keep the setup usable.
						</p>
						<div className="hero-actions">
							<a
								className="btn btn-primary"
								href={bookingUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								Book an online discussion
							</a>
							<a className="btn btn-secondary" href="mailto:leon@trainvent.com">
								Contact by email
							</a>
						</div>
					</div>
					<HomeserverGraphic />
				</div>
			</section>

			<section className="content-block reveal reveal-delay-2">
				<div className="section-head">
					<p className="eyebrow">Nextcloud in detail</p>
					<h2>One home system, six daily tools</h2>
				</div>
				<p className="body-copy">
					Nextcloud can bring contacts, calendar, notes, tasks, passwords, and
					file management into one place at home, so everyday data stays
					centralized on a system you control.
				</p>
				<div className="feature-grid">
					{nextcloudFeatures.map((feature) => (
						<article key={feature.name} className="feature-card">
							<div className="feature-icon">{feature.icon}</div>
							<div>
								<h3>{feature.name}</h3>
								<p>{feature.description}</p>
							</div>
						</article>
					))}
				</div>
			</section>

			<section className="content-block reveal reveal-delay-3">
				<div className="section-head">
					<p className="eyebrow">What I can help with</p>
					<h2>From first box to working daily setup</h2>
				</div>
				<div className="cards">
					<article className="card">
						<h3>Planning and hardware</h3>
						<p>
							Choosing a realistic machine, storage layout, and network setup for
							your home or small office.
						</p>
					</article>
					<article className="card">
						<h3>Nextcloud installation</h3>
						<p>
							Help with installing Nextcloud, connecting storage, setting up user
							accounts, sync clients, and practical apps for the common usecases.
						</p>
					</article>
					<article className="card">
						<h3>Remote or onsite support</h3>
						<p>
							Support can happen remotely or onsite, depending on what is easier
							for the job and your location.
						</p>
					</article>
				</div>
			</section>

			<section className="content-block reveal reveal-delay-4">
				<div className="section-head">
					<p className="eyebrow">Details</p>
					<h2>Pricing and contact</h2>
				</div>
				<p className="body-copy">
					Homeserver and Nextcloud support is offered at <strong>15 EUR per
						hour</strong>. Remote sessions and onsite help are both possible.
				</p>
				<div className="team-contact service-contact-list">
					<a href={bookingUrl} target="_blank" rel="noopener noreferrer">
						Book online discussion
					</a>
					<a href="mailto:leon@trainvent.com">leon@trainvent.com</a>
					<a href="https://t.me/lmarquar" target="_blank" rel="noopener noreferrer">
						Telegram: @lmarquar
					</a>
					<a href="tel:+49160345542">+49 160 345542</a>
				</div>
			</section>
		</main>
	);
}
