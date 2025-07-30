import {
	CyberAssetClassification,
	CyberAssetDiscoveryType,
	CyberAssetOsType,
	CyberAssetState,
	CyberAssetStatus,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.enum";
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
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { Text } from "@mantine/core";
import { IconAlarm, IconDevices2, IconMapPin, IconNetwork, IconUserCircle } from "@tabler/icons-react";

export const useGetCyberAssetDetailGeneralInfo = () => {
	const assetIdentificationCard: CyberAssetDetailGeneralInfoCardProps = {
		title: "Asset Identification",
		icon: <IconDevices2 color={"blue"} size={24} />,
		items: [
			{
				label: "OS Type:",
				value: getCyberAssetOsTypeBadge({
					type: CyberAssetOsType.WINDOWS,
					props: {
						fz: "xs",
					},
				}),
			},
			{
				label: "OS Family:",
				value: getCyberAssetOsTypeBadge({
					type: CyberAssetOsType.WINDOWS,
					props: {
						fz: "xs",
					},
					customType: "Windows Server 2019 Standard",
				}),
			},
			{
				label: "OS Version:",
				value: <Text fz={"xs"}>10.0.17763</Text>,
			},
			{
				label: "Discovery Type:",
				value: getCyberAssetDiscoveryTypeBadge({
					type: CyberAssetDiscoveryType.DISCOVERED,
					size: 16,
				}),
			},
		],
	};

	const networkInformationCard: CyberAssetDetailGeneralInfoCardProps = {
		title: "Network Information",
		icon: <IconNetwork color={"blue"} size={24} />,
		items: [
			{
				label: "IP Address:",
				value: <Text fz={"xs"}>192.168.10.15</Text>,
			},
			{
				label: "MAC Address:",
				value: <Text fz={"xs"}>00-14-22-01-23-45</Text>,
			},
			{
				label: "Gateway IP:",
				value: <Text fz={"xs"}>192.168.10.1</Text>,
			},
			{
				label: "VLAN:",
				value: <Text fz={"xs"}>Production-VLAN (ID: 20)</Text>,
			},
		],
	};
	const ownershipAndUsageCard: CyberAssetDetailGeneralInfoCardProps = {
		title: "Ownership & Usage",
		icon: <IconUserCircle color={"blue"} size={24} />,
		items: [
			{
				label: "Last Logon User:",
				value: <Text fz={"xs"}>Mahya.sh</Text>,
			},
			{
				label: "Owner:",
				value: <Text fz={"xs"}>Saman.ha</Text>,
			},
			{
				label: "User Group:",
				value: <Text fz={"xs"}>Product</Text>,
			},
		],
	};

	const locationCard: CyberAssetDetailGeneralInfoCardProps = {
		title: "Location",
		icon: <IconMapPin color={"blue"} size={24} />,
		items: [
			{
				label: "Location:",
				value: <Text fz={"xs"}>Tehran Milad DC - Rack 3U</Text>,
			},
			{
				label: "Latitude:",
				value: <Text fz={"xs"}>35.5501° N</Text>,
			},
			{
				label: "Longitude:",
				value: <Text fz={"xs"}>51.388974</Text>,
			},
		],
	};

	const statusAndActivityCard: CyberAssetDetailGeneralInfoCardProps = {
		title: "Status & Activity",
		icon: <IconAlarm color={"blue"} size={24} />,
		items: [
			{
				label: "Last Reboot Time:",
				value: <Text fz={"xs"}>2025-03-12, 18:30</Text>,
			},
			{
				label: "Last Scan ID:",
				value: <Text fz={"xs"}>#4300</Text>,
			},
			{
				label: "Last Seen:",
				value: <Text fz={"xs"}>2025-06-06, 14:30</Text>,
			},
			{
				label: "Current State:",
				value: getCyberAssetStateBadge({ type: CyberAssetState.MANAGEABLE }),
			},
			{
				label: "Current Status:",
				value: getCyberAssetStatusBadge({ type: CyberAssetStatus.PROFILED }),
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
		upTimeTitle: "Uptime Since 10hrs, 32mins",
		icon: getCyberAssetClassificationIcon({ type: CyberAssetClassification.SERVER, size: 60 }),
		subTitle: "Windows Server2019 Standard",
		title: "WIN-SERVER-01",
	};

	return { generalInfo };
};
