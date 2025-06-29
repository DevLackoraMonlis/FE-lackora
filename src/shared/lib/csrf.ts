// utils/csrf.ts
import { createHmac } from "node:crypto";

export function validateSignedCsrfToken(
	token: string,
	secret: string,
): boolean {
	if (!token || !token.includes(".")) return false;

	const [rawToken, sentHmac] = token.split(".");
	if (!rawToken || !sentHmac) return false;

	const expectedHmac = createHmac("sha256", secret)
		.update(rawToken)
		.digest("base64url");

	return expectedHmac === sentHmac;
}
