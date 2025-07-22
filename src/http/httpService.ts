"use client";
import type { Token } from "@/http/generated/models";
import { AppRoutes } from "@/shared/constants/routes";
import envStore from "@/shared/stores/envStore";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import type { Session } from "next-auth";
import { getSession, signIn, signOut } from "next-auth/react";
import qs from "qs";

export type SessionUserType = {
	data: Token;
	name?: string;
};

type SessionType = Session & {
	user: SessionUserType;
};

type QueueRequest = {
	resolve: (value: AxiosResponse) => void;
	reject: (reason?: unknown) => void;
};

class HttpService {
	private readonly axiosService: AxiosInstance;
	private isRefreshing = false;
	private failedQueue: QueueRequest[] = [];

	constructor() {
		this.axiosService = axios.create({
			headers: {
				"Content-Type": "application/json",
			},
			paramsSerializer: {
				serialize: (params) => {
					return qs.stringify(params, { indices: false });
				},
			},
		});

		this.axiosService.interceptors.response.use(
			(successResponse) => successResponse,
			async (failedResponse) => {
				const status = failedResponse?.response?.status;
				const originalRequest = failedResponse?.config;
				const session = (await getSession()) as SessionType;
				const sessionToken = session?.user as SessionUserType;
				const refreshToken = sessionToken?.data.refresh_token;
				const name = sessionToken?.name;

				if (status === 401 && refreshToken) {
					if (!this.isRefreshing) {
						this.isRefreshing = true;

						try {
							const response = await signIn("credentials", {
								redirect: false,
								password: "",
								refreshToken,
								username: name,
								baseUrl: envStore.getState().envs.baseUrl,
							});

							if (!response?.ok) {
								this.processQueue(null, response?.error);
								void signOut({ redirect: true, callbackUrl: AppRoutes.login });
								return Promise.reject(response?.error);
							}

							this.processQueue(response, null);
							this.isRefreshing = false;

							return this.axiosService(originalRequest);
						} catch (refreshError) {
							console.error("Failed to refresh token:", refreshError);
							this.processQueue(null, refreshError);
							this.isRefreshing = false;
							void signOut({ redirect: true, callbackUrl: AppRoutes.login });
							return Promise.reject(refreshError);
						}
					}

					return new Promise<AxiosResponse>((resolve, reject) => {
						this.failedQueue.push({ resolve, reject });
					})
						.then((tokenResponse) => {
							const res = tokenResponse as { access_token?: string };
							originalRequest.headers.Authorization = `Bearer ${res?.access_token}`;
							return this.axiosService(originalRequest);
						})
						.catch((err) => Promise.reject(err));
				}

				return Promise.reject(failedResponse);
			},
		);

		this.axiosService.interceptors.request.use(async (request) => {
			const session = (await getSession()) as SessionType;
			let xNonce = "";
			try {
				const xNonceRes = await axios.post<{ nonce: string }>("/api/get-xnonce", {
					method: request.method || "GET",
					route: request.url || "",
					accessToken: session?.user.data.access_token || "",
					baseUrl: envStore.getState().envs.baseUrl,
				});
				xNonce = xNonceRes.data.nonce;
			} catch (err) {
				console.error("Failed to refresh token:", err);
				void signOut({ redirect: true, callbackUrl: AppRoutes.login });
			}

			const sessionToken = session?.user as SessionUserType;
			if (sessionToken) {
				request.headers.Authorization = `Bearer ${sessionToken?.data?.access_token}`;
				request.headers["x-nonce"] = xNonce;
			}
			return request;
		});
	}

	private processQueue(tokenResponse: unknown, error: unknown) {
		this.failedQueue.forEach(({ resolve, reject }) => {
			if (tokenResponse) {
				resolve(tokenResponse as AxiosResponse);
			} else {
				reject(error);
			}
		});
		this.failedQueue = [];
	}

	async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosService.get(`${envStore.getState().envs.baseUrl}${url}`, config);
	}

	async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosService.post(`${envStore.getState().envs.baseUrl}${url}`, data, config);
	}

	async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosService.put(`${envStore.getState().envs.baseUrl}${url}`, data, config);
	}

	async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosService.delete(`${envStore.getState().envs.baseUrl}${url}`, config);
	}
}

// Create an instance of HttpService with the ApiDefaultError type
const httpService = new HttpService();

export { httpService };
