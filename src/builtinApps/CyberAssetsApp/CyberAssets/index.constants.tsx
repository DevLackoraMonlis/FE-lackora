import {
	getCyberAssetChangeTypeBadge,
	getCyberAssetClassificationIcon,
	getCyberAssetCriticalityBadge,
	getCyberAssetDiscoveryTypeBadge,
	getCyberAssetOsTypeBadge,
	getCyberAssetStateBadge,
	getCyberAssetStatusBadge,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.helper";
import type {
	CyberAssetDetailOverviewChangeType,
	CyberAssetDetailOverviewTopServiceStatus,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import type { TanStackDataTableColumnColDef } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import { IC_ADVANCED_FILTER_BLANK_TEXT } from "@/shared/components/infraComponents/ICAdvancedFilter/index.constants";
import type { ICAdvancedFilterDataRs } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { AppRoutes } from "@/shared/constants/routes";
import { Badge, Box, Divider, Flex, Text } from "@mantine/core";
import { IconLink } from "@tabler/icons-react";
import Link from "next/link";
import {
	type CyberAssetClassification,
	CyberAssetCriticality,
	type CyberAssetDiscoveryType,
	type CyberAssetOsType,
	CyberAssetState,
	CyberAssetStatus,
} from "./index.enum";

export const getCyberAssetsFormattedColumns: (
	appName?: string,
	moduleName?: string,
) => TanStackDataTableColumnColDef<ICAdvancedFilterDataRs>[] = (appName, moduleName) => [
	{
		accessor: "primary_ip",
		render: (record) => {
			return (
				<Flex key={`primary_ip-${record.primary_ip}`} justify={"space-between"} align={"center"}>
					<Divider
						h={32}
						size={4}
						color={CYBER_ASSET_STATE_COLOR[record.state as CyberAssetState]}
						orientation={"vertical"}
						mr={"xs"}
					/>
					<Flex align={"center"} gap={"xs"}>
						{getCyberAssetClassificationIcon({ type: record.classification as CyberAssetClassification })}
						<Text
							href={
								appName && moduleName ? AppRoutes.appModuleDetailPage(appName, moduleName, record.id) : "#"
							}
							component={Link}
							fz={"xs"}
							fw={"bold"}
							c={"blue"}
							ml={"xs"}
						>
							{record.primary_ip}
						</Text>
					</Flex>
				</Flex>
			);
		},
	},
	{
		accessor: "hostname",
		render: (record) => {
			return (
				<Flex w={"100%"} key={`hostname-${record.hostname}`} justify={"space-between"} align={"center"}>
					{record.hostname ? (
						<Text fz={"xs"} fw={"bold"} ml={"xs"}>
							{record.hostname}
						</Text>
					) : (
						<Box ml={"xs"}>{IC_ADVANCED_FILTER_BLANK_TEXT}</Box>
					)}

					{!!record.has_related_ip && (
						<Badge variant={"light"} size={"xs"} leftSection={<IconLink size={12} />}>
							{record.has_related_ip}
						</Badge>
					)}
				</Flex>
			);
		},
	},
	{
		accessor: "previous_status",
		render: (record) => {
			return getCyberAssetStatusBadge({
				type: record.previous_status as CyberAssetStatus,
				props: {
					m: "xs",
				},
			});
		},
	},
	{
		accessor: "status",
		render: (record) => {
			return getCyberAssetStatusBadge({
				type: record.status as CyberAssetStatus,
				props: {
					m: "xs",
				},
			});
		},
	},
	{
		accessor: "criticality",
		render: (record) => {
			return getCyberAssetCriticalityBadge({
				type: record.criticality as CyberAssetCriticality,
				props: {
					m: "xs",
				},
			});
		},
	},
	{
		accessor: "discovery_type",
		render: (record) => {
			return getCyberAssetDiscoveryTypeBadge({
				type: record.discovery_type as CyberAssetDiscoveryType,
				props: {
					m: "xs",
				},
			});
		},
	},
	{
		accessor: "os_name",
		render: (record) => {
			return getCyberAssetOsTypeBadge({
				type: record.os_name as CyberAssetOsType,
				wrapperProps: {
					m: "xs",
				},
			});
		},
	},
	{
		accessor: "state",
		render: (record) => {
			return getCyberAssetStateBadge({
				type: record.state as CyberAssetState,
				props: {
					m: "xs",
				},
			});
		},
	},
];

export const getCyberAssetsInventoryFormattedColumns: () => TanStackDataTableColumnColDef<ICAdvancedFilterDataRs>[] =
	() => [
		{
			accessor: "os_name",
			render: (record) => {
				return getCyberAssetOsTypeBadge({
					type: record.os_name as CyberAssetOsType,
					wrapperProps: {
						m: "xs",
					},
					customType: record.os_version,
				});
			},
		},
	];

export const getCyberAssetsChangesFormattedColumns: () => TanStackDataTableColumnColDef<ICAdvancedFilterDataRs>[] =
	() => [
		{
			accessor: "change_type",
			render: (record) => {
				return getCyberAssetChangeTypeBadge({
					type: record.change_type as CyberAssetDetailOverviewChangeType,
					props: {
						m: "xs",
					},
				});
			},
		},
	];

export const CYBER_ASSET_CRITICALITY_COLOR: Record<CyberAssetCriticality, string> = {
	[CyberAssetCriticality.HIGH]: "#F76707",
	[CyberAssetCriticality.LOW]: "#12B886",
	[CyberAssetCriticality.MEDIUM]: "#FAB005",
	[CyberAssetCriticality.VERY_HIGH]: "#FA5252",
	[CyberAssetCriticality.CRITICAL]: "#b12c2c",
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

export const CYBER_ASSET_SERVICE_STATUS_COLOR: Record<CyberAssetDetailOverviewTopServiceStatus, string> = {
	RUNNING: "#087F5B",
	STOPPED: "#F03E3E",
};

export const CYBER_ASSET_STATE_COLOR: Record<CyberAssetState, string> = {
	[CyberAssetState.MANAGEABLE]: "#4C6EF5",
	[CyberAssetState.UNMANAGEABLE]: "#868E96",
};

export const CYBER_ASSET_CHANGE_TYPE_COLOR: Record<CyberAssetDetailOverviewChangeType, string> = {
	MODIFY: "#12B886",
	ADD: "#228BE6",
	DELETE: "#FA5252",
};
