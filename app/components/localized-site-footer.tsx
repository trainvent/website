import type { Dictionary } from "../[lang]/dictionaries";
import { getLocalizedHref, type Locale } from "@/lib/i18n";

type SocialLinkProps = {
	href: string;
	label: string;
	kind: "facebook" | "youtube" | "x";
};

function SocialLink({ href, label, kind }: SocialLinkProps) {
	return (
		<a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
			<span className="footer-social-icon" aria-hidden="true">
				{kind === "facebook" ? (
					<svg viewBox="0 0 24 24" role="presentation" focusable="false">
						<path d="M13.5 8.5H15V6h-1.5C11.4 6 10 7.4 10 9.5V11H8v2.5h2V18h2.5v-4.5h2l.5-2.5h-2.5V9.5c0-.55.45-1 1-1Z" fill="currentColor" />
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
			<small>
				<a href={getLocalizedHref(locale, "/imprint")}>
					{labels.footerImprint}
				</a>
				{" · "}
				<a href={getLocalizedHref(locale, "/software-support")}>
					{labels.footerSupport}
				</a>
				{"·"}
				<SocialLink
					href="https://www.facebook.com/trainvent/"
					label="Trainvent on Facebook"
					kind="facebook"
				/>
				{"·"}
				<SocialLink
					href="https://www.youtube.com/@trainvent"
					label="Trainvent on YouTube"
					kind="youtube"
				/>
				{"·"}
				<SocialLink
					href="https://x.com/trainventx"
					label="Trainvent on X"
					kind="x"
				/>
			</small>
		</footer>
	);
}
