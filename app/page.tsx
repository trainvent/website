import LocalizedHomePage from "./[lang]/page";
import RootLocaleRedirect from "./components/root-locale-redirect";
import { defaultLocale } from "@/lib/i18n";

export default function HomePage() {
	return (
		<>
			<RootLocaleRedirect />
			<LocalizedHomePage params={Promise.resolve({ lang: defaultLocale })} />
		</>
	);
}
