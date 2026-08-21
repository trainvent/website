import { redirect } from "next/navigation";

import { getRedirectMetadata } from "@/lib/site";

export const metadata = getRedirectMetadata("/en/sources/");

export default function SourcesPage() {
	redirect("/en/sources/");
}
