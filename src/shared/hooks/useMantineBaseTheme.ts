import { DEFAULT_THEME } from "@mantine/core";
import type { MantineColorScheme, MantineThemeOverride } from "@mantine/core";

declare module "@mantine/core" {
  interface MantineThemeOther {
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
    components: {
      Loader: {
        defaultProps: {
          type: "dots",
          size: "lg",
        },
      },
    },
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
        "#e4f7ff",
        "#d1e9fe",
        "#a4d0f6",
        "#74b6ef",
        "#4da0e9",
        "#3392e6",
        "#228be6",
        "#1078cd",
        "#006bb9",
        "#005ca4",
      ],
    },
  };

  return { mantineBaseTheme };
}
