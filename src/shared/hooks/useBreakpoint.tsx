// hooks/useTailwindBreakpoints.ts
import { useMediaQuery } from "@mantine/hooks";

export function useBreakpoint() {
	const isSm = useMediaQuery("(min-width: 640px)");
	const isMd = useMediaQuery("(min-width: 768px)");
	const isLg = useMediaQuery("(min-width: 1024px)");
	const isXl = useMediaQuery("(min-width: 1280px)");
	const is2xl = useMediaQuery("(min-width: 1536px)");

	let current: "base" | "sm" | "md" | "lg" | "xl" | "2xl" = "base";
	if (isSm) current = "sm";
	if (isMd) current = "md";
	if (isLg) current = "lg";
	if (isXl) current = "xl";
	if (is2xl) current = "2xl";

	return { isSm, isMd, isLg, isXl, is2xl, current };
}
