import type { AxiosError, AxiosResponse } from "axios";

type DefaultPaginationRq = {
	page: number;
	limit: number;
	sort?: string;
	order?: string;
	condition?: string;
	search?: string;
};

export type PaginationRq<T = null> = T extends Record<string, unknown>
	? T & DefaultPaginationRq
	: DefaultPaginationRq;

export type PaginationRs<T, K = unknown> = {
	results: T[];
	total: number;
	metadata?: K;
};

export type SessionEnvs = {
	baseUrl?: string;
	wsUrl?: string;
	hostUrl?: string;
	nextAuthUrl?: string;
};

export type CustomError = AxiosError<{ detail: { msg: string }[] | string }>;

export type CustomSuccess = AxiosResponse<{ message: string }>;

export type MutationContext = {
	successMessage?: string;
	errorMessage?: string;
	hideSuccessMessage?: boolean;
};
