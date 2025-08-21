import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export function useBreakpoint() {
	const { breakpoints } = useMantineTheme();
	const isXs = useMediaQuery(`(min-width: ${breakpoints.xs})`);
	const isSm = useMediaQuery(`(min-width: ${breakpoints.sm})`);
	const isMd = useMediaQuery(`(min-width: ${breakpoints.md})`);
	const isLg = useMediaQuery(`(min-width: ${breakpoints.lg})`);
	const isXl = useMediaQuery(`(min-width: ${breakpoints.xl})`);
	const is2xl = useMediaQuery(`(min-width: ${breakpoints["2xl"]})`);

	return { isXs, isSm, isMd, isLg, isXl, is2xl };
}
