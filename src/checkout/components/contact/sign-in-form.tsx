"use client";

import { type FC } from "react";
import { useTranslations } from "next-intl";
import { FiefLoginButton } from "@/ui/components/auth/fief-login-button";

export interface SignInFormProps {
	onGuestCheckout: () => void;
}

export const SignInForm: FC<SignInFormProps> = ({ onGuestCheckout }) => {
	const t = useTranslations("checkout.contact");

	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold">{t("signInTitle")}</h2>
			<FiefLoginButton />
			<button
				type="button"
				onClick={onGuestCheckout}
				className="text-sm font-medium text-foreground underline underline-offset-2 hover:no-underline"
			>
				{t("guestCheckout")}
			</button>
		</div>
	);
};
