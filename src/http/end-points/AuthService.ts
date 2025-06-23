import type {
	GetTokenRq,
	GetTokenRs,
} from "@/http/end-points/UserManagementService.types";

import type { GetNonceRq } from "@/http/end-points/AuthService.types";
import axios from "axios";

const ControllerPath = "/api/user-management";
const CoreControllerPath = "/api/core";

async function getAccessToken(params: GetTokenRq & { baseUrl?: string }) {
	return axios.post<GetTokenRs>(
		`${params.baseUrl}${ControllerPath}/token`,
		params,
		{
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		},
	);
}

async function getRefreshToken(refreshToken: string) {
	return axios.post<GetTokenRs>(`${ControllerPath}/refresh`, {
		refresh_token: refreshToken,
	});
}

async function logout(refreshToken: string) {
	return axios.post<void>(`${ControllerPath}/logout`, {
		refresh_token: refreshToken,
	});
}

async function getNonce({ xNonceAuthenticate, ...params }: GetNonceRq) {
	return axios.get<string>(`${CoreControllerPath}/get-nonce`, {
		params,
		headers: {
			"x-nonce-authenticate": xNonceAuthenticate,
		},
	});
}

export const AuthService = {
	getAccessToken,
	getRefreshToken,
	logout,
	getNonce,
};
