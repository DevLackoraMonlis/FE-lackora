import type { GlobalTheme } from "@/shared/contexts/globalSettingContext";
import { DEFAULT_THEME } from "@mantine/core";
import type { MantineThemeOverride } from "@mantine/core";

type PrimaryType = [string, string, string, string, string, string, string, string, string, string];

const pinkPrimary: PrimaryType = [
	"#FFF4F4",
	"#FFE6E5",
	"#FFD2D1",
	"#FFC1BF",
	"#F9B2B1",
	"#F6A5A4",
	"#F3B9B8",
	"#E79C9B",
	"#CC7E7D",
	"#A25D5D",
];

const greenPrimary: PrimaryType = [
	"#CFEAE8", // 0
	"#B2DDDA", // 1
	"#94D0CC", // 2
	"#6FBDB7", // 3
	"#4BAAA2", // 4
	"#2F8F88", // 5
	"#1E5552", // 6
	"#194846", // 7
	"#133A39", // 8
	"#0C2A2A", // 9
];

export default function useMantineBaseTheme(theme: GlobalTheme) {
	const mantineBaseTheme: MantineThemeOverride = {
		components: {
			Select: {
				defaultProps: {
					checkIconPosition: "right",
					comboboxProps: { transitionProps: { transition: "pop", duration: 150 } },
					styles: () => ({
						dropdown: {
							dropdown: { maxHeight: 200, overflowY: "auto" },
							zIndex: Number.MAX_SAFE_INTEGER,
						},
					}),
				},
			},
			Accordion: {
				defaultProps: {
					styles: ({ colors }: MantineThemeOverride) => ({
						control: { backgroundColor: colors?.gray?.[2] },
					}),
				},
			},
			AccordionPanel: {
				defaultProps: {
					component: "div",
				},
			},
			AccordionControl: {
				defaultProps: {
					component: "div",
					style: {
						transition: "all 150ms ease",
					},
					onMouseEnter: ({ currentTarget }: { currentTarget: HTMLDivElement }) => {
						currentTarget.style.boxShadow = DEFAULT_THEME.shadows?.sm || "";
					},
					onMouseLeave: ({ currentTarget }: { currentTarget: HTMLDivElement }) => {
						currentTarget.style.boxShadow = "none";
					},
				},
			},
			Loader: {
				defaultProps: {
					type: "dots",
				},
			},
			LoadingOverlay: {
				defaultProps: {
					overlayProps: { radius: "xs", blur: 1 },
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
			Tooltip: {
				defaultProps: {
					withArrow: true,
					transitionProps: { duration: 150 },
				},
			},
			Menu: {
				defaultProps: {
					transitionProps: { transition: "pop", duration: 150 },
				},
			},
		},
		fontFamily: "var(--manrope) !important",
		white: "#FAFAFA",
		black: "#11121F",
		breakpoints: {
			...DEFAULT_THEME.breakpoints,
			"2xl": "120em",
			"2xs": "20em",
		},
		spacing: {
			...DEFAULT_THEME.spacing,
			"2xs": "4px",
			"3xs": "2px",
			"2lg": "26px",
			"2xl": "40px",
			"3xl": "60px",
			"4xl": "80px",
		},
		fontSizes: {
			"2xs": "10px",
			...DEFAULT_THEME.fontSizes,
			"2xl": "26px",
			"3xl": "32px",
		},
		primaryColor: "primary",
		colors: {
			...DEFAULT_THEME.colors,
			primary: theme === "pink" ? pinkPrimary : greenPrimary,
		},
	};

	return { mantineBaseTheme };
}
