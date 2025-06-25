"use server";

import * as process from "node:process";
import { AuthService } from "@/http/end-points/AuthService";
import type { GetNonceRq } from "@/http/end-points/AuthService.types";

export async function getHttpRequestXNonce(
	params: Omit<GetNonceRq, "xNonceAuthenticate">,
) {
	return AuthService.getNonce({
		...params,
		xNonceAuthenticate: process.env.X_NONCE_AUTHENTICATE || "",
		baseUrl: process.env.BASE_URL,
	});
}
