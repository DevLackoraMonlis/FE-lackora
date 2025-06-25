import { AllApplications } from "@/shared/enums/index.enums";
import { IconAsset, IconDiscount } from "@tabler/icons-react";
import type { ReactNode } from "react";

export const SIDE_PANEL_APP_ICON: Record<string, ReactNode> = {
	[AllApplications.ASSET_IDENTIFICATION.name]: <IconAsset />,
};

export const SIDE_PANEL_APP_MODULE_ICON: Record<string, ReactNode> = {
	[AllApplications.ASSET_IDENTIFICATION.modules.DISCOVERY_SETTINGS]: (
		<IconDiscount />
	),
	[AllApplications.ASSET_IDENTIFICATION.modules.PROFILING_SETTINGS]: (
		<IconDiscount />
	),
};
