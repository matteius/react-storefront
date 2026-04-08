import { type ReactNode } from "react";
import { DefaultChannelSlug } from "@/app/constants";

export const generateStaticParams = async () => {
	return [{ channel: DefaultChannelSlug }];
};

export default function ChannelLayout({ children }: { children: ReactNode }) {
	return children;
}
