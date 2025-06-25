"use server";

import type { GetNonceRq } from "@/http/end-points/AuthService.types";
import { GlobalService } from "@/http/end-points/GlobalService";

export async function getHttpRequestXNonce(
	params: Omit<GetNonceRq, "xNonceAuthenticate">,
) {
	return GlobalService.getNonce({
		...params,
		xNonceAuthenticate: process.env.X_NONCE_AUTHENTICATE || "",
		baseUrl: process.env.BASE_URL,
	});
}
