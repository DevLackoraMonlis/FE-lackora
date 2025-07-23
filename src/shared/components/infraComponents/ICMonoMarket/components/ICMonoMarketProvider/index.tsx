"use client";

import { AllApplications } from "@/shared/constants/routes";
import type { PropsWithChildren } from "react";
import type { ICMonoMarketAppType } from "../../index.types";
import ICMonoMarketContext from "./ICMonoMarketContext";

import AdapterManagementLandingPage from "@/builtinApps/AdaptersApp";
import AssetIdentificationAppConfig from "@/builtinApps/AssetIdentificationApp/AssetIdentificationAppConfig";
import AssetIdentificationDiscoverySettingsPage from "@/builtinApps/AssetIdentificationApp/DiscoverySettings";
import AssetIdentificationProfilingSettingsPage from "@/builtinApps/AssetIdentificationApp/ProfillngSettings";
import WorkflowAssetsIdentification from "@/builtinApps/ManagementCenterApp/WorkflowAssetsIdentification";
import ObjectsConnectionsPage from "@/builtinApps/ObjectsApp/Connections";
import ICMonoMarket from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket";

const apps: ICMonoMarketAppType[] = [
	{
		name: AllApplications.ADAPTER_MANAGEMENT.name,
		landing: AdapterManagementLandingPage,
		headerTitle: "Adapters",
		modules: [],
	},
	{
		name: AllApplications.ASSET_IDENTIFICATION.name,
		config: AssetIdentificationAppConfig,
		headerTitle: "Asset Identification",
		modules: [
			{
				name: AllApplications.ASSET_IDENTIFICATION.modules.DISCOVERY_SETTINGS,
				page: AssetIdentificationDiscoverySettingsPage,
				headerTitle: "Discovery Settings",
			},
			{
				name: AllApplications.ASSET_IDENTIFICATION.modules.PROFILING_SETTINGS,
				page: WorkflowAssetsIdentification, // AssetIdentificationProfilingSettingsPage
				headerTitle: "Profiling Settings",
			},
		],
	},
	{
		name: AllApplications.OBJECTS.name,
		modules: [
			{
				name: AllApplications.OBJECTS.modules.CONNECTIONS,
				page: ObjectsConnectionsPage,
				headerTitle: "Connections",
			},
		],
	},
	{
		name: AllApplications.MONO_MARKET.name,
		landing: ICMonoMarket,
		headerTitle: "Mono Market",
		modules: [],
	},
	{
		name: AllApplications.MANAGEMENT_CENTER.name,
		headerTitle: "Management Center",
		modules: [
			{
				name: AllApplications.MANAGEMENT_CENTER.modules.WORKFLOW,
				page: AssetIdentificationProfilingSettingsPage, // CyberAssetsIdentificationWorkflow
				headerTitle: "Cyber Assets Identification Workflow",
			},
		],
	},
];

export default function ICMonoMarketProvider(props: PropsWithChildren) {
	return <ICMonoMarketContext.Provider value={{ apps: apps }}>{props.children}</ICMonoMarketContext.Provider>;
}
