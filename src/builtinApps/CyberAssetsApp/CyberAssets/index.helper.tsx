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
	IconX,
} from "@tabler/icons-react";
import type { ReactNode } from "react";
import {
	CYBER_ASSET_CHANGE_TYPE_COLOR,
	CYBER_ASSET_CRITICALITY_COLOR,
	CYBER_ASSET_SERVICE_STATUS_COLOR,
	CYBER_ASSET_STATE_COLOR,
	CYBER_ASSET_STATUS_COLOR,
} from "./index.constants";
import {
	CyberAssetClassificationEnum,
	CyberAssetCriticalityEnum,
	CyberAssetDiscoveryTypeEnum,
	CyberAssetOsTypeEnum,
	type CyberAssetStateEnum,
	type CyberAssetStatusEnum,
} from "./index.enum";

export function getCyberAssetCriticalityBadge(params: {
	type: CyberAssetCriticalityEnum;
	props?: BadgeProps;
	value?: number;
}) {
	const iconMaps: Record<CyberAssetCriticalityEnum, ReactNode> = {
		[CyberAssetCriticalityEnum.HIGH]: <IconArrowBadgeUp size={12} />,
		[CyberAssetCriticalityEnum.LOW]: <IconArrowBadgeDown size={12} />,
		[CyberAssetCriticalityEnum.MEDIUM]: <IconEqual size={12} />,
		[CyberAssetCriticalityEnum.VERY_HIGH]: <IconBadges size={12} />,
		[CyberAssetCriticalityEnum.CRITICAL]: <IconBadges size={12} />,
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
			{params.value ? (
				<Flex gap={"2xs"} align={"center"}>
					<Text fz={"xs"} c={CYBER_ASSET_CRITICALITY_COLOR[params.type]}>
						{params.value}
					</Text>
					{params.type}
				</Flex>
			) : (
				params.type
			)}
		</Badge>
	);
}

export function getCyberAssetStatusBadge(params: {
	type: CyberAssetStatusEnum;
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
	type: CyberAssetStateEnum;
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

export function getCyberAssetChangeTypeBadge(params: {
	type: CyberAssetDetailOverviewChangeType;
	props?: BadgeProps;
}) {
	const iconMap: Record<CyberAssetDetailOverviewChangeType, ReactNode> = {
		DELETE: <IconX size={12} />,
		MODIFY: <IconX size={12} />,
		ADD: <IconPlus size={12} />,
	};
	return (
		<Badge
			leftSection={iconMap[params.type]}
			{...params.props}
			variant={"light"}
			radius={"xl"}
			size={"sm"}
			color={CYBER_ASSET_CHANGE_TYPE_COLOR[params.type]}
		>
			{params.type}
		</Badge>
	);
}

export function getCyberAssetClassificationIcon({
	type,
	size = 16,
}: {
	type: CyberAssetClassificationEnum;
	size?: number;
}) {
	const icons: Record<CyberAssetClassificationEnum, ReactNode> = {
		[CyberAssetClassificationEnum.ACCESS_POINT]: <Icons8WiFiRouter1 width={size} height={size} />,
		[CyberAssetClassificationEnum.CAMERA_IP]: <Icons8PtzCamera1 width={size} height={size} />,
		[CyberAssetClassificationEnum.FIREWALL]: <Icons8Firewall1 width={size} height={size} />,
		[CyberAssetClassificationEnum.IP_PRINTER]: <Icons8Printer1 width={size} height={size} />,
		[CyberAssetClassificationEnum.MOBILE]: <Icons8MobilePhone1 width={size} height={size} />,
		[CyberAssetClassificationEnum.NVR_DVR]: <Icons8Dvr1 width={size} height={size} />,
		[CyberAssetClassificationEnum.ROUTER]: <Icons8RouterSymbol1 width={size} height={size} />,
		[CyberAssetClassificationEnum.SERVER]: <Icons8Server1 width={size} height={size} />,
		[CyberAssetClassificationEnum.SWITCH]: <Icons8Switch1 width={size} height={size} />,
		[CyberAssetClassificationEnum.STORAGE]: <Icons8Database1 width={size} height={size} />,
		[CyberAssetClassificationEnum.PHYSICAL_HOST]: <Icons8DatabaseServer11 width={size} height={size} />,
		[CyberAssetClassificationEnum.WORK_STATION]: <Icons8Workstation1 width={size} height={size} />,
		[CyberAssetClassificationEnum.UPS]: <Icons8MediumChargingBattery1 width={size} height={size} />,
		[CyberAssetClassificationEnum.IOT]: <Icons8InternetOfThings1 width={size} height={size} />,
		[CyberAssetClassificationEnum.IP_PHONE]: <Icons8Voip1 width={size} height={size} />,
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
	type: CyberAssetDiscoveryTypeEnum;
	props?: FlexProps;
	size?: number;
}) {
	const iconMap: Record<CyberAssetDiscoveryTypeEnum, ReactNode> = {
		[CyberAssetDiscoveryTypeEnum.BY_INVENTORY]: <IconArchive size={params?.size || 12} />,
		[CyberAssetDiscoveryTypeEnum.DISCOVERED]: <IconSearch size={params?.size || 12} />,
		[CyberAssetDiscoveryTypeEnum.MANUAL]: <IconHighlight size={params?.size || 12} />,
	};

	if (!iconMap[params.type]) {
		return null;
	}

	return (
		<Flex {...params.props} align={"center"} gap={"xs"}>
			{iconMap[params.type]}
			<Text fz={"xs"} tt={"capitalize"}>
				{params.type}
			</Text>
		</Flex>
	);
}

export function getCyberAssetOsTypeBadge(params: {
	type: CyberAssetOsTypeEnum;
	wrapperProps?: FlexProps;
	customType?: ReactNode;
	size?: number;
}) {
	const iconMap: Record<CyberAssetOsTypeEnum, ReactNode> = {
		[CyberAssetOsTypeEnum.LINUX]: <LinuxSvgrepoCom1 width={params.size || 16} height={params.size || 16} />,
		[CyberAssetOsTypeEnum.WINDOWS]: <Icons8Windows101 width={params.size || 16} height={params.size || 16} />,
	};

	if (!iconMap[params.type]) {
		return null;
	}

	return (
		<Flex {...params.wrapperProps} align={"center"} gap={"xs"}>
			{iconMap[params.type]}
			{params.customType || (
				<Text fz={"xs"} tt={"capitalize"}>
					{params.type}
				</Text>
			)}
		</Flex>
	);
}
