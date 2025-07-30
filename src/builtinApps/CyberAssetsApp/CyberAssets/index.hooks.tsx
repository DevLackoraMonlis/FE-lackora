import { CyberAssetClassification } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.enum";
import {
	getCyberAssetClassificationIcon,
	getCyberAssetDiscoveryTypeBadge,
	getCyberAssetOsTypeBadge,
	getCyberAssetStateBadge,
	getCyberAssetStatusBadge,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.helper";
import type {
	CuberAssetDetailGeneralInfoData,
	CyberAssetDetailGeneralInfoCardProps,
	CyberAssetDetailGeneralInfoProps,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { Flex, Text } from "@mantine/core";
import { IconAlarm, IconDevices2, IconMapPin, IconNetwork, IconUserCircle } from "@tabler/icons-react";

export const useGetCyberAssetDetailGeneralInfo = (params: { data: CuberAssetDetailGeneralInfoData }) => {
	const assetIdentificationCard: CyberAssetDetailGeneralInfoCardProps = {
		title: "Asset Identification",
		icon: <IconDevices2 color={"blue"} size={24} />,
		items: [
			{
				label: "OS Type:",
				value: getCyberAssetOsTypeBadge({
					type: params.data.osType,
					props: {
						fz: "xs",
					},
				}),
			},
			{
				label: "OS Family:",
				value: (
					<Flex gap={"xs"}>
						{getCyberAssetClassificationIcon({
							type: params.data.classification,
						})}
						<Text fz={"xs"}>{params.data.osFamily}</Text>
					</Flex>
				),
			},
			{
				label: "OS Version:",
				value: <Text fz={"xs"}>{params.data.osVersion}</Text>,
			},
			{
				label: "Discovery Type:",
				value: getCyberAssetDiscoveryTypeBadge({
					type: params.data.discoveryType,
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
				value: <Text fz={"xs"}>{params.data.ipAddress}</Text>,
			},
			{
				label: "MAC Address:",
				value: <Text fz={"xs"}>{params.data.macAddress}</Text>,
			},
			{
				label: "Gateway IP:",
				value: <Text fz={"xs"}>{params.data.gateway}</Text>,
			},
			{
				label: "VLAN:",
				value: <Text fz={"xs"}>{params.data.vLan}</Text>,
			},
		],
	};
	const ownershipAndUsageCard: CyberAssetDetailGeneralInfoCardProps = {
		title: "Ownership & Usage",
		icon: <IconUserCircle color={"blue"} size={24} />,
		items: [
			{
				label: "Last Logon User:",
				value: <Text fz={"xs"}>{params.data.lastLogonUser}</Text>,
			},
			{
				label: "Owner:",
				value: <Text fz={"xs"}>{params.data.owner}</Text>,
			},
			{
				label: "User Group:",
				value: <Text fz={"xs"}>{params.data.userGroup}</Text>,
			},
		],
	};

	const locationCard: CyberAssetDetailGeneralInfoCardProps = {
		title: "Location",
		icon: <IconMapPin color={"blue"} size={24} />,
		items: [
			{
				label: "Location:",
				value: <Text fz={"xs"}>{params.data.location}</Text>,
			},
			{
				label: "Latitude:",
				value: <Text fz={"xs"}>{params.data.latitude}</Text>,
			},
			{
				label: "Longitude:",
				value: <Text fz={"xs"}>{params.data.longitude}</Text>,
			},
		],
	};

	const statusAndActivityCard: CyberAssetDetailGeneralInfoCardProps = {
		title: "Status & Activity",
		icon: <IconAlarm color={"blue"} size={24} />,
		items: [
			{
				label: "Last Reboot Time:",
				value: <Text fz={"xs"}>{params.data.lastRebootTime}</Text>,
			},
			{
				label: "Last Scan ID:",
				value: <Text fz={"xs"}>{params.data.lastScanId}</Text>,
			},
			{
				label: "Last Seen:",
				value: <Text fz={"xs"}>{params.data.lastSeen}</Text>,
			},
			{
				label: "Current State:",
				value: getCyberAssetStateBadge({ type: params.data.currentState }),
			},
			{
				label: "Current Status:",
				value: getCyberAssetStatusBadge({ type: params.data.currentStatus }),
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
