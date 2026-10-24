import { redirect } from "next/navigation";
import { DefaultChannelSlug } from "@/app/constants";

export default function EmptyPage() {
	redirect(`/${DefaultChannelSlug}`);
}
