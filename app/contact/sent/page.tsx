import { redirect } from "next/navigation";

import { getRedirectMetadata } from "@/lib/site";

export const metadata = getRedirectMetadata("/en/contact/sent/");

export default function ContactSentPage() {
	redirect("/en/contact/sent/");
}
