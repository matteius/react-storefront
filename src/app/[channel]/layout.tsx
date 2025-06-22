import { type ReactNode } from "react";

export const generateStaticParams = async () => {
	// Restrict storefront to only accept default-channel
	return [{ channel: "default-channel" }];
};

export default function ChannelLayout({ children }: { children: ReactNode }) {
	return children;
}
