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
	IconCircleCheck,
	IconCircleDot,
	IconDeviceDesktop,
	IconFlame,
	IconHighlight,
	IconSearch,
} from "@tabler/icons-react";
import type { ReactNode } from "react";
import {
	CYBER_ASSET_CRITICALITY_COLOR,
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
		[CyberAssetCriticality.HIGH]: <IconAlertTriangle size={12} />,
		[CyberAssetCriticality.LOW]: <IconCircleCheck size={12} />,
		[CyberAssetCriticality.MEDIUM]: <IconCircleDot size={12} />,
		[CyberAssetCriticality.VERY_HIGH]: <IconFlame size={12} />,
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

export function getCyberAssetDiscoveryTypeBadge(params: {
	type: CyberAssetDiscoveryType;
	props?: FlexProps;
}) {
	const iconMap: Record<CyberAssetDiscoveryType, ReactNode> = {
		[CyberAssetDiscoveryType.BY_INVENTORY]: <IconArchive size={12} />,
		[CyberAssetDiscoveryType.DISCOVERED]: <IconSearch size={12} />,
		[CyberAssetDiscoveryType.MANUAL]: <IconHighlight size={12} />,
	};

	if (!iconMap[params.type]) {
		return null;
	}

	return (
		<Flex {...params.props} align={"center"} gap={"md"}>
			{iconMap[params.type]}
			<Text fz={"xs"}>{params.type}</Text>
		</Flex>
	);
}

export function getCyberAssetOsTypeBadge(params: {
	type: CyberAssetOsType;
	props?: FlexProps;
}) {
	const iconMap: Record<CyberAssetOsType, ReactNode> = {
		[CyberAssetOsType.LINUX]: <LinuxSvgrepoCom1 width={16} height={16} />,
		[CyberAssetOsType.WINDOWS]: <Icons8Windows101 width={16} height={16} />,
	};

	if (!iconMap[params.type]) {
		return null;
	}

	return (
		<Flex {...params.props} align={"center"} gap={"md"}>
			{iconMap[params.type]}
			<Text fz={"xs"}>{params.type}</Text>
		</Flex>
	);
}
