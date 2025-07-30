import type {
	CyberAssetDetailOverviewChangeType,
	CyberAssetDetailOverviewNotificationType,
	CyberAssetDetailOverviewTopServiceStatus,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import {
	Icons8Database1,
	Icons8DatabaseServer11,
	Icons8Dvr1,
	Icons8Firewall1,
	Icons8InternetOfThings1,
	Icons8MediumChargingBattery1,
	Icons8MobilePhone1,
	Icons8Printer1,
	Icons8PtzCamera1,
	Icons8RouterSymbol1,
	Icons8Server1,
	Icons8Switch1,
	Icons8Voip1,
	Icons8WiFiRouter1,
	Icons8Windows101,
	Icons8Workstation1,
	LinuxSvgrepoCom1,
} from "@/shared/icons/components/assets";
import { Badge, type BadgeProps, Flex, type FlexProps, Text } from "@mantine/core";
import {
	IconAlertTriangle,
	IconArchive,
	IconArrowBadgeDown,
	IconArrowBadgeUp,
	IconBadges,
	IconDeviceDesktop,
	IconEqual,
	IconHighlight,
	IconInfoSquare,
	IconPencil,
	IconPlus,
	IconSearch,
	IconTool,
	IconTrash,
} from "@tabler/icons-react";
import type { ReactNode } from "react";
import {
	CYBER_ASSET_CRITICALITY_COLOR,
	CYBER_ASSET_SERVICE_STATUS_COLOR,
	CYBER_ASSET_STATE_COLOR,
	CYBER_ASSET_STATUS_COLOR,
} from "./index.constants";
import {
	CyberAssetClassification,
	CyberAssetCriticality,
	CyberAssetDiscoveryType,
	CyberAssetOsType,
	type CyberAssetState,
	type CyberAssetStatus,
} from "./index.enum";

export function getCyberAssetCriticalityBadge(params: {
	type: CyberAssetCriticality;
	props?: BadgeProps;
}) {
	const iconMaps: Record<CyberAssetCriticality, ReactNode> = {
		[CyberAssetCriticality.HIGH]: <IconArrowBadgeUp size={12} />,
		[CyberAssetCriticality.LOW]: <IconArrowBadgeDown size={12} />,
		[CyberAssetCriticality.MEDIUM]: <IconEqual size={12} />,
		[CyberAssetCriticality.VERY_HIGH]: <IconBadges size={12} />,
		[CyberAssetCriticality.CRITICAL]: <IconBadges size={12} />,
	};

	return (
		<Badge
			{...params.props}
			variant={"light"}
			radius={"xl"}
			leftSection={iconMaps[params.type]}
			size={"sm"}
			c={"black"}
			color={CYBER_ASSET_CRITICALITY_COLOR[params.type]}
		>
			{params.type}
		</Badge>
	);
}

export function getCyberAssetStatusBadge(params: {
	type: CyberAssetStatus;
	props?: BadgeProps;
}) {
	if (!params.type) {
		return null;
	}
	return (
		<Badge
			{...params.props}
			variant={"dot"}
			radius={"xl"}
			size={"sm"}
			color={CYBER_ASSET_STATUS_COLOR[params.type]}
		>
			{params.type}
		</Badge>
	);
}

export function getCyberAssetServiceStatusBadge(params: {
	type: CyberAssetDetailOverviewTopServiceStatus;
	props?: BadgeProps;
}) {
	if (!params.type) {
		return null;
	}
	return (
		<Badge
			{...params.props}
			variant={"dot"}
			radius={"xl"}
			size={"sm"}
			color={CYBER_ASSET_SERVICE_STATUS_COLOR[params.type]}
		>
			{params.type}
		</Badge>
	);
}

export function getCyberAssetStateBadge(params: {
	type: CyberAssetState;
	props?: BadgeProps;
}) {
	return (
		<Badge
			{...params.props}
			variant={"outline"}
			radius={"xl"}
			size={"sm"}
			color={CYBER_ASSET_STATE_COLOR[params.type]}
		>
			{params.type}
		</Badge>
	);
}

export function getCyberAssetClassificationIcon({
	type,
	size = 16,
}: {
	type: CyberAssetClassification;
	size?: number;
}) {
	const icons: Record<CyberAssetClassification, ReactNode> = {
		[CyberAssetClassification.ACCESS_POINT]: <Icons8WiFiRouter1 width={size} height={size} />,
		[CyberAssetClassification.CAMERA_IP]: <Icons8PtzCamera1 width={size} height={size} />,
		[CyberAssetClassification.FIREWALL]: <Icons8Firewall1 width={size} height={size} />,
		[CyberAssetClassification.IP_PRINTER]: <Icons8Printer1 width={size} height={size} />,
		[CyberAssetClassification.MOBILE]: <Icons8MobilePhone1 width={size} height={size} />,
		[CyberAssetClassification.NVR_DVR]: <Icons8Dvr1 width={size} height={size} />,
		[CyberAssetClassification.ROUTER]: <Icons8RouterSymbol1 width={size} height={size} />,
		[CyberAssetClassification.SERVER]: <Icons8Server1 width={size} height={size} />,
		[CyberAssetClassification.SWITCH]: <Icons8Switch1 width={size} height={size} />,
		[CyberAssetClassification.STORAGE]: <Icons8Database1 width={size} height={size} />,
		[CyberAssetClassification.PHYSICAL_HOST]: <Icons8DatabaseServer11 width={size} height={size} />,
		[CyberAssetClassification.WORK_STATION]: <Icons8Workstation1 width={size} height={size} />,
		[CyberAssetClassification.UPS]: <Icons8MediumChargingBattery1 width={size} height={size} />,
		[CyberAssetClassification.IOT]: <Icons8InternetOfThings1 width={size} height={size} />,
		[CyberAssetClassification.IP_PHONE]: <Icons8Voip1 width={size} height={size} />,
	};
	return icons[type] || <IconDeviceDesktop size={size} />;
}

export function getCyberAssetChangeIcon({
	type,
	size = 16,
}: {
	type: CyberAssetDetailOverviewChangeType;
	size?: number;
}) {
	const icons: Record<CyberAssetDetailOverviewChangeType, ReactNode> = {
		ADD: <IconPlus width={size} height={size} />,
		MODIFY: <IconTrash width={size} height={size} />,
		DELETE: <IconPencil width={size} height={size} />,
	};
	return icons[type];
}

export function getCyberAssetNotificationIcon({
	type,
	size = 16,
}: {
	type: CyberAssetDetailOverviewNotificationType;
	size?: number;
}) {
	const icons: Record<CyberAssetDetailOverviewNotificationType, ReactNode> = {
		AVAILABILITY: <IconInfoSquare color={"blue"} width={size} height={size} />,
		CONFLICT: <IconAlertTriangle color={"yellow"} width={size} height={size} />,
		FAILED: <IconAlertTriangle color={"red"} width={size} height={size} />,
		PATCH: <IconTool color={"gray"} width={size} height={size} />,
	};
	return icons[type];
}

export function getCyberAssetDiscoveryTypeBadge(params: {
	type: CyberAssetDiscoveryType;
	props?: FlexProps;
	size?: number;
}) {
	const iconMap: Record<CyberAssetDiscoveryType, ReactNode> = {
		[CyberAssetDiscoveryType.BY_INVENTORY]: <IconArchive size={params?.size || 12} />,
		[CyberAssetDiscoveryType.DISCOVERED]: <IconSearch size={params?.size || 12} />,
		[CyberAssetDiscoveryType.MANUAL]: <IconHighlight size={params?.size || 12} />,
	};

	if (!iconMap[params.type]) {
		return null;
	}

	return (
		<Flex {...params.props} align={"center"} gap={"sm"}>
			{iconMap[params.type]}
			<Text fz={"xs"} tt={"capitalize"}>
				{params.type}
			</Text>
		</Flex>
	);
}

export function getCyberAssetOsTypeBadge(params: {
	type: CyberAssetOsType;
	wrapperProps?: FlexProps;
	customType?: ReactNode;
	size?: number;
}) {
	const iconMap: Record<CyberAssetOsType, ReactNode> = {
		[CyberAssetOsType.LINUX]: <LinuxSvgrepoCom1 width={params.size || 16} height={params.size || 16} />,
		[CyberAssetOsType.WINDOWS]: <Icons8Windows101 width={params.size || 16} height={params.size || 16} />,
	};

	if (!iconMap[params.type]) {
		return null;
	}

	return (
		<Flex {...params.wrapperProps} align={"center"} gap={"xs"}>
			{iconMap[params.type]}
			{params.customType || <Text fz={"xs"}>{params.type}</Text>}
		</Flex>
	);
}
