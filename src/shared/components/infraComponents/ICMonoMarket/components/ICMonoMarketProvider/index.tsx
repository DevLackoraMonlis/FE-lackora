"use client";

import { AllApplications } from "@/shared/constants/routes";
import type { PropsWithChildren } from "react";
import type { ICMonoMarketAppType } from "../../index.types";
import ICMonoMarketContext from "./ICMonoMarketContext";

import AdapterManagementLandingPage from "@/builtinApps/AdaptersApp";
import AssetIdentificationAppConfig from "@/builtinApps/AssetIdentificationApp/AssetIdentificationAppConfig";
import AssetIdentificationDiscoverySettingsPage from "@/builtinApps/AssetIdentificationApp/DiscoverySettings";
import AssetIdentificationProfilingSettingsPage from "@/builtinApps/AssetIdentificationApp/ProfillngSettings";
import CyberAssetsLandingPage from "@/builtinApps/CyberAssetsApp/CyberAssets";
import WorkflowAssetsIdentification from "@/builtinApps/ManagementCenterApp/WorkflowAssetsIdentification";
import ObjectsConnectionsPage from "@/builtinApps/ObjectsApp/Connections";
import ICMonoMarket from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket";

const apps: ICMonoMarketAppType[] = [
	{
		name: AllApplications.CYBER_ASSETS.name,
		headerTitle: "Cyber Assets",
		modules: [
			{
				name: AllApplications.CYBER_ASSETS.modules.CYBER_ASSETS,
				page: CyberAssetsLandingPage,
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
				name: AllApplications.ASSET_IDENTIFICATION.modules.DISCOVERY_SETTINGS,
				page: AssetIdentificationDiscoverySettingsPage,
				headerType: "basic",
			},
			{
				name: AllApplications.ASSET_IDENTIFICATION.modules.PROFILING_SETTINGS,
				page: WorkflowAssetsIdentification, // AssetIdentificationProfilingSettingsPage
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
	{
		name: AllApplications.MANAGEMENT_CENTER.name,
		headerTitle: "Management Center",
		headerType: "basic",
		modules: [
			{
				name: AllApplications.MANAGEMENT_CENTER.modules.WORKFLOW,
				page: AssetIdentificationProfilingSettingsPage,
				headerType: "basic",
			},
		],
	},
];

export default function ICMonoMarketProvider(props: PropsWithChildren) {
	return <ICMonoMarketContext.Provider value={{ apps: apps }}>{props.children}</ICMonoMarketContext.Provider>;
}
