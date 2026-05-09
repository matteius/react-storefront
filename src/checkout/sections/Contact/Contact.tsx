import { type FC, useCallback, useState } from "react";
import { GuestUser } from "@/checkout/sections/GuestUser/GuestUser";
import { SignInPrompt } from "@/checkout/sections/Contact/SignInPrompt";
import { useCheckout } from "@/checkout/hooks/useCheckout";

interface ContactProps {
	setShowOnlyContact: (value: boolean) => void;
}

export const Contact: FC<ContactProps> = () => {
	const { checkout } = useCheckout();
	const [email, setEmail] = useState(checkout?.email || "");

	const handleUserResolved = useCallback(
		(signedInEmail: string | null) => {
			if (signedInEmail && !email) {
				setEmail(signedInEmail);
			}
		},
		[email],
	);

	return (
		<div className="checkout-section-container">
			<SignInPrompt onUserResolved={handleUserResolved} />
			<GuestUser onEmailChange={setEmail} email={email} />
		</div>
	);
};
