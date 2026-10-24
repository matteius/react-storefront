/** Only same-origin relative destinations may survive an authentication round trip. */
export function safeFiefNextPath(raw: string | null | undefined): string {
	if (!raw || !raw.startsWith("/") || raw.startsWith("//") || /[\\\x00-\x20\x7f]/.test(raw)) return "/";
	return raw;
}
export const FIEF_LOGIN_STATE_COOKIE = "fief_login_state";
