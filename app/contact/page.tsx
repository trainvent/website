import { redirect } from "next/navigation";

import { getRedirectMetadata } from "@/lib/site";

export const metadata = getRedirectMetadata("/en/contact/");

export default function ContactPage() {
	redirect("/en/contact/");
}
