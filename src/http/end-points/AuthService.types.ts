export type GetNonceRq = {
	route: string;
	method: string;
	xNonceAuthenticate: string;
	accessToken: string;
} & { baseUrl?: string };
