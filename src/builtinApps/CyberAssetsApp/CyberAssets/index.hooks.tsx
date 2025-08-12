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
	CyberAssetDetailOverviewActivityTimeline,
	CyberAssetDetailOverviewApplicationSecurityStatus,
	CyberAssetDetailOverviewAvailabilityAndActivityTimelineType,
	CyberAssetDetailOverviewAvailabilityTimeline,
	CyberAssetDetailOverviewNotification,
	CyberAssetDetailOverviewNotificationType,
	CyberAssetDetailOverviewProps,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import {
	useGetAssetActivity,
	useGetAssetAvailability,
	useGetAssetBaseOverview,
	useGetAssetGeneralInfo,
	useGetAssetLatestChanges,
	useGetAssetLatestSoftwares,
	useGetAssetNotifications,
	useGetAssetTopServices,
	useGetAssetVulnerabilityDetails,
} from "@/http/generated/cyber-asset-management-cyber-assets";
import type {
	CyberAssetNotificationsTypes,
	EachCyberAssetAvailabilityStatus,
	VulnerabilityStatusTypes,
} from "@/http/generated/models";
import { createDynamicICAdvancedStore } from "@/shared/components/infraComponents/ICAdvancedFilter/index.store";
import type { ICAdvancedFilterDynamicStoreType } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Badge, Flex, Text, Tooltip } from "@mantine/core";
import {
	IconAlarm,
	IconDevices2,
	IconLink,
	IconMapPin,
	IconNetwork,
	IconUserCircle,
} from "@tabler/icons-react";
import { maxBy, sum } from "lodash";
import { useEffect, useRef } from "react";
import type {
	CyberAssetClassificationEnum,
	CyberAssetCriticalityEnum,
	CyberAssetDiscoveryTypeEnum,
	CyberAssetOsTypeEnum,
	CyberAssetStateEnum,
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
				value: getCyberAssetsGeneralInfoQuery.data?.data.asset_identification.os_type
					? getCyberAssetOsTypeBadge({
							type: getCyberAssetsGeneralInfoQuery.data?.data.asset_identification
								.os_type as CyberAssetOsTypeEnum,
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
									isAssociated: false,
								})
							: ""}
						<Text fz={"xs"}>{getCyberAssetsGeneralInfoQuery.data?.data.asset_identification.os_family}</Text>
					</Flex>
				),
			},
			{
				label: "OS Version:",
				value: getCyberAssetsGeneralInfoQuery.data?.data.asset_identification.os_type
					? getCyberAssetOsTypeBadge({
							type: getCyberAssetsGeneralInfoQuery.data?.data.asset_identification
								.os_type as CyberAssetOsTypeEnum,
							wrapperProps: {
								fz: "xs",
							},
							customType: getCyberAssetsGeneralInfoQuery.data?.data.asset_identification.os_version || "",
						})
					: "",
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
						<Flex gap={"xs"}>
							<Text fz={"xs"}>
								{getCyberAssetsGeneralInfoQuery.data?.data.network_information.ip_address[0]}
							</Text>
							<Tooltip
								label={
									<Flex direction={"column"}>
										{getCyberAssetsGeneralInfoQuery.data?.data.network_information.ip_address
											.slice(1)
											.map((item) => (
												<Text key={`ip-address-${item}`} fz={"xs"}>
													{item}
												</Text>
											))}
									</Flex>
								}
							>
								<Badge size={"xs"} leftSection={<IconLink size={12} />} variant={"light"}>
									{getCyberAssetsGeneralInfoQuery.data?.data.network_information?.ip_address.length}
								</Badge>
							</Tooltip>
						</Flex>
					) : (
						<Text fz={"xs"}>
							{getCyberAssetsGeneralInfoQuery.data?.data.network_information.ip_address?.[0] || ""}
						</Text>
					),
			},
			{
				label: "MAC Address:",
				value:
					getCyberAssetsGeneralInfoQuery.data?.data.network_information?.mac_address &&
					getCyberAssetsGeneralInfoQuery.data?.data.network_information?.mac_address.length > 1 ? (
						<Flex gap={"xs"}>
							<Text fz={"xs"}>
								{getCyberAssetsGeneralInfoQuery.data?.data.network_information.mac_address[0]}
							</Text>
							<Tooltip
								label={
									<Flex direction={"column"}>
										{getCyberAssetsGeneralInfoQuery.data?.data.network_information.mac_address
											.slice(1)
											.map((item) => (
												<Text key={`mac-address-${item}`} fz={"xs"}>
													{item}
												</Text>
											))}
									</Flex>
								}
							>
								<Badge size={"xs"} leftSection={<IconLink size={12} />} variant={"light"}>
									{getCyberAssetsGeneralInfoQuery.data?.data.network_information?.mac_address.length}
								</Badge>
							</Tooltip>
						</Flex>
					) : (
						<Text fz={"xs"}>
							{getCyberAssetsGeneralInfoQuery.data?.data.network_information.mac_address?.[0] || ""}
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
			isAssociated: false,
		}),
		subTitle: getCyberAssetsGeneralInfoQuery.data?.data.asset_identification.os_family || "",
		title: getCyberAssetsGeneralInfoQuery.data?.data.asset_identification.hostname || "",
	};

	return {
		assetId: getCyberAssetsGeneralInfoQuery.data?.data.id,
		generalInfo,
		isLoading: getCyberAssetsGeneralInfoQuery.isFetching,
		osType: getCyberAssetsGeneralInfoQuery.data?.data.asset_identification.os_type as CyberAssetOsTypeEnum,
	};
};

