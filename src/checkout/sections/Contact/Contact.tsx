import { type FC, useState } from "react";
import { GuestUser } from "@/checkout/sections/GuestUser/GuestUser";
import { useCheckout } from "@/checkout/hooks/useCheckout";

interface ContactProps {
	setShowOnlyContact: (value: boolean) => void;
}

export const Contact: FC<ContactProps> = () => {
	const { checkout } = useCheckout();
	const [email, setEmail] = useState(checkout?.email || "");

	return (
		<div className="checkout-section-container">
			<GuestUser onEmailChange={setEmail} email={email} />
		</div>
	);
};
