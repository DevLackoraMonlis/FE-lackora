import CyberAssetDetailOverviewApplications from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewApplications";
import CyberAssetDetailOverviewAvailabilityAndActivity from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewAvailabilityAndActivity";
import CyberAssetDetailOverviewCPU from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewCPU";
import CyberAssetDetailOverviewCard from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewCard";
import CyberAssetDetailOverviewChanges from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewChanges";
import CyberAssetDetailOverviewConfigurationItems from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewConfigurationItems";
import CyberAssetDetailOverviewDisk from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewDisk";
import CyberAssetDetailOverviewNetwork from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewNetwork";
import CyberAssetDetailOverviewNotifications from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewNotifications";
import CyberAssetDetailOverviewOperatingSystem from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewOperatingSystem";
import CyberAssetDetailOverviewRAM from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewRAM";
import CyberAssetDetailOverviewSecurity from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewSecurity";
import CyberAssetDetailOverviewTopServices from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewTopServices";
import {
	CyberAssetCriticalityEnum,
	CyberAssetOsTypeEnum,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.enum";
import type {
	CyberAssetDetailOverviewApplicationSecurityStatus,
	CyberAssetDetailOverviewProps,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import {
	useGetAssetBaseOverview,
	useGetAssetLatestChanges,
	useGetAssetLatestSoftwares,
	useGetAssetTopServices,
	useGetAssetVulnerabilityDetails,
} from "@/http/generated/cyber-asset-management-cyber-assets";
import { Box, Button, Grid, ScrollArea, Tooltip } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconArrowNarrowRight, IconInfoCircle } from "@tabler/icons-react";

const ArrowButton = (props: { onClick?: VoidFunction }) => {
	return (
		<Button onClick={props.onClick} p={0} size={"xs"} variant={"transparent"}>
			<IconArrowNarrowRight size={20} />
		</Button>
	);
};

export default function CyberAssetDetailOverview(props: {
	id?: string;
	appName?: string;
	osType: CyberAssetOsTypeEnum;
}) {
	const getAssetOverviewBaseDataQuery = useGetAssetBaseOverview(props.id || "", {
		query: {
			enabled: !!props.id,
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
								type: "HTTPS",
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

	const getAssetOverviewLatestChangesDataQuery = useGetAssetLatestChanges(props.id || "", {
		query: {
			enabled: !!props.id,
			select: (response) => {
				const data: Pick<CyberAssetDetailOverviewProps, "changes"> = {
					changes: {
						summary: {
							MODIFY: response.data.modify,
							ADD: response.data.add,
							DELETE: response.data.delete,
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

	const getAssetOverviewTopServicesDataQuery = useGetAssetTopServices(props.id || "", {
		query: {
			enabled: !!props.id,
			select: (response) => {
				const data: Pick<CyberAssetDetailOverviewProps, "topServices" | "serviceStartTypes"> = {
					topServices: response.data.top_services.map((item) => ({
						name: item.display_name,
						status: item.state === "Running" ? "RUNNING" : "STOPPED",
					})),
					serviceStartTypes: {
						summary: {
							Unknown: response.data.start_mode?.Unknown,
							Total: response.data.start_mode?.Total,
							Manual: response.data.start_mode?.Manual,
							Auto: response.data.start_mode?.Auto,
							Disabled: response.data.start_mode?.Disabled,
						},
						type: "Auto",
						total: response.data.start_mode?.Total,
					},
				};
				return {
					data,
				};
			},
		},
	});

	const getAssetOverviewApplicationsDataQuery = useGetAssetLatestSoftwares(props.id || "", {
		query: {
			enabled: !!props.id,
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

	const getAssetOverviewSecurityDataQuery = useGetAssetVulnerabilityDetails(props.id || "", {
		query: {
			enabled: !!props.id,
			select: (response) => {
				const data: Pick<CyberAssetDetailOverviewProps, "security"> = {
					security: {
						status: response.data.status as CyberAssetDetailOverviewApplicationSecurityStatus,
						appName: props.appName || "",
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
						summary: response.data.metadata as Record<CyberAssetCriticalityEnum, number>,
						criticality: response.data.criticality as CyberAssetCriticalityEnum,
						riskScore: response.data.cyber_risk_score || null,
						totalVulnerabilities: 0,
						topVulnerabilities:
							response.data.top_vulnerability?.map((item) => ({
								name: Object.entries(item)[0][0] as string,
								criticality: Object.entries(item)[0][1] as CyberAssetCriticalityEnum,
							})) || [],
					},
				};
				return {
					data,
				};
			},
		},
	});

	console.log(getAssetOverviewSecurityDataQuery.data);

	const data: CyberAssetDetailOverviewProps = {
		notifications: [
			{
				type: "AVAILABILITY",
				date: "Jul 25, 14:19",
				description: "System unreachable from 10.0.1.5",
				source: "system",
				title: "Asset went offline",
			},
			{
				type: "CONFLICT",
				date: "Jul 25, 14:20",
				description: "System unreachable from 10.0.1.5",
				source: "system",
				title: "Asset went offline",
			},
			{
				type: "FAILED",
				date: "Jul 25, 14:21",
				description: "System unreachable from 10.0.1.5",
				source: "system",
				title: "Multiple failed login attempts",
			},
			{
				type: "PATCH",
				date: "Jul 25, 14:22",
				description: "System unreachable from 10.0.1.5",
				source: "system",
				title: "Asset went offline",
			},
			{
				type: "CONFLICT",
				date: "Jul 25, 14:23",
				description: "System unreachable from 10.0.1.5",
				source: "system",
				title: "Asset went offline",
			},
			{
				type: "CONFLICT",
				date: "Jul 25, 14:24",
				description: "System unreachable from 10.0.1.5",
				source: "system",
				title: "Asset went offline",
			},
			{
				type: "AVAILABILITY",
				date: "Jul 25, 14:25",
				description: "System unreachable from 10.0.1.5",
				source: "system",
				title: "Asset went offline",
			},
			{
				type: "AVAILABILITY",
				date: "Jul 25, 14:26",
				description: "System unreachable from 10.0.1.5",
				source: "system",
				title: "Asset went offline",
			},
		],
		serviceStartTypes: {
			summary: {
				Auto: 45,
				Disabled: 35,
				Manual: 20,
				Total: 100,
				Unknown: 100,
			},
			total: 45,
			type: "Auto",
		},
		configurationItemsCount: 365,
		applications: {
			total: 70,
			items: [
				{
					installDate: "2025-07-20",
					name: "Microsoft Visual C++ Redistributable",
				},
				{
					installDate: "2025-07-20",
					name: "Microsoft Visual C++ Redistributable2",
				},
				{
					installDate: "2025-07-20",
					name: "Microsoft Visual C++ Redistributable3",
				},
				{
					installDate: "2025-07-20",
					name: "Microsoft Visual C++ Redistributable4",
				},
				{
					installDate: "2025-07-20",
					name: "Microsoft Visual C++ Redistributable5",
				},
			],
		},
		changes: {
			total: 52,
			summary: {
				MODIFY: 5,
				DELETE: 12,
				ADD: 35,
			},
		},
		cpu: {
			cores: 16,
			processors: 32,
		},
		disk: 100000,
		network: {
			ip: "192.168.0.1",
			openPorts: [
				{
					name: "80",
					type: "HTTPS",
				},
				{
					name: "8080",
					type: "HTTP",
				},
			],
			type: "STATIC",
		},
		osName: "Windows Server 2019",
		osType: CyberAssetOsTypeEnum.WINDOWS,
		ram: 640000000,
		topServices: [
			{
				name: "service 1",
				status: "RUNNING",
			},
			{
				name: "service 2",
				status: "STOPPED",
			},
			{
				name: "service 4",
				status: "STOPPED",
			},
			{
				name: "service 5",
				status: "STOPPED",
			},
			{
				name: "service 6",
				status: "STOPPED",
			},
			{
				name: "service 7",
				status: "STOPPED",
			},
			{
				name: "service 8",
				status: "STOPPED",
			},
			{
				name: "service 9",
				status: "STOPPED",
			},
			{
				name: "service 10",
				status: "STOPPED",
			},
		],
		availabilityAndActivity: {
			activity: [
				{
					title: "Agent Updated",
					time: "Jul 25, 13:10",
					description: "v1.4.2 -> v1.5.0 by System",
				},
				{
					title: "Agent Updated2",
					time: "Jul 25, 13:10",
					description: "v1.4.2 -> v1.5.0 by System",
				},
			],
			timeline: [
				{
					description: "Jul 25, 14:30 (for 3h 15m)",
					type: "Online",
				},
				{
					description: "Jul 25, 14:31 (for 3h 15m)",
					type: "Offline",
				},
				{
					description: "Jul 25, 14:32 (for 3h 15m)",
					type: "Unmanaged",
				},
				{
					description: "Jul 25, 14:33 (for 3h 15m)",
					type: "Offline",
				},
				{
					description: "Jul 25, 14:35 (for 3h 15m)",
					type: "Online",
				},
				{
					description: "Jul 25, 14:25 (for 3h 15m)",
					type: "Offline",
				},
				{
					description: "Jul 25, 14:26 (for 3h 15m)",
					type: "Offline",
				},
				{
					description: "Jul 25, 14:50 (for 3h 15m)",
					type: "Offline",
				},
				{
					description: "Jul 25, 14:51 (for 3h 15m)",
					type: "Offline",
				},
			],
		},
		security: {
			appName: props.appName || "",
			criticality: CyberAssetCriticalityEnum.VERY_HIGH,
			onActivateVulnerabilitiesAssessment: () => {
				console.log("onActivateVulnerabilitiesAssessment");
			},
			onMCExpired: () => {
				console.log("onActivateVulnerabilitiesAssessment");
			},
			onUpgradeLicense: () => {
				console.log("onActivateVulnerabilitiesAssessment");
			},
			onFailed: () => {
				console.log("onActivateVulnerabilitiesAssessment");
			},
			riskScore: 95,
			status: "UPGRADE",
			summary: {
				[CyberAssetCriticalityEnum.CRITICAL]: 5,
				[CyberAssetCriticalityEnum.HIGH]: 4,
				[CyberAssetCriticalityEnum.LOW]: 10,
				[CyberAssetCriticalityEnum.MEDIUM]: 4,
				[CyberAssetCriticalityEnum.VERY_HIGH]: 3,
			},
			topVulnerabilities: [
				{
					name: "CVE-2020-1472(ZeroLogon)1",
					criticality: CyberAssetCriticalityEnum.MEDIUM,
				},
				{
					name: "CVE-2020-1472(ZeroLogon)2",
					criticality: CyberAssetCriticalityEnum.CRITICAL,
				},
				{
					name: "CVE-2020-1472(ZeroLogon)3",
					criticality: CyberAssetCriticalityEnum.VERY_HIGH,
				},
				{
					name: "CVE-2020-1472(ZeroLogon)4",
					criticality: CyberAssetCriticalityEnum.LOW,
				},
			],
			totalVulnerabilities: 12,
		},
	};

	const { height } = useViewportSize();

	const isLoading = false;

	return (
		<Box p={"sm"}>
			<Grid gutter={"xs"}>
				<Grid.Col span={3}>
					<CyberAssetDetailOverviewCard
						mih={105}
						isLoading={isLoading}
						title={"Configuration Items"}
						titleRight={
							<Tooltip label={"Description"}>
								<IconInfoCircle size={20} />
							</Tooltip>
						}
					>
						<CyberAssetDetailOverviewConfigurationItems
							configurationItemsCount={data.configurationItemsCount}
						/>
					</CyberAssetDetailOverviewCard>
				</Grid.Col>
				<Grid.Col span={3}>
					<CyberAssetDetailOverviewCard
						isLoading={getAssetOverviewBaseDataQuery.isFetching}
						mih={105}
						title={"Operating System"}
					>
						<CyberAssetDetailOverviewOperatingSystem
							osName={getAssetOverviewBaseDataQuery.data?.data.osName}
							osType={props.osType}
						/>
					</CyberAssetDetailOverviewCard>
				</Grid.Col>
				<Grid.Col span={3}>
					<CyberAssetDetailOverviewCard
						isLoading={getAssetOverviewBaseDataQuery.isFetching}
						mih={105}
						title={"CPU"}
					>
						<CyberAssetDetailOverviewCPU cpu={getAssetOverviewBaseDataQuery.data?.data.cpu} />
					</CyberAssetDetailOverviewCard>
				</Grid.Col>
				<Grid.Col span={3}>
					<Grid gutter={"xs"}>
						<Grid.Col span={6}>
							<CyberAssetDetailOverviewCard
								isLoading={getAssetOverviewBaseDataQuery.isFetching}
								mih={105}
								title={"RAM"}
							>
								<CyberAssetDetailOverviewRAM ram={getAssetOverviewBaseDataQuery.data?.data.ram} />
							</CyberAssetDetailOverviewCard>
						</Grid.Col>
						<Grid.Col span={6}>
							<CyberAssetDetailOverviewCard
								isLoading={getAssetOverviewBaseDataQuery.isFetching}
								mih={105}
								title={"Disk"}
							>
								<CyberAssetDetailOverviewDisk disk={getAssetOverviewBaseDataQuery.data?.data.disk} />
							</CyberAssetDetailOverviewCard>
						</Grid.Col>
					</Grid>
				</Grid.Col>
			</Grid>

			<Grid gutter={"xs"}>
				<Grid.Col span={6}>
					<CyberAssetDetailOverviewCard
						isLoading={isLoading}
						mih={120}
						title={"Network"}
						rightSection={<ArrowButton />}
					>
						<CyberAssetDetailOverviewNetwork network={getAssetOverviewBaseDataQuery.data?.data.network} />
					</CyberAssetDetailOverviewCard>
				</Grid.Col>

				<Grid.Col span={6}>
					<CyberAssetDetailOverviewCard
						isLoading={getAssetOverviewLatestChangesDataQuery.isFetching}
						mih={120}
						title={"Changes"}
						rightSection={<ArrowButton />}
					>
						<CyberAssetDetailOverviewChanges
							changes={getAssetOverviewLatestChangesDataQuery.data?.data.changes}
						/>
					</CyberAssetDetailOverviewCard>
				</Grid.Col>
			</Grid>
			<Grid gutter={"xs"}>
				<Grid.Col span={6}>
					<CyberAssetDetailOverviewCard
						isLoading={getAssetOverviewTopServicesDataQuery.isFetching}
						mih={300}
						title={"Top Services"}
						rightSection={<ArrowButton />}
					>
						<CyberAssetDetailOverviewTopServices
							serviceStartTypes={getAssetOverviewTopServicesDataQuery.data?.data.serviceStartTypes}
							topServices={getAssetOverviewTopServicesDataQuery.data?.data.topServices}
						/>
					</CyberAssetDetailOverviewCard>
				</Grid.Col>
				<Grid.Col span={6}>
					<CyberAssetDetailOverviewCard
						isLoading={getAssetOverviewApplicationsDataQuery.isFetching}
						mih={300}
						title={"Applications"}
						rightSection={<ArrowButton />}
					>
						<CyberAssetDetailOverviewApplications
							applications={getAssetOverviewApplicationsDataQuery.data?.data.applications}
						/>
					</CyberAssetDetailOverviewCard>
				</Grid.Col>
			</Grid>
			<ScrollArea h={height - 730} mt={"xs"} scrollbars={"y"} scrollbarSize={2}>
				<Grid>
					<Grid.Col span={4}>
						<CyberAssetDetailOverviewCard
							mih={590}
							isLoading={isLoading}
							title={"Security"}
							rightSection={<ArrowButton />}
						>
							<CyberAssetDetailOverviewSecurity security={data.security} />
						</CyberAssetDetailOverviewCard>
					</Grid.Col>
					<Grid.Col span={4}>
						<CyberAssetDetailOverviewCard
							mih={590}
							isLoading={isLoading}
							title={"Availability & Activity"}
							rightSection={<ArrowButton />}
						>
							<CyberAssetDetailOverviewAvailabilityAndActivity
								availabilityAndActivity={data.availabilityAndActivity}
							/>
						</CyberAssetDetailOverviewCard>
					</Grid.Col>
					<Grid.Col span={4}>
						<CyberAssetDetailOverviewCard mih={590} isLoading={isLoading} title={"Notifications"}>
							<CyberAssetDetailOverviewNotifications notifications={data.notifications} />
						</CyberAssetDetailOverviewCard>
					</Grid.Col>
				</Grid>
			</ScrollArea>
		</Box>
	);
}
