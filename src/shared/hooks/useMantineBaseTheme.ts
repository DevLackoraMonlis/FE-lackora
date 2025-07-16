import { DEFAULT_THEME } from "@mantine/core";
import type { MantineThemeOverride } from "@mantine/core";

export default function useMantineBaseTheme() {
	const mantineBaseTheme: MantineThemeOverride = {
		components: {
			Accordion: {
				defaultProps: {
					styles: ({ colors }: MantineThemeOverride) => ({
						control: { backgroundColor: colors?.gray?.[2] },
					}),
				},
			},
			Loader: {
				defaultProps: {
					type: "dots",
					size: "lg",
				},
			},
			Highlight: {
				defaultProps: {
					highlightStyles: { background: "transparent", fontWeight: "bold" },
				},
			},
			Text: {
				defaultProps: {
					fz: "sm",
				},
			},
		},
		fontFamily: "var(--manrope) !important",
		white: "#FAFAFA",
		black: "#11121F",
		breakpoints: {
			...DEFAULT_THEME.breakpoints,
			"2xl": "120em",
		},
		spacing: {
			...DEFAULT_THEME.spacing,
			"2xs": "4px",
			"3xs": "2px",
			"2lg": "26px",
			"2xl": "40px",
			"3xl": "60px",
		},
		fontSizes: {
			"2xs": "10px",
			...DEFAULT_THEME.fontSizes,
			"2xl": "26px",
			"3xl": "32px",
		},
		primaryColor: "primary",
		colors: {
			primary: [
				"#e5f3ff",
				"#cde2ff",
				"#9ac2ff",
				"#64a0ff",
				"#3884fe",
				"#1d72fe",
				"#0063ff",
				"#0058e4",
				"#004ecd",
				"#0043b5",
			],
			main: [
				"#d5d9e0",
				"#adb4c2",
				"#8690a4",
				"#616e87",
				"#3e4d6b",
				"#1e2e4f",
				"#15223c",
				"#0c162a",
				"#050b19",
				"#02030a",
			],
		},
	};

	return { mantineBaseTheme };
}
