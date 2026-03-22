import { redirect } from "next/navigation";

type RouteProps = {
	params: Promise<{ lang: string }>;
};

export default async function LocalizedSoftwareSupprtPage({
	params,
}: RouteProps) {
	const { lang } = await params;

	redirect(`/${lang}/software-support`);
}
