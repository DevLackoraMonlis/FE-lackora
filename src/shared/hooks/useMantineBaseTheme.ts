import { DEFAULT_THEME } from "@mantine/core";
import type { MantineThemeOverride } from "@mantine/core";

export default function useMantineBaseTheme() {
  const mantineBaseTheme: MantineThemeOverride = {
    components: {
      Accordion: {
        defaultProps: {
          styles: ({ colors }: MantineThemeOverride) => ({ control: { backgroundColor: colors?.gray?.[2] } }),
        },
      },
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
