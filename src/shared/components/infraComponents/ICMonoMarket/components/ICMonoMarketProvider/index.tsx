"use client";
import AdapterManagementLandingPage from "@/builtinApps/AdaptersApp";
import AssetIdentificationDiscoverySettingsPage from "@/builtinApps/AssetIdentificationApp/DiscoverySettings";
import AssetIdentificationProfilingSettingsPage from "@/builtinApps/AssetIdentificationApp/ProfillngSettings";
import ObjectsConnectionsPage from "@/builtinApps/ObjectsApp/Connections";
import ICMonoMarket from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket";
import { AllApplications } from "@/shared/enums/index.enums";
import type { PropsWithChildren } from "react";
import type { ICMonoMarketAppType } from "../../index.types";
import ICMonoMarketContext from "./ICMonoMarketContext";

const apps: ICMonoMarketAppType[] = [
	{
		name: AllApplications.ADAPTER_MANAGEMENT.name,
		landing: AdapterManagementLandingPage,
		modules: [],
	},
	{
		name: AllApplications.ASSET_IDENTIFICATION.name,
		modules: [
			{
				name: AllApplications.ASSET_IDENTIFICATION.modules.DISCOVERY_SETTINGS,
				page: AssetIdentificationDiscoverySettingsPage,
				headerTitle: "Discovery Settings",
			},
			{
				name: AllApplications.ASSET_IDENTIFICATION.modules.PROFILING_SETTINGS,
				page: AssetIdentificationProfilingSettingsPage,
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
];

export default function ICMonoMarketProvider(props: PropsWithChildren) {
	return <ICMonoMarketContext.Provider value={{ apps: apps }}>{props.children}</ICMonoMarketContext.Provider>;
}
