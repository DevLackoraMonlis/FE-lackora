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
import CyberAssetDetailOverviewTopServices from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewTopServices";
import { CyberAssetCriticality, CyberAssetOsType } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.enum";
import type { CyberAssetDetailOverviewProps } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { Box, Button, Grid, Tooltip } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconArrowNarrowRight, IconInfoCircle } from "@tabler/icons-react";

const ArrowButton = (props: { onClick?: VoidFunction }) => {
	return (
		<Button onClick={props.onClick} p={0} size={"xs"} variant={"transparent"}>
			<IconArrowNarrowRight size={20} />
		</Button>
	);
};

export default function CyberAssetDetailOverview(_props: { id?: string }) {
	const { height } = useViewportSize();
	const data: CyberAssetDetailOverviewProps = {
		notifications: [
			{
				type: "AVAILABILITY",
				date: "Jul 25, 14:22",
				description: "System unreachable from 10.0.1.5",
				source: "system",
				title: "Asset went offline",
			},
			{
				type: "CONFLICT",
				date: "Jul 25, 14:22",
				description: "System unreachable from 10.0.1.5",
				source: "system",
				title: "Asset went offline",
			},
			{
				type: "FAILED",
				date: "Jul 25, 14:22",
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
				date: "Jul 25, 14:22",
				description: "System unreachable from 10.0.1.5",
				source: "system",
				title: "Asset went offline",
			},
			{
				type: "CONFLICT",
				date: "Jul 25, 14:22",
				description: "System unreachable from 10.0.1.5",
				source: "system",
				title: "Asset went offline",
			},
			{
				type: "AVAILABILITY",
				date: "Jul 25, 14:22",
				description: "System unreachable from 10.0.1.5",
				source: "system",
				title: "Asset went offline",
			},
		],
		serviceStartTypes: {
			summary: {
				Automatic: 45,
				Disabled: 35,
				Manual: 20,
			},
			total: 45,
			type: "Automatic",
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
		osType: CyberAssetOsType.WINDOWS,
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
			],
		},
		security: {
			criticality: CyberAssetCriticality.VERY_HIGH,
			onActivateVulnerabilitiesAssessment: () => {
				console.log("onActivateVulnerabilitiesAssessment");
			},
			riskScore: 95,
			status: "DE ACTIVE",
			summary: {
				[CyberAssetCriticality.CRITICAL]: 5,
				[CyberAssetCriticality.HIGH]: 4,
				[CyberAssetCriticality.LOW]: 10,
				[CyberAssetCriticality.MEDIUM]: 4,
				[CyberAssetCriticality.VERY_HIGH]: 3,
			},
			topVulnerabilities: [
				{
					name: "CVE-2020-1472(ZeroLogon)1",
					criticality: CyberAssetCriticality.MEDIUM,
				},
				{
					name: "CVE-2020-1472(ZeroLogon)2",
					criticality: CyberAssetCriticality.CRITICAL,
				},
				{
					name: "CVE-2020-1472(ZeroLogon)3",
					criticality: CyberAssetCriticality.VERY_HIGH,
				},
			],
			totalVulnerabilities: 12,
		},
	};

	return (
		<Box p={"sm"}>
			<Grid gutter={"xs"}>
				<Grid.Col span={3}>
					<CyberAssetDetailOverviewCard
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
					<CyberAssetDetailOverviewCard title={"Operating System"}>
						<CyberAssetDetailOverviewOperatingSystem osName={data.osName} osType={data.osType} />
					</CyberAssetDetailOverviewCard>
				</Grid.Col>
				<Grid.Col span={3}>
					<CyberAssetDetailOverviewCard title={"CPU"}>
						<CyberAssetDetailOverviewCPU cpu={data.cpu} />
					</CyberAssetDetailOverviewCard>
				</Grid.Col>
				<Grid.Col span={3}>
					<Grid gutter={"xs"}>
						<Grid.Col span={6}>
							<CyberAssetDetailOverviewCard title={"RAM"}>
								<CyberAssetDetailOverviewRAM ram={data.ram} />
							</CyberAssetDetailOverviewCard>
						</Grid.Col>
						<Grid.Col span={6}>
							<CyberAssetDetailOverviewCard title={"Disk"}>
								<CyberAssetDetailOverviewDisk disk={data.disk} />
							</CyberAssetDetailOverviewCard>
						</Grid.Col>
					</Grid>
				</Grid.Col>
			</Grid>

			<Grid gutter={"xs"}>
				<Grid.Col span={6}>
					<CyberAssetDetailOverviewCard title={"Network"} rightSection={<ArrowButton />}>
						<CyberAssetDetailOverviewNetwork network={data.network} />
					</CyberAssetDetailOverviewCard>
				</Grid.Col>

				<Grid.Col span={6}>
					<CyberAssetDetailOverviewCard title={"Changes"} rightSection={<ArrowButton />}>
						<CyberAssetDetailOverviewChanges changes={data.changes} />
					</CyberAssetDetailOverviewCard>
				</Grid.Col>
			</Grid>
			<Grid gutter={"xs"}>
				<Grid.Col span={6}>
					<CyberAssetDetailOverviewCard title={"Top Services"} rightSection={<ArrowButton />}>
						<CyberAssetDetailOverviewTopServices
							serviceStartTypes={data.serviceStartTypes}
							topServices={data.topServices}
						/>
					</CyberAssetDetailOverviewCard>
				</Grid.Col>
				<Grid.Col span={6}>
					<CyberAssetDetailOverviewCard title={"Applications"} rightSection={<ArrowButton />}>
						<CyberAssetDetailOverviewApplications applications={data.applications} />
					</CyberAssetDetailOverviewCard>
				</Grid.Col>
			</Grid>

			<Grid>
				<Grid.Col span={4}>
					<CyberAssetDetailOverviewCard title={"Security"} rightSection={<ArrowButton />}>
						1
					</CyberAssetDetailOverviewCard>
				</Grid.Col>
				<Grid.Col span={4}>
					<CyberAssetDetailOverviewCard title={"Availability & Activity"} rightSection={<ArrowButton />}>
						<CyberAssetDetailOverviewAvailabilityAndActivity
							height={height}
							availabilityAndActivity={data.availabilityAndActivity}
						/>
					</CyberAssetDetailOverviewCard>
				</Grid.Col>
				<Grid.Col span={4}>
					<CyberAssetDetailOverviewCard title={"Notifications"}>
						<CyberAssetDetailOverviewNotifications height={height} notifications={data.notifications} />
					</CyberAssetDetailOverviewCard>
				</Grid.Col>
			</Grid>
		</Box>
	);
}
