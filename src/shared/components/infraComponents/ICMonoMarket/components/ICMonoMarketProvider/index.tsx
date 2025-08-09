"use client";

import { AllApplications } from "@/shared/constants/routes";
import type { PropsWithChildren } from "react";
import type { ICMonoMarketAppType } from "../../index.types";
import ICMonoMarketContext from "./ICMonoMarketContext";

import AdapterManagementLandingPage from "@/builtinApps/AdaptersApp";
import AssetIdentificationAppConfig from "@/builtinApps/AssetIdentificationApp/AssetIdentificationAppConfig";
import AssetIdentificationDiscoverySettingsPage from "@/builtinApps/AssetIdentificationApp/DiscoverySettings";
import AssetIdentificationProfilingSettingsPage from "@/builtinApps/AssetIdentificationApp/ProfilingSettings";
import WorkflowAssetsIdentification from "@/builtinApps/AssetIdentificationApp/Workflow";
import CyberAssetsLandingPage from "@/builtinApps/CyberAssetsApp/CyberAssets";
import CyberAssetDetailPage from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage";
import InventoryAppDefaultPage from "@/builtinApps/InventoryApp/components/InventoryAppDefaultPage";
import ObjectsConnectionsPage from "@/builtinApps/ObjectsApp/Connections";
import ICMonoMarket from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket";

const apps: ICMonoMarketAppType[] = [
	{
		name: AllApplications.INVENTORY_MANAGEMENT.name,
		modules: [
			{
				name: AllApplications.INVENTORY_MANAGEMENT.modules.SYSTEM_DETAILS,
				page: InventoryAppDefaultPage,
			},
			{
				name: AllApplications.INVENTORY_MANAGEMENT.modules.SOFTWARE,
				page: InventoryAppDefaultPage,
			},
			{
				name: AllApplications.INVENTORY_MANAGEMENT.modules.HARDWARE,
				page: InventoryAppDefaultPage,
			},
			{
				name: AllApplications.INVENTORY_MANAGEMENT.modules.NETWORK,
				page: InventoryAppDefaultPage,
			},
			{
				name: AllApplications.INVENTORY_MANAGEMENT.modules.USERS,
				page: InventoryAppDefaultPage,
			},
		],
	},
	{
		name: AllApplications.CYBER_ASSETS.name,
		headerTitle: "Cyber Assets",
		modules: [
			{
				name: AllApplications.CYBER_ASSETS.modules.CYBER_ASSETS,
				page: CyberAssetsLandingPage,
				detailPage: CyberAssetDetailPage,
			},
		],
	},
	{
		name: AllApplications.ADAPTER_MANAGEMENT.name,
		landing: AdapterManagementLandingPage,
		headerTitle: "Adapters",
		headerType: "basic",
		modules: [],
	},

	{
		name: AllApplications.ASSET_IDENTIFICATION.name,
		config: AssetIdentificationAppConfig,
		headerTitle: "Asset Identification",
		headerType: "basic",
		modules: [
			{
				name: AllApplications.ASSET_IDENTIFICATION.modules.WORKFLOW,
				page: WorkflowAssetsIdentification,
				headerType: "basic",
			},
			{
				name: AllApplications.ASSET_IDENTIFICATION.modules.DISCOVERY_SETTINGS,
				page: AssetIdentificationDiscoverySettingsPage,
				headerType: "basic",
			},
			{
				name: AllApplications.ASSET_IDENTIFICATION.modules.PROFILING_SETTINGS,
				page: AssetIdentificationProfilingSettingsPage,
				headerType: "basic",
			},
		],
	},
	{
		name: AllApplications.OBJECTS.name,
		headerType: "basic",
		modules: [
			{
				name: AllApplications.OBJECTS.modules.CONNECTIONS,
				page: ObjectsConnectionsPage,
				headerType: "basic",
			},
		],
	},
	{
		name: AllApplications.MONO_MARKET.name,
		landing: ICMonoMarket,
		headerTitle: "Mono Market",
		headerType: "basic",
		modules: [],
	},
];

export default function ICMonoMarketProvider(props: PropsWithChildren) {
	return <ICMonoMarketContext.Provider value={{ apps: apps }}>{props.children}</ICMonoMarketContext.Provider>;
}
