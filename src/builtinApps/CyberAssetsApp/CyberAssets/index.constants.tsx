import {
	getCyberAssetCriticalityBadge,
	getCyberAssetDiscoveryTypeBadge,
	getCyberAssetStateBadge,
	getCyberAssetStatusBadge,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.helper";
import type { TanStackDataTableColumnColDef } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import type { ICAdvancedFilterDataRs } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Flex, Text } from "@mantine/core";
import { IconMoodEmpty } from "@tabler/icons-react";
import {
	CyberAssetCriticality,
	type CyberAssetDiscoveryType,
	CyberAssetState,
	CyberAssetStatus,
} from "./index.enum";

export const CYBER_ASSETS_FORMATTED_COLUMNS: TanStackDataTableColumnColDef<ICAdvancedFilterDataRs>[] = [
	{
		accessor: "hostname",
		render: (record) => {
			return (
				<Flex gap={"xs"}>
					<IconMoodEmpty />
					<Text c={"blue"}>{record.hostname}</Text>
				</Flex>
			);
		},
	},
	{
		accessor: "previous_status",
		render: (record) => {
			return getCyberAssetStatusBadge({ type: record.previous_status as CyberAssetStatus });
		},
	},
	{
		accessor: "current_status",
		render: (record) => {
			return getCyberAssetStatusBadge({ type: record.current_status as CyberAssetStatus });
		},
	},
	{
		accessor: "criticality",
		render: (record) => {
			return getCyberAssetCriticalityBadge({ type: record.criticality as CyberAssetCriticality });
		},
	},
	{
		accessor: "discovery_type",
		render: (record) => {
			return getCyberAssetDiscoveryTypeBadge({ type: record.discovery_type as CyberAssetDiscoveryType });
		},
	},
	{
		accessor: "state",
		render: (record) => {
			return getCyberAssetStateBadge({ type: record.state as CyberAssetState });
		},
	},
];

export const CYBER_ASSET_CRITICALITY_COLOR: Record<CyberAssetCriticality, string> = {
	[CyberAssetCriticality.HIGH]: "#F76707",
	[CyberAssetCriticality.LOW]: "#12B886",
	[CyberAssetCriticality.MEDIUM]: "#FAB005",
	[CyberAssetCriticality.VERY_HIGH]: "#FA5252",
};

export const CYBER_ASSET_STATUS_COLOR: Record<CyberAssetStatus, string> = {
	[CyberAssetStatus.ASSOCIATED]: "#3BC9DB",
	[CyberAssetStatus.DEFECTIVE]: "#C92A2A",
	[CyberAssetStatus.EXTERNAL]: "#FAB005",
	[CyberAssetStatus.GUEST]: "#7950F2",
	[CyberAssetStatus.UNREACHABLE]: "#868E96",
	[CyberAssetStatus.PROFILED]: "#087F5B",
	[CyberAssetStatus.NO_POLICY]: "#000000",
};

export const CYBER_ASSET_STATE_COLOR: Record<CyberAssetState, string> = {
	[CyberAssetState.MANAGEABLE]: "#4C6EF5",
	[CyberAssetState.UNMANAGEABLE]: "#868E96",
};
