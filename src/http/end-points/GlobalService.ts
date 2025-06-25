import type {
	GetTokenRq,
	GetTokenRs,
} from "@/http/end-points/UserManagementService.types";

import type { GetNonceRq } from "@/http/end-points/AuthService.types";
import type { ActiveApplicationsResponse } from "@/http/generated/models";
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

async function getRefreshToken(refreshToken: string, baseUrl?: string) {
	return axios.post<GetTokenRs>(`${baseUrl}${ControllerPath}/refresh`, {
		refresh_token: refreshToken,
	});
}

async function logout(refreshToken: string, baseUrl?: string) {
	return axios.post<void>(`${baseUrl}${ControllerPath}/logout`, {
		refresh_token: refreshToken,
	});
}

export const getActiveApplications = (
	baseUrl?: string,
	accessToken?: string,
	xNonce?: string,
) => {
	return axios.get<ActiveApplicationsResponse>(
		`${baseUrl}/api/application-management/active-applications`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"x-nonce": xNonce,
			},
		},
	);
};

async function getNonce({
	xNonceAuthenticate,
	baseUrl,
	accessToken,
	...params
}: GetNonceRq) {
	return axios.get<string>(`${baseUrl}${CoreControllerPath}/get-nonce`, {
		params,
		headers: {
			"x-nonce-authenticate": xNonceAuthenticate,
			Authorization: `Bearer ${accessToken}`,
		},
	});
}

export const GlobalService = {
	getAccessToken,
	getRefreshToken,
	logout,
	getNonce,
	getActiveApplications,
};
