"use client";

import useMantineBaseTheme from "@/shared/hooks/useMantineBaseTheme";
import { type MantineColorScheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { PropsWithChildren } from "react";
import nonce from "../../../../nonce";

export default function MantineBaseProvider(props: PropsWithChildren) {
  const defaultTheme = window.localStorage.getItem("mantine-color-scheme-value") as
    | MantineColorScheme
    | undefined;

  const colorScheme = defaultTheme === "dark" ? "dark" : "light";

  const { mantineBaseTheme } = useMantineBaseTheme({ colorScheme });

  return (
    <MantineProvider
      getStyleNonce={() => nonce.nonce}
      defaultColorScheme={colorScheme}
      withCssVariables
      theme={mantineBaseTheme}
    >
      <Notifications position="top-right" zIndex={Number.MAX_SAFE_INTEGER} />
      {props.children}
    </MantineProvider>
  );
}
