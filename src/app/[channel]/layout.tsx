import { type ReactNode } from "react";
import { notFound } from "next/navigation";
import { DefaultChannelSlug } from "@/app/constants";

export const generateStaticParams = async () => {
	return [{ channel: DefaultChannelSlug }];
};

export default async function ChannelLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ channel: string }>;
}) {
	const { channel } = await params;

	/*
	 * `[channel]` matches any unclaimed top-level path, so without this guard
	 * /literally-anything rendered the storefront with a 200. Search engines read
	 * that as an unlimited supply of duplicate home pages (a soft 404) rather
	 * than a missing URL. This storefront serves exactly one channel.
	 */
	if (channel !== DefaultChannelSlug) {
		notFound();
	}

	return children;
}
