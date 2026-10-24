import { getCurrentUser } from "@/lib/auth";
import { UserMenuClient } from "@/ui/components/UserMenuClient";

export async function UserMenu({ channel }: { channel: string }) {
	const user = await getCurrentUser();
	return (
		<UserMenuClient channel={channel} user={user ? { email: user.email, firstName: user.firstName } : null} />
	);
}
