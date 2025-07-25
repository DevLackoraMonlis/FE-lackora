import { Badge, Flex, Text } from "@mantine/core";
import {
	IconAlertTriangle,
	IconArchive,
	IconCircleCheck,
	IconCircleDot,
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
	CyberAssetCriticality,
	CyberAssetDiscoveryType,
	type CyberAssetState,
	type CyberAssetStatus,
} from "./index.enum";

export function getCyberAssetCriticalityBadge(params: {
	type: CyberAssetCriticality;
}) {
	const iconMaps: Record<CyberAssetCriticality, ReactNode> = {
		[CyberAssetCriticality.HIGH]: <IconAlertTriangle size={12} />,
		[CyberAssetCriticality.LOW]: <IconCircleCheck size={12} />,
		[CyberAssetCriticality.MEDIUM]: <IconCircleDot size={12} />,
		[CyberAssetCriticality.VERY_HIGH]: <IconFlame size={12} />,
	};

	return (
		<Badge
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
}) {
	return (
		<Badge variant={"dot"} radius={"xl"} size={"sm"} color={CYBER_ASSET_STATUS_COLOR[params.type]}>
			{params.type}
		</Badge>
	);
}

export function getCyberAssetStateBadge(params: {
	type: CyberAssetState;
}) {
	return (
		<Badge variant={"outline"} radius={"xl"} size={"sm"} color={CYBER_ASSET_STATE_COLOR[params.type]}>
			{params.type}
		</Badge>
	);
}

export function getCyberAssetDiscoveryTypeBadge(params: {
	type: CyberAssetDiscoveryType;
}) {
	const iconMap: Record<CyberAssetDiscoveryType, ReactNode> = {
		[CyberAssetDiscoveryType.BY_INVENTORY]: <IconArchive size={12} />,
		[CyberAssetDiscoveryType.DISCOVERED]: <IconSearch size={12} />,
		[CyberAssetDiscoveryType.MANUAL]: <IconHighlight size={12} />,
	};
	return (
		<Flex align={"center"} gap={"md"}>
			{iconMap[params.type]}
			<Text fz={"xs"}>{params.type}</Text>
		</Flex>
	);
}
