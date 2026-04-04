import { redirect } from "next/navigation";

type RouteProps = {
	params: Promise<{ lang: string }>;
};

export default async function LocalizedDevPage({ params }: RouteProps) {
	const { lang } = await params;
	redirect(`/${lang}/sources`);
}
