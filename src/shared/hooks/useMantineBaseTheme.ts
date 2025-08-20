import type { GlobalTheme } from "@/shared/contexts/globalSettingContext";
import { DEFAULT_THEME } from "@mantine/core";
import type { MantineColorsTuple, MantineThemeOverride } from "@mantine/core";

const brandGreen: MantineColorsTuple = [
	"oklch(95% 0.02 194.57)",
	"oklch(85% 0.04 194.57)",
	"oklch(70% 0.05 194.57)",
	"oklch(60% 0.06 194.57)",
	"oklch(50% 0.065 194.57)",
	"oklch(43.18% 0.065 194.57)", // main
	"oklch(35% 0.06 194.57)",
	"oklch(25% 0.05 194.57)",
	"oklch(18% 0.04 194.57)",
	"oklch(12% 0.03 194.57)",
];

const brandPink: MantineColorsTuple = [
	"oklch(95% 0.01 20.53)",
	"oklch(90% 0.03 20.53)",
	"oklch(85% 0.045 20.53)",
	"oklch(83% 0.05 20.53)",
	"oklch(82.7% 0.055 20.53)",
	"oklch(82.54% 0.063 20.53)", // main
	"oklch(75% 0.06 20.53)",
	"oklch(65% 0.05 20.53)",
	"oklch(55% 0.04 20.53)",
	"oklch(45% 0.03 20.53)",
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
		white: "oklch(100% 0 0)",
		black: "oklch(0% 0 0)",
		defaultRadius: "md",
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
		primaryShade: 5,
		defaultGradient: {
			from: theme === "pink" ? "brandPink" : "brandGreen",
			to: theme !== "pink" ? "brandPink.7" : "brandGreen.3",
			deg: 70,
		},
		primaryColor: "primary",
		colors: {
			...DEFAULT_THEME.colors,
			primary: theme === "pink" ? brandPink : brandGreen,
			brandPink,
			brandGreen,
		},
	};

	return { mantineBaseTheme };
}
