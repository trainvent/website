const bookingUrl =
	"https://cloud.aiomvp.com/apps/calendar/appointment/xKz2fRgR7kj6";

export default function BikeRepairServicePage() {
	return (
		<main className="site-shell">
			<section className="content-block reveal reveal-delay-1">
				<div className="section-head">
					<p className="eyebrow">Service</p>
					<h1>Bike repair in and around Bielefeld</h1>
				</div>
				<p className="body-copy">
					I help with practical bicycle repairs for city bikes, trekking bikes,
					and everyday transport bikes in and around Bielefeld. The focus is on
					reliable fixes, clear communication, and getting your bike back into
					regular use without turning a simple repair into a drama.
				</p>
				<p className="body-copy">
					Typical jobs include punctures, brake adjustments, chain and cassette
					work, gear tuning, replacing worn parts, and general maintenance checks
					before a bike becomes annoying or unsafe to ride.
				</p>
				<div className="hero-actions">
					<a
						className="btn btn-primary"
						href={bookingUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						Book a repair discussion
					</a>
					<a className="btn btn-secondary" href="mailto:leon@trainvent.com">
						Contact by email
					</a>
				</div>
			</section>

			<section className="content-block reveal reveal-delay-2">
				<div className="section-head">
					<p className="eyebrow">What I can help with</p>
					<h2>Useful repairs for daily riding</h2>
				</div>
				<div className="cards">
					<article className="card">
						<h3>Brakes, gears, and drivetrain</h3>
						<p>
							Adjustment and replacement work for the parts that most often make
							a bike noisy, slow, or frustrating to use.
						</p>
					</article>
					<article className="card">
						<h3>Flat tires and worn parts</h3>
						<p>
							Tube and tire changes, chain wear checks, cables, brake pads, and
							the common fixes that keep a commuter bike dependable.
						</p>
					</article>
					<article className="card">
						<h3>Onsite or arranged handoff</h3>
						<p>
							Depending on the job and distance, support can happen onsite in the
							Bielefeld area or through an arranged dropoff and pickup.
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
					Bike repair support is offered at <strong>15 EUR per hour</strong>.
					Parts are billed separately when replacements are needed.
				</p>
				<div className="team-contact service-contact-list">
					<a href={bookingUrl} target="_blank" rel="noopener noreferrer">
						Book repair discussion
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
