"use client";

import { notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider as RQueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import type { CustomError, CustomSuccess, MutationContext } from "@/http/end-points/GeneralService.types";
import { getErrorMessage, getSuccessMessage } from "@/shared/lib/utils";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: true,
			refetchOnWindowFocus: false,
			retry: false,
		},
		mutations: {
			onError: (error, _, context) => {
				const mutationContext = context as MutationContext;
				notifications.show({
					title: "Failed",
					message: getErrorMessage(error as CustomError, mutationContext),
					color: "red",
					withBorder: true,
				});
			},
			onSuccess: (response, _, context) => {
				const mutationContext = context as MutationContext;
				notifications.show({
					title: "Success",
					message: getSuccessMessage(response as CustomSuccess, mutationContext),
					color: "green",
					withBorder: true,
					hidden: mutationContext.hideSuccessMessage,
				});
			},
		},
	},
});

export default function QueryClientProvider({ children }: { children: ReactNode }) {
	return <RQueryClientProvider client={queryClient}>{children}</RQueryClientProvider>;
}
