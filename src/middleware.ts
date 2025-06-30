import { createI18nMiddleware } from "next-international/middleware";
import type { NextRequest } from "next/server";
const I18nMiddleware = createI18nMiddleware({
	locales: ["en"],
	defaultLocale: "en",
	urlMappingStrategy: "rewriteDefault",
});
import nonce from "../nonce";

export async function middleware(request: NextRequest) {
	// Generate a dynamic nonce

	// Add the CSP header with the dynamic nonce
	const response = I18nMiddleware(request);
	response.headers.set(
		"Content-Security-Policy",
		`
      default-src 'self' ${process.env.BASE_URL || ""} ${process.env.WS_URL || ""};
      script-src 'self' 'unsafe-eval' 'nonce-${nonce.nonce}';
      style-src 'self' 'unsafe-inline';
      font-src 'self';
      img-src 'self' data:;
      object-src 'self' data:;
    `
			.replace(/\s{2,}/g, " ")
			.trim(),
	);

	return response;
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
