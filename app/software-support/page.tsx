import LocalizedSoftwareSupportPage from "../[lang]/software-support/page";
import RootLocaleRedirect from "../components/root-locale-redirect";
import { defaultLocale } from "@/lib/i18n";
import { getRedirectMetadata } from "@/lib/site";

export const metadata = getRedirectMetadata("/en/software-support/");

export default function SoftwareSupportPage() {
	return (
		<>
			<RootLocaleRedirect pathname="/software-support/" />
			<LocalizedSoftwareSupportPage params={Promise.resolve({ lang: defaultLocale })} />
		</>
	);
}
