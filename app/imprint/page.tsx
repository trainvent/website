import { redirect } from "next/navigation";

import { getRedirectMetadata } from "@/lib/site";

export const metadata = getRedirectMetadata("/en/imprint/");

export default function ImprintPage() {
	redirect("/en/imprint/");
}
