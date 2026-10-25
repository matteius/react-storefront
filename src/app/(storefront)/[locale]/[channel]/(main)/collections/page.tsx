import { redirect } from "next/navigation";
import { buildStorefrontPath } from "@/lib/storefront-path";

type Props = {
	params: Promise<{ locale: string; channel: string }>;
};

/** Keep existing collection-index links working until there is an index page. */
export default async function CollectionsPage({ params }: Props) {
	const { locale, channel } = await params;
	redirect(buildStorefrontPath(locale, channel, "/products"));
}
