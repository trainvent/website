import { redirect } from "next/navigation";

import { getRedirectMetadata } from "@/lib/site";

export const metadata = getRedirectMetadata("/en/services/homeserver/");

export default function HomeserverPage() {
	redirect("/en/services/homeserver/");
}
