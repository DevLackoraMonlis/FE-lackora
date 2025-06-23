// src/api/orval-mutator.ts
import { httpService } from "@/http/httpService";
import type { AxiosResponse } from "axios";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type RequestArgs = {
	url: string;
	method: Method;
	data?: unknown;
	params?: Record<string, unknown>;
	headers?: Record<string, string>;
	signal?: AbortSignal;
};

export const orvalMutator = async <T>({
	url,
	method,
	data,
	params,
	headers,
	signal,
}: RequestArgs): Promise<AxiosResponse<T>> => {
	const config = {
		params,
		headers,
		signal,
	};

	switch (method) {
		case "GET":
			return httpService.get<T>(url, config);
		case "POST":
			return httpService.post<T>(url, data, config);
		case "PUT":
			return httpService.put<T>(url, data, config);
		case "DELETE":
			return httpService.delete<T>(url, config);
		default:
			throw new Error(`Unsupported method: ${method}`);
	}
};
