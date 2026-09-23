import type { Dictionary } from "../[lang]/dictionaries";
import { getLocalizedHref, type Locale } from "@/lib/i18n";

type SocialLinkProps = {
	href: string;
	label: string;
	kind: "mastodon" | "telegram" | "youtube" | "x" | "patreon" | "trustpilot";
};

function SocialLink({ href, label, kind }: SocialLinkProps) {
	return (
		<a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
			<span className="footer-social-icon" aria-hidden="true">
				{kind === "mastodon" ? (
					<svg viewBox="0 0 24 24" role="presentation" focusable="false">
						<path d="M21.576 8.304c0-4.339-2.843-5.611-2.843-5.611C17.3 2.035 14.838 1.758 12.28 1.737h-.063c-2.558.021-5.019.298-6.452.956 0 0-2.844 1.272-2.844 5.611 0 .994-.02 2.184.012 3.445.103 4.243.778 8.425 4.702 9.463 1.809.479 3.362.58 4.612.511 2.266-.126 3.538-.809 3.538-.809l-.075-1.645s-1.619.51-3.438.448c-1.802-.062-3.705-.194-3.997-2.407a4.526 4.526 0 0 1-.04-.62s1.77.432 4.013.535c1.371.063 2.657-.08 3.964-.236 2.507-.299 4.69-1.842 4.964-3.252.431-2.222.396-5.433.396-5.433ZM18.22 13.894h-2.083V8.79c0-1.076-.453-1.622-1.359-1.622-1.001 0-1.503.648-1.503 1.93v2.793h-2.07V9.098c0-1.282-.502-1.93-1.503-1.93-.906 0-1.359.546-1.359 1.622v5.104H6.26V8.636c0-1.076.274-1.93.824-2.562.567-.632 1.309-.956 2.23-.956 1.065 0 1.873.409 2.407 1.227l.519.869.519-.869c.534-.818 1.342-1.227 2.407-1.227.921 0 1.663.324 2.23.956.55.632.824 1.486.824 2.562v5.258Z" fill="currentColor" />
					</svg>
				) : null}
				{kind === "telegram" ? (
					<svg viewBox="0 0 24 24" role="presentation" focusable="false">
						<path d="m21.4 3.6-3.2 16c-.2 1.1-.9 1.4-1.8.9l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.2L5.8 13.4 1 11.9c-1-.3-1-1 .2-1.5L20 3.2c.9-.3 1.7.2 1.4.4Z" fill="currentColor" />
					</svg>
				) : null}
				{kind === "youtube" ? (
					<svg viewBox="0 0 24 24" role="presentation" focusable="false">
						<path d="M21.6 7.7c-.2-.8-.8-1.5-1.6-1.7C18.6 5.6 12 5.6 12 5.6s-6.6 0-8 .4c-.8.2-1.4.9-1.6 1.7C2 9 2 12 2 12s0 3 .4 4.3c.2.8.8 1.5 1.6 1.7 1.4.4 8 .4 8 .4s6.6 0 8-.4c.8-.2 1.4-.9 1.6-1.7.4-1.3.4-4.3.4-4.3s0-3-.4-4.3Z" fill="currentColor" /><path d="m10 9.5 5.5 2.5L10 14.5v-5Z" fill="#fff" />
					</svg>
				) : null}
				{kind === "x" ? (
					<svg viewBox="0 0 24 24" role="presentation" focusable="false">
						<path d="M18.7 5H21l-5.8 6.6L22 19h-5.3l-4.2-5.1L8 19H5.7l6.3-7.2L2 5h5.4l3.8 4.6L14.9 5h3.8Zm-.8 12h1.3L7.3 6.9H5.9L17.9 17Z" fill="currentColor" />
					</svg>
				) : null}
				{kind === "patreon" ? (
					<svg viewBox="0 0 24 24" role="presentation" focusable="false">
						<rect x="3.5" y="4" width="5" height="16" rx="1" fill="currentColor" />
						<circle cx="16.5" cy="8" r="4.5" fill="currentColor" />
					</svg>
				) : null}
				{kind === "trustpilot" ? (
					<svg viewBox="0 0 24 24" role="presentation" focusable="false">
						<path d="M12 2.7 14.8 8.4l6.3.9-4.6 4.5 1.1 6.3L12 17.1 6.4 20.1l1.1-6.3L2.9 9.3l6.3-.9L12 2.7Z" fill="currentColor" />
					</svg>
				) : null}
			</span>
		</a>
	);
}

type LocalizedSiteFooterProps = {
	locale: Locale;
	labels: Dictionary["home"];
};

export default function LocalizedSiteFooter({
	locale,
	labels,
}: LocalizedSiteFooterProps) {
	return (
		<footer className="site-footer">
			<small className="site-footer-links">
				<a href={getLocalizedHref(locale, "/imprint")}>
					{labels.footerImprint}
				</a>
				<a href={getLocalizedHref(locale, "/software-support")}>
					{labels.footerSupport}
				</a>
				<SocialLink
					href="https://mastodon.social/@trainvent"
					label="@trainvent@mastodon.social on Mastodon"
					kind="mastodon"
				/>
				<SocialLink
					href="https://www.youtube.com/@trainvent"
					label="Trainvent on YouTube"
					kind="youtube"
				/>
				<SocialLink
					href="https://t.me/Trainvent"
					label="@Trainvent on Telegram"
					kind="telegram"
				/>
				<SocialLink
					href="https://www.patreon.com/trainvent"
					label="Trainvent on Patreon"
					kind="patreon"
				/>
				<SocialLink
					href="https://de.trustpilot.com/review/trainvent.com"
					label="Trainvent on Trustpilot"
					kind="trustpilot"
				/>
			</small>
		</footer>
	);
}
