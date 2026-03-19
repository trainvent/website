import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Message Sent | Trainvent",
	description: "Confirmation page after sending a message to Trainvent.",
};

export default function ContactSentPage() {
	return (
		<main className="site-shell">
			<div className="ambient ambient-top" aria-hidden="true" />
			<div className="ambient ambient-bottom" aria-hidden="true" />

			<section className="hero reveal">
				<p className="eyebrow">Contact</p>
				<h1>Thanks for reaching out.</h1>
				<p className="hero-copy">
					Your message has been sent. Trainvent will reply to the email address you
					left in the form.
				</p>
				<div className="hero-actions">
					<Link className="btn btn-primary" href="/">
						Back to home
					</Link>
					<Link className="btn btn-secondary" href="/contact">
						Send another message
					</Link>
				</div>
			</section>
		</main>
	);
}
