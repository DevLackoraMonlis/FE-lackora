import { AllApplications } from "@/shared/enums/index.enums";
import { IconArrowsLeftRight, IconAsset, IconDiscount } from "@tabler/icons-react";
import type { ReactNode } from "react";

export function getSidePanelAppIcon(iconSize: number, name: string): ReactNode {
	const icons: Record<string, ReactNode> = {
		[AllApplications.ASSET_IDENTIFICATION.name]: (
			<IconAsset color={"#C9C9C9"} width={iconSize} height={iconSize} />
		),
	};

	return icons[name] || <IconArrowsLeftRight color={"#C9C9C9"} width={iconSize} height={iconSize} />;
}

export function getSidePanelAppModuleIcon(iconSize: number, name: string): ReactNode {
	const icons: Record<string, ReactNode> = {
		[AllApplications.ASSET_IDENTIFICATION.modules.DISCOVERY_SETTINGS]: (
			<IconDiscount color={"#C9C9C9"} width={iconSize} height={iconSize} />
		),
		[AllApplications.ASSET_IDENTIFICATION.modules.PROFILING_SETTINGS]: (
			<IconDiscount color={"#C9C9C9"} width={iconSize} height={iconSize} />
		),
	};

	return icons[name] || <IconArrowsLeftRight color={"#C9C9C9"} width={iconSize} height={iconSize} />;
}
