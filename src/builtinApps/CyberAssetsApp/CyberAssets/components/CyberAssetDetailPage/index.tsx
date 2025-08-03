"use client";

import CyberAssetDetailChanges from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailChanges";
import CyberAssetDetailFiles from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailFiles";
import CyberAssetDetailGeneralInfo from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailGeneralInfo";
import CyberAssetDetailHistory from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailHistory";
import CyberAssetDetailInventory from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailInventory";
import CyberAssetDetailOverview from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview";
import CyberAssetDetailRelations from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailRelations";
import CyberAssetDetailSecurity from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailSecurity";
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
	const { generalInfo, osType, isLoading, assetId } = useGetCyberAssetDetailGeneralInfo({ id: props.id });

	return (
		<Flex direction={"column"} h={"100%"}>
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
			<Grid gutter={0} h={"100%"} classNames={{ inner: "h-full" }}>
				<Grid.Col span={3}>
					<CyberAssetDetailGeneralInfo isLoading={isLoading} {...generalInfo} />
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
						<Tabs.Panel value={TabTypes.OVERVIEW}>
							{activeTab === TabTypes.OVERVIEW && (
								<CyberAssetDetailOverview osType={osType} id={assetId} appName={"Nessus"} />
							)}
						</Tabs.Panel>
						<Tabs.Panel value={TabTypes.INVENTORY}>
							{activeTab === TabTypes.INVENTORY && <CyberAssetDetailInventory id={assetId} />}
						</Tabs.Panel>
						<Tabs.Panel value={TabTypes.CHANGES}>
							{activeTab === TabTypes.CHANGES && <CyberAssetDetailChanges id={assetId} />}
						</Tabs.Panel>
						<Tabs.Panel value={TabTypes.SECURITY}>
							<CyberAssetDetailSecurity />
						</Tabs.Panel>
						<Tabs.Panel value={TabTypes.RELATIONS}>
							<CyberAssetDetailRelations />
						</Tabs.Panel>
						<Tabs.Panel value={TabTypes.FILES}>
							<CyberAssetDetailFiles />
						</Tabs.Panel>
						<Tabs.Panel value={TabTypes.HISTORY}>
							{activeTab === TabTypes.HISTORY && <CyberAssetDetailHistory id={assetId} />}
						</Tabs.Panel>
					</Tabs>
				</Grid.Col>
			</Grid>
		</Flex>
	);
}
