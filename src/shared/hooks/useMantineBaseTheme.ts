"use client";

import { DEFAULT_THEME } from "@mantine/core";
import type { MantineColorScheme, MantineThemeOverride } from "@mantine/core";

declare module "@mantine/core" {
  export interface MantineThemeOther {
    darkMode: boolean;
    colorScheme: MantineColorScheme;
    fontWeights: {
      thin: 100;
      extraLight: 200;
      light: 300;
      normal: 400;
      medium: 500;
      semiBold: 600;
      bold: 700;
      extraBold: 800;
      black: 900;
    };
  }
}

export default function useMantineBaseTheme({ colorScheme }: { colorScheme: MantineColorScheme }) {
  const mantineBaseTheme: MantineThemeOverride = {
    fontFamily: "var(--open-sans) !important",
    white: "#FAFAFA",
    black: "#11121F",
    spacing: {
      ...DEFAULT_THEME.spacing,
      xxl: "40px",
      "2xs": "4px",
    },
    fontSizes: {
      ...DEFAULT_THEME.fontSizes,
      xxl: "26px",
      "2xxl": "32px",
    },
    other: {
      colorScheme,
      darkMode: colorScheme === "dark",
      fontWeights: {
        thin: 100,
        extraLight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
        extraBold: 800,
        black: 900,
      },
    },
    primaryColor: "primary",
    colors: {
      primary: [
        "#15aabf80",
        "#22B8CF",
        "#15aabf80",
        "#15aabf80",
        "#15aabf80",
        "#15aabf80",
        "#15aabf80",
        "#15aabf80",
        "#15aabf80",
        "#15aabf80",
      ],
    },
  };

  return { mantineBaseTheme };
}
