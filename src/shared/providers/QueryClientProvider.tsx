"use client";

import { useState, type ReactNode } from "react";
import { notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider as RQueryClientProvider } from "@tanstack/react-query";

import { getErrorMessage, getSuccessMessage } from "@/shared/lib/utils";
import type { CustomError, CustomSuccess } from "@/http/end-points/GeneralService.types";

export default function QueryClientProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount: true,
          refetchOnWindowFocus: false,
          retry: false,
        },
        mutations: {
          onError: (error) => {
            const errorMessage = error as CustomError;
            notifications.show({
              title: "Failed",
              message: getErrorMessage(errorMessage),
              color: "red",
              position: "top-center",
              withBorder: true,
            });
          },
          onSuccess: (response) => {
            const successMessage = response as CustomSuccess;
            notifications.show({
              title: "Success",
              message: getSuccessMessage(successMessage),
              color: "green",
              position: "top-center",
              withBorder: true,
            });
          },
        },
      },
    })
  );

  return <RQueryClientProvider client={queryClient}>{children}</RQueryClientProvider>;
}
