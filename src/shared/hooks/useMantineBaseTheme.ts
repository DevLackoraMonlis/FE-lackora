"use client";

import { DEFAULT_THEME, type MantineThemeOverride } from "@mantine/core";

export default function useMantineBaseTheme() {
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
