"use client";

import CyberAssetDetailGeneralInfo from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailGeneralInfo";
import {
	CyberAssetClassification,
	CyberAssetDiscoveryType,
	CyberAssetOsType,
	CyberAssetState,
	CyberAssetStatus,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.enum";
import { useGetCyberAssetDetailGeneralInfo } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.hooks";
import type { ICMonoAppPagesDefaultProps } from "@/shared/components/infraComponents/ICMonoMarket/index.types";
import { AppRoutes } from "@/shared/constants/routes";
import { Button, Flex, Grid, Tabs } from "@mantine/core";
import {
	IconAffiliate,
	IconArrowLeft,
	IconFilePower,
	IconHistory,
	IconLayoutDashboard,
	IconPackage,
	IconShieldHalfFilled,
	IconStatusChange,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import classes from "../../index.module.css";

type Props = ICMonoAppPagesDefaultProps;

enum TabTypes {
	OVERVIEW = "Overview",
	INVENTORY = "Inventory",
	CHANGES = "Changes",
	SECURITY = "SECURITY",
	RELATIONS = "Relations",
	FILES = "Files",
	HISTORY = "History",
}

export default function CyberAssetDetailPage(props: Props) {
	const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.OVERVIEW);
	const { generalInfo } = useGetCyberAssetDetailGeneralInfo({
		data: {
			currentState: CyberAssetState.MANAGEABLE,
			currentStatus: CyberAssetStatus.PROFILED,
			discoveryType: CyberAssetDiscoveryType.DISCOVERED,
			gateway: "192.168.10.1",
			ipAddress: "192.168.10.1",
			lastLogonUser: "Mahya.sh",
			userGroup: "Product",
			lastRebootTime: "2025-03-12, 18:30",
			lastScanId: "#4300",
			lastSeen: "2025-03-12, 18:30",
			latitude: "35.5501° N",
			longitude: "35.5501° N",
			location: "Tehran Milad DC - Rack 3U",
			macAddress: "00-14-22-01-23-45",
			osFamily: "Windows Server 2019 Standard",
			osType: CyberAssetOsType.LINUX,
			osVersion: "10.0.17763",
			owner: "Saman.ha",
			vLan: "Production-VLAN (ID: 20)",
			classification: CyberAssetClassification.SERVER,
		},
	});
	return (
		<Flex direction={"column"}>
			<Flex bg={"gray.2"} p={"2xs"}>
				<Button
					size={"xs"}
					variant={"transparent"}
					leftSection={<IconArrowLeft size={12} />}
					component={Link}
					href={
						props.appName && props.moduleName ? AppRoutes.appModulePage(props.appName, props.moduleName) : "#"
					}
				>
					Back To assets
				</Button>
			</Flex>
			<Grid gutter={0}>
				<Grid.Col span={3}>
					<CyberAssetDetailGeneralInfo {...generalInfo} />
				</Grid.Col>
				<Grid.Col span={9}>
					<Tabs
						value={activeTab}
						classNames={{
							tab: classes.cyberAssetDetailDeActiveTab,
						}}
						color="gray"
						onChange={(value) => setActiveTab(value as TabTypes)}
						variant="outline"
						defaultValue={TabTypes.OVERVIEW}
					>
						<Tabs.List bg={"gray.2"}>
							<Tabs.Tab value={TabTypes.OVERVIEW} leftSection={<IconLayoutDashboard size={16} />}>
								Overview
							</Tabs.Tab>
							<Tabs.Tab value={TabTypes.INVENTORY} leftSection={<IconPackage size={16} />}>
								Inventory
							</Tabs.Tab>
							<Tabs.Tab value={TabTypes.CHANGES} leftSection={<IconStatusChange size={16} />}>
								Changes
							</Tabs.Tab>
							<Tabs.Tab disabled value={TabTypes.SECURITY} leftSection={<IconShieldHalfFilled size={16} />}>
								Security
							</Tabs.Tab>
							<Tabs.Tab disabled value={TabTypes.RELATIONS} leftSection={<IconAffiliate size={16} />}>
								Relations
							</Tabs.Tab>
							<Tabs.Tab disabled value={TabTypes.FILES} leftSection={<IconFilePower size={16} />}>
								Files
							</Tabs.Tab>
							<Tabs.Tab value={TabTypes.HISTORY} leftSection={<IconHistory size={16} />}>
								History
							</Tabs.Tab>
						</Tabs.List>
						<Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>
						<Tabs.Panel value="messages">Messages tab content</Tabs.Panel>
						<Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
					</Tabs>
				</Grid.Col>
			</Grid>
		</Flex>
	);
}
