import { redirect } from "next/navigation";

import { getRedirectMetadata } from "@/lib/site";

export const metadata = getRedirectMetadata("/en/software-support/");

export default function SoftwareSupportPage() {
	redirect("/en/software-support/");
}
