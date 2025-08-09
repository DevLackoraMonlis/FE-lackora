import { AllApplications } from "@/shared/constants/routes";
import {
	IconArrowsLeftRight,
	IconAsset,
	IconBox,
	IconBrandAppgallery,
	IconBuildingBroadcastTower,
	IconCategory2,
	IconCpu,
	IconDevices2,
	IconDiscount,
	IconTableOptions,
	IconUsers,
} from "@tabler/icons-react";
import type { ReactNode } from "react";

export function getSidePanelAppIcon(iconSize: number, name: string, color = "#C9C9C9"): ReactNode {
	const icons: Record<string, ReactNode> = {
		[AllApplications.ASSET_IDENTIFICATION.name]: (
			<IconAsset color={color} width={iconSize} height={iconSize} />
		),
		[AllApplications.INVENTORY_MANAGEMENT.name]: <IconBox color={color} width={iconSize} height={iconSize} />,
		[AllApplications.MONO_MARKET.name]: (
			<IconBrandAppgallery color={color} width={iconSize} height={iconSize} />
		),
		[AllApplications.CYBER_ASSETS.name]: <IconCategory2 color={color} width={iconSize} height={iconSize} />,
	};

	return icons[name] || <IconArrowsLeftRight color={color} width={iconSize} height={iconSize} />;
}

export function getSidePanelAppModuleIcon(iconSize: number, name: string, color = "#C9C9C9"): ReactNode {
	const icons: Record<string, ReactNode> = {
		[AllApplications.ASSET_IDENTIFICATION.modules.DISCOVERY_SETTINGS]: (
			<IconDiscount color={color} width={iconSize} height={iconSize} />
		),
		[AllApplications.ASSET_IDENTIFICATION.modules.PROFILING_SETTINGS]: (
			<IconDiscount color={color} width={iconSize} height={iconSize} />
		),
		[AllApplications.CYBER_ASSETS.modules.CYBER_ASSETS]: (
			<IconDevices2 color={color} width={iconSize} height={iconSize} />
		),
		[AllApplications.INVENTORY_MANAGEMENT.modules.SYSTEM_DETAILS]: (
			<IconDevices2 color={color} width={iconSize} height={iconSize} />
		),
		[AllApplications.INVENTORY_MANAGEMENT.modules.SOFTWARE]: (
			<IconTableOptions color={color} width={iconSize} height={iconSize} />
		),
		[AllApplications.INVENTORY_MANAGEMENT.modules.HARDWARE]: (
			<IconCpu color={color} width={iconSize} height={iconSize} />
		),
		[AllApplications.INVENTORY_MANAGEMENT.modules.NETWORK]: (
			<IconBuildingBroadcastTower color={color} width={iconSize} height={iconSize} />
		),
		[AllApplications.INVENTORY_MANAGEMENT.modules.USERS]: (
			<IconUsers color={color} width={iconSize} height={iconSize} />
		),
	};

	return icons[name] || <IconArrowsLeftRight color={color} width={iconSize} height={iconSize} />;
}
