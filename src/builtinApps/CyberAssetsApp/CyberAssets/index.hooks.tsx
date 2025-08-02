import CyberAssetDetailInventoryDynamicGrid from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailInventory/CyberAssetDetailInventoryDynamicGrid";
import {
	getCyberAssetClassificationIcon,
	getCyberAssetDiscoveryTypeBadge,
	getCyberAssetOsTypeBadge,
	getCyberAssetStateBadge,
	getCyberAssetStatusBadge,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.helper";
import type {
	CyberAssetDetailGeneralInfoCardProps,
	CyberAssetDetailGeneralInfoProps,
	CyberAssetDetailInventoryType,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { createDynamicICAdvancedStore } from "@/shared/components/infraComponents/ICAdvancedFilter/index.store";
import type { ICAdvancedFilterDynamicStoreType } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Flex, Text, Tooltip } from "@mantine/core";
import { IconAlarm, IconDevices2, IconMapPin, IconNetwork, IconUserCircle } from "@tabler/icons-react";
import { useEffect, useRef } from "react";
import type {
	CyberAssetClassificationEnum,
	CyberAssetDiscoveryTypeEnum,
	CyberAssetOsTypeEnum,
	CyberAssetStatusEnum,
} from "./index.enum";

export const useGetCyberAssetDetailGeneralInfo = (params: {
	id?: string;
}) => {
	const getCyberAssetsGeneralInfoQuery = useGetAssetGeneralInfo(params.id || "", {
		query: {
			enabled: !!params.id,
		},
	});

	const assetIdentificationCard: Omit<CyberAssetDetailGeneralInfoCardProps, "isLoading"> = {
		title: "Asset Identification",
		icon: <IconDevices2 color={"blue"} size={24} />,
		items: [
			{
				label: "OS Type:",
				value: getCyberAssetsGeneralInfoQuery.data?.data.os_name
					? getCyberAssetOsTypeBadge({
							type: getCyberAssetsGeneralInfoQuery.data?.data.os_name as CyberAssetOsTypeEnum,
							wrapperProps: {
								fz: "xs",
							},
						})
					: "",
			},
			{
				label: "OS Family:",
				value: (
					<Flex gap={"xs"}>
						{getCyberAssetsGeneralInfoQuery.data?.data.classification
							? getCyberAssetClassificationIcon({
									type: getCyberAssetsGeneralInfoQuery.data?.data
										.classification as CyberAssetClassificationEnum,
								})
							: ""}
						<Text fz={"xs"}>{getCyberAssetsGeneralInfoQuery.data?.data.os_family}</Text>
					</Flex>
				),
			},
			{
				label: "OS Version:",
				value: <Text fz={"xs"}>{getCyberAssetsGeneralInfoQuery.data?.data.os_family || ""}</Text>,
			},
			{
				label: "Discovery Type:",
				value: getCyberAssetsGeneralInfoQuery.data?.data.discovery_type
					? getCyberAssetDiscoveryTypeBadge({
							type: getCyberAssetsGeneralInfoQuery.data?.data.discovery_type as CyberAssetDiscoveryTypeEnum,
							size: 16,
						})
					: "",
			},
		],
	};

	const networkInformationCard: Omit<CyberAssetDetailGeneralInfoCardProps, "isLoading"> = {
		title: "Network Information",
		icon: <IconNetwork color={"blue"} size={24} />,
		items: [
			{
				label: "IP Address:",
				value:
					getCyberAssetsGeneralInfoQuery.data?.data.network_information?.ip_address &&
					getCyberAssetsGeneralInfoQuery.data?.data.network_information?.ip_address.length > 1 ? (
						<Tooltip
							label={
								<Flex direction={"column"}>
									{getCyberAssetsGeneralInfoQuery.data?.data.network_information.ip_address.map((item) => (
										<Text key={item} fz={"xs"}>
											{item}
										</Text>
									))}
								</Flex>
							}
						>
							<Text fz={"xs"}>
								{getCyberAssetsGeneralInfoQuery.data?.data.network_information.ip_address}
							</Text>
						</Tooltip>
					) : (
						<Text fz={"xs"}>
							{getCyberAssetsGeneralInfoQuery.data?.data.network_information.ip_address || ""}
						</Text>
					),
			},
			{
				label: "MAC Address:",
				value:
					getCyberAssetsGeneralInfoQuery.data?.data.network_information?.mac_address &&
					getCyberAssetsGeneralInfoQuery.data?.data.network_information?.mac_address.length > 1 ? (
						<Tooltip
							label={
								<Flex direction={"column"}>
									{getCyberAssetsGeneralInfoQuery.data?.data.network_information.mac_address.map((item) => (
										<Text key={item} fz={"xs"}>
											{item}
										</Text>
									))}
								</Flex>
							}
						>
							<Text fz={"xs"}>
								{getCyberAssetsGeneralInfoQuery.data?.data.network_information.mac_address}
							</Text>
						</Tooltip>
					) : (
						<Text fz={"xs"}>
							{getCyberAssetsGeneralInfoQuery.data?.data.network_information.mac_address || ""}
						</Text>
					),
			},
			{
				label: "Gateway IP:",
				value: <Text fz={"xs"}>{getCyberAssetsGeneralInfoQuery.data?.data.gateway_name || ""}</Text>,
			},
			{
				label: "VLAN:",
				value: <Text fz={"xs"}>{getCyberAssetsGeneralInfoQuery.data?.data.vlan_id || ""}</Text>,
			},
		],
	};

	const ownershipAndUsageCard: Omit<CyberAssetDetailGeneralInfoCardProps, "isLoading"> = {
		title: "Ownership & Usage",
		icon: <IconUserCircle color={"blue"} size={24} />,
		items: [
			{
				label: "Last Logon User:",
				value: (
					<Text fz={"xs"}>
						{getCyberAssetsGeneralInfoQuery.data?.data.ownership_information.owner_name || ""}
					</Text>
				),
			},
			{
				label: "Owner:",
				value: (
					<Text fz={"xs"}>{getCyberAssetsGeneralInfoQuery.data?.data.ownership_information.owner || ""}</Text>
				),
			},
			{
				label: "User Group:",
				value: <Text fz={"xs"}>Blank</Text>,
			},
		],
	};

	const locationCard: Omit<CyberAssetDetailGeneralInfoCardProps, "isLoading"> = {
		title: "Location",
		icon: <IconMapPin color={"blue"} size={24} />,
		items: [
			{
				label: "Location:",
				value: (
					<Text fz={"xs"}>
						{getCyberAssetsGeneralInfoQuery.data?.data.location_information.location || ""}
					</Text>
				),
			},
			{
				label: "Latitude:",
				value: (
					<Text fz={"xs"}>
						{getCyberAssetsGeneralInfoQuery.data?.data.location_information.latitude || ""}
					</Text>
				),
			},
			{
				label: "Longitude:",
				value: (
					<Text fz={"xs"}>
						{getCyberAssetsGeneralInfoQuery.data?.data.location_information.longitude || ""}
					</Text>
				),
			},
		],
	};

	const statusAndActivityCard: Omit<CyberAssetDetailGeneralInfoCardProps, "isLoading"> = {
		title: "Status & Activity",
		icon: <IconAlarm color={"blue"} size={24} />,
		items: [
			{
				label: "Last Reboot Time:",
				value: (
					<Text fz={"xs"}>
						{getCyberAssetsGeneralInfoQuery.data?.data.status_and_activity.last_reboot_time || ""}
					</Text>
				),
			},
			{
				label: "Last Scan ID:",
				value: (
					<Text fz={"xs"}>
						{getCyberAssetsGeneralInfoQuery.data?.data.status_and_activity.last_scan_id || ""}
					</Text>
				),
			},
			{
				label: "Last Seen:",
				value: (
					<Text fz={"xs"}>
						{getCyberAssetsGeneralInfoQuery.data?.data.status_and_activity.last_seen || ""}
					</Text>
				),
			},
			{
				label: "Current State:",
				value: getCyberAssetsGeneralInfoQuery.data?.data.status_and_activity.current_state
					? getCyberAssetStateBadge({
							type: getCyberAssetsGeneralInfoQuery.data?.data.status_and_activity
								.current_state as CyberAssetStateEnum,
						})
					: "",
			},
			{
				label: "Current Status:",
				value: getCyberAssetStatusBadge({
					type:
						(getCyberAssetsGeneralInfoQuery.data?.data.status_and_activity
							.current_status as CyberAssetStatusEnum) || "no policy",
				}),
			},
		],
	};

	const generalInfo: CyberAssetDetailGeneralInfoProps = {
		items: [
			assetIdentificationCard,
			networkInformationCard,
			ownershipAndUsageCard,
			locationCard,
			statusAndActivityCard,
		],
		indicatorColor: "green",
		onEdit: () => {
			console.log("edit");
		},
		onCheckConnection: () => {
			console.log("check");
		},
		upTimeTitle: getCyberAssetsGeneralInfoQuery.data?.data.asset_identification.uptime_since || "",
		icon: getCyberAssetClassificationIcon({
			type: getCyberAssetsGeneralInfoQuery.data?.data.classification as CyberAssetClassificationEnum,
			size: 60,
		}),
		subTitle: getCyberAssetsGeneralInfoQuery.data?.data.asset_identification.os_family || "",
		title: getCyberAssetsGeneralInfoQuery.data?.data.asset_identification.os_version || "",
	};

	return {
		generalInfo,
		isLoading: getCyberAssetsGeneralInfoQuery.isFetching,
		osType: getCyberAssetsGeneralInfoQuery.data?.data.asset_identification.os_type as CyberAssetOsTypeEnum,
	};
};

export function useCyberAssetDynamicStores(types: CyberAssetDetailInventoryType[]) {
	const storesRef = useRef<ICAdvancedFilterDynamicStoreType[]>([]); // name => store

	useEffect(() => {
		if (types.length) {
			types.forEach((type) => {
				const findStore = storesRef.current.find((item) => item.name === type.type);
				if (!findStore) {
					const newStore = createDynamicICAdvancedStore();

					const page = () => (
						<CyberAssetDetailInventoryDynamicGrid
							store={newStore}
							type={type.type}
							items={type.items || []}
						/>
					);
					storesRef.current.push({
						name: type.type,
						store: newStore,
						types,
						mainPage: page(),
					});
				}
			});
		}
	}, [types]);

	return { storesRef };
}
function useGetAssetGeneralInfo(arg0: string, arg1: { query: { enabled: boolean } }) {
	throw new Error("Function not implemented.");
}
