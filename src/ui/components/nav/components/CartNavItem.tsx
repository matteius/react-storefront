import { ShoppingBagIcon } from "lucide-react";
import clsx from "clsx";
import * as Checkout from "@/lib/checkout";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export const CartNavItem = async ({ channel }: { channel: string }) => {
	const checkoutId = await Checkout.getIdFromCookies(channel);
	const checkout = checkoutId ? await Checkout.find(checkoutId) : null;

	const lineCount = checkout ? checkout.lines.reduce((result, line) => result + line.quantity, 0) : 0;

	return (
		<LinkWithChannel
			href="/cart"
			className="relative flex items-center rounded-lg p-2 transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-lg hover:shadow-gold-400/20 hover:backdrop-blur-sm"
			data-testid="CartNavItem"
		>
			<ShoppingBagIcon
				className="h-6 w-6 shrink-0 text-white drop-shadow-sm transition-all duration-300"
				aria-hidden="true"
			/>
			{lineCount > 0 ? (
				<div
					className={clsx(
						"absolute -right-1 -top-1 flex h-5 animate-pulse flex-col items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-lg",
						lineCount > 9 ? "w-6 px-1" : "w-5",
					)}
				>
					{lineCount > 99 ? "99+" : lineCount}
					<span className="sr-only">item{lineCount > 1 ? "s" : ""} in cart, view bag</span>
				</div>
			) : (
				<span className="sr-only">0 items in cart</span>
			)}
		</LinkWithChannel>
	);
};
