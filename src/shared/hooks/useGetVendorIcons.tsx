import { MonoWatchLogo } from "@/shared/icons/components/general";
import type { ReactNode } from "react";

export const useGetVendorIcons = () => {
	const getVendorIcon = (params: { size: number; name: string }) => {
		const icons: Record<string, ReactNode> = {
			MonoSuite: <MonoWatchLogo width={params.size} height={params.size} />,
		};

		return icons[params.name];
	};

	return { getVendorIcon };
};
