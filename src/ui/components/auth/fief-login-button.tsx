"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/ui/components/ui/button";

export function FiefLoginButton() {
	const t = useTranslations("account");
	return (
		<Button
			type="button"
			className="mb-4 w-full"
			onClick={() => {
				const next = window.location.pathname.replace(/\/(?:login|signup)$/, "/account") + window.location.search;
				window.location.assign(`/api/auth/login?next=${encodeURIComponent(next)}`);
			}}
		>
			{t("login.fief")}
		</Button>
	);
}
