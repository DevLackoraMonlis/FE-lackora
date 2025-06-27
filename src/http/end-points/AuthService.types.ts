export type GetNonceRq = {
	route: string;
	method: string;
	xNonceAuthenticate: string;
} & { baseUrl?: string };
