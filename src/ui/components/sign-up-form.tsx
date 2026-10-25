"use client";

import { useTranslations } from "next-intl";
import { FiefLoginButton } from "@/ui/components/auth/fief-login-button";

export function SignUpForm() {
	const t = useTranslations("account");

	return (
		<div className="mx-auto my-16 w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-sm">
			<h1 className="text-balance text-center text-h1">{t("signup.title")}</h1>
			<p className="mb-6 mt-2 text-center text-sm text-muted-foreground">{t("signup.fiefDescription")}</p>
			<FiefLoginButton />
		</div>
	);
}
