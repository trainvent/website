import { redirect } from "next/navigation";

import { getRedirectMetadata } from "@/lib/site";

export const metadata = getRedirectMetadata("/en/services/bike-repair/");

export default function BikeRepairPage() {
	redirect("/en/services/bike-repair/");
}