export function useCyberAssetDynamicStores(types: CyberAssetDetailInventoryType[], assetId?: string) {
	const storesRef = useRef<ICAdvancedFilterDynamicStoreType[]>([]); // name => store

	useEffect(() => {
		if (types.length && assetId) {
			types.forEach((type) => {
				const findStore = storesRef.current.find((item) => item.name === type.type.value);
				if (!findStore) {
					const newStore = createDynamicICAdvancedStore();

					const page = () => (
						<CyberAssetDetailInventoryDynamicGrid
							defaultItem={type.defaultItem}
							store={newStore}
							type={type.type.value}
							items={type.items}
							id={assetId}
						/>
					);
					storesRef.current.push({
						name: type.type.value,
						store: newStore,
						types,
						mainPage: page(),
					});
				}
			});
		}
	}, [types, assetId]);

	return { storesRef };
}

export const useCyberAssetDetailOverview = (id?: string, appName?: string) => {
	const getAssetOverviewBaseDataQuery = useGetAssetBaseOverview(id || "", {
		query: {
			enabled: !!id,
			select: (response) => {
				const data: Pick<
					CyberAssetDetailOverviewProps,
					"disk" | "ram" | "cpu" | "network" | "configurationItemsCount" | "osName"
				> = {
					configurationItemsCount: response.data.configuration_items,
					cpu: {
						cores: response.data.cpu?.cores || 0,
						processors: response.data.cpu?.processor || 0,
					},
					disk: response.data.disk?.total_capacity || 0,
					network: {
						ip: response.data.network?.primary_ip || "",
						openPorts:
							response.data.network?.open_ports?.map((item) => ({
								name: item,
							})) || [],
						type: "STATIC",
					},
					osName: response.data.operating_system || "",
					ram: response.data.ram?.total_capacity || 0,
				};

				return {
					data,
				};
			},
		},
	});

	const getAssetOverviewLatestChangesDataQuery = useGetAssetLatestChanges(id || "", {
		query: {
			enabled: !!id,
			select: (response) => {
				const data: Pick<CyberAssetDetailOverviewProps, "changes"> = {
					changes: {
						summary: {
							modify: response.data.modify,
							add: response.data.add,
							delete: response.data.delete,
						},
						total: response.data.total,
					},
				};

				return {
					data,
				};
			},
		},
	});

	const getAssetOverviewTopServicesDataQuery = useGetAssetTopServices(id || "", {
		query: {
			enabled: !!id,
			select: (response) => {
				const data: Pick<CyberAssetDetailOverviewProps, "topServices" | "serviceStartTypes"> = {
					topServices: response.data.top_services.map((item) => ({
						name: item.display_name,
						status: item.state === "Running" ? "RUNNING" : "STOPPED",
					})),
					serviceStartTypes: {
						summary: {
							Unknown: response.data.start_mode?.Unknown,
							Manual: response.data.start_mode?.Manual,
							Auto: response.data.start_mode?.Auto,
							Disabled: response.data.start_mode?.Disabled,
						},
						type: maxBy(Object.entries(response.data.start_mode), (item) => item[1])?.[0]?.toString() || "",
						total: maxBy(Object.entries(response.data.start_mode), (item) => item[1])?.[1] || 0,
					},
				};
				return {
					data,
				};
			},
		},
	});

	const getAssetOverviewApplicationsDataQuery = useGetAssetLatestSoftwares(id || "", {
		query: {
			enabled: !!id,
			select: (response) => {
				const data: Pick<CyberAssetDetailOverviewProps, "applications"> = {
					applications: {
						items: response.data.latest_softwares.map((item) => ({
							name: item.name,
							installDate: item.install_date,
						})),
						total: response.data.total,
					},
				};
				return {
					data,
				};
			},
		},
	});

	const getAssetOverviewSecurityDataQuery = useGetAssetVulnerabilityDetails(id || "", {
		query: {
			enabled: !!id,
			select: (response) => {
				const statusMap: Record<VulnerabilityStatusTypes, CyberAssetDetailOverviewApplicationSecurityStatus> =
					{
						available: "ACTIVE",
						configuration_failed: "FAILED",
						expired: "MC EXPIRED",
						unavailable: "DE ACTIVE",
						upgrade: "UPGRADE",
					};

				const data: Pick<CyberAssetDetailOverviewProps, "security"> = {
					security: {
						status: statusMap[response.data.status],
						appName: appName || "",
						onUpgradeLicense: () => {
							console.log("upgrade");
						},
						onMCExpired: () => {
							console.log("onMCExpired");
						},
						onActivateVulnerabilitiesAssessment: () => {
							console.log("onActivateVulnerabilitiesAssessment");
						},
						onFailed: () => {
							console.log("onFailed");
						},
						summary: response.data.total_vulnerability as Record<Partial<CyberAssetCriticalityEnum>, number>,
						criticality: response.data.criticality as CyberAssetCriticalityEnum,
						riskScore: response.data.cyber_risk_score || null,
						totalVulnerabilities: response.data.total_vulnerability
							? sum(Object.values(response.data.total_vulnerability))
							: 0,
						topVulnerabilities:
							response.data.top_vulnerability?.map((item) => ({
								name: item.vulnerability,
								criticality: item.criticality as CyberAssetCriticalityEnum,
							})) || [],
					},
				};
				return {
					data,
				};
			},
		},
	});

	const getAssetOverviewNotificationsDataQuery = useGetAssetNotifications(id || "", {
		query: {
			enabled: !!id,
			select: (response) => {
				const data: Pick<CyberAssetDetailOverviewProps, "notifications"> = {
					notifications: response.data.map((item) => {
						const typeMap: Record<CyberAssetNotificationsTypes, CyberAssetDetailOverviewNotificationType> = {
							config: "PATCH",
							error: "FAILED",
							info: "AVAILABILITY",
							warning: "CONFLICT",
						};
						const notification: CyberAssetDetailOverviewNotification = {
							description: item.description || "",
							date: item.created_time || "",
							title: item.summary,
							type: typeMap[item.type],
							sourceBy: item.creator || "",
						};

						return notification;
					}),
				};
				return {
					data,
				};
			},
		},
	});

	const getAssetOverviewActivityDataQuery = useGetAssetActivity(id || "", {
		query: {
			enabled: !!id,
		},
	});

	const getAssetOverviewAvailabilityDataQuery = useGetAssetAvailability(id || "", {
		query: {
			enabled: !!id,
		},
	});

	const availabilityAndActivity: Pick<CyberAssetDetailOverviewProps, "availabilityAndActivity"> = {
		availabilityAndActivity: {
			activity:
				getAssetOverviewActivityDataQuery.data?.data.map((item) => {
					const activity: CyberAssetDetailOverviewActivityTimeline = {
						title: item.summary,
						description: item.description || "",
						time: "",
					};

					return activity;
				}) || [],
			availability:
				getAssetOverviewAvailabilityDataQuery.data?.data.map((item) => {
					const typeMap: Record<
						EachCyberAssetAvailabilityStatus,
						CyberAssetDetailOverviewAvailabilityAndActivityTimelineType
					> = {
						offline: "Offline",
						online: "Online",
						unmanaged: "Unmanaged",
					};
					const timeline: CyberAssetDetailOverviewAvailabilityTimeline = {
						type: typeMap[item.status],
						description: item.description || "",
					};

					return timeline;
				}) || [],
		},
	};

	return {
		availabilityAndActivity,
		getAssetOverviewNotificationsDataQuery,
		getAssetOverviewSecurityDataQuery,
		getAssetOverviewApplicationsDataQuery,
		getAssetOverviewTopServicesDataQuery,
		getAssetOverviewLatestChangesDataQuery,
		getAssetOverviewBaseDataQuery,
		getAssetOverviewAvailabilityDataQuery,
		getAssetOverviewActivityDataQuery,
	};
};
