const bookingUrl =
	"https://cloud.aiomvp.com/apps/calendar/appointment/xKz2fRgR7kj6";

export default function HomeserverServicePage() {
	return (
		<main className="site-shell">
			<section className="content-block reveal reveal-delay-1">
				<div className="section-head">
					<p className="eyebrow">Service</p>
					<h1>Nextcloud and homeserver help</h1>
				</div>
				<p className="body-copy">
					I help people set up a practical self-hosted system around Nextcloud
					and a small homeserver. That can include planning hardware, configuring
					host and installations with docker, remote access, backups, updates, file sync, and the basic
					security steps needed to keep the setup usable.
				</p>
				<p className="body-copy">
					<h2>Nextcloud in Detail</h2>
					Nextcloud can bring contacts, calendar, notes, tasks, paswords and file
					management into one place at home, so everyday data stays centralized
					on a system you control. Instead of spreading information across many
					different services, you know where your data is and how it is handled.
				</p>
				<div className="hero-actions">
					<a className="btn btn-primary" href={bookingUrl} target="_blank" rel="noopener noreferrer">
						Book an online discussion
					</a>
					<a className="btn btn-secondary" href="mailto:leon@trainvent.com">
						Contact by email
					</a>
				</div>
			</section>

			<section className="content-block reveal reveal-delay-2">
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

			<section className="content-block reveal reveal-delay-3">
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
