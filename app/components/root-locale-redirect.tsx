import { defaultLocale, locales } from "@/lib/i18n";

// Run while the HTML is parsed, before the English fallback can be painted.
// Waiting for a React effect would flash English for other browser languages.
function getRedirectScript(pathname: string) {
	return `(() => {
	const supported = ${JSON.stringify(locales)};
	const fallback = ${JSON.stringify(defaultLocale)};
	const languages = navigator.languages?.length
		? navigator.languages
		: [navigator.language];
	const locale = languages
		.map(language => language?.toLowerCase().split("-")[0])
		.find(language => supported.includes(language)) || fallback;

	if (locale !== fallback) {
		const pending = document.createElement("style");
		pending.textContent = "body { visibility: hidden !important; }";
		document.head.appendChild(pending);
		// Keep the fallback usable if navigation fails.
		window.setTimeout(() => pending.remove(), 3000);
	}

	const basePath = ${JSON.stringify(process.env.BASE_PATH ?? "")};
	const pathname = ${JSON.stringify(pathname)};
	window.location.replace(basePath + "/" + locale + pathname + window.location.search + window.location.hash);
})();`;
}

export default function RootLocaleRedirect({ pathname = "/" }: { pathname?: string }) {
	return <script dangerouslySetInnerHTML={{ __html: getRedirectScript(pathname) }} />;
}
