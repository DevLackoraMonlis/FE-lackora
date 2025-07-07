"use client";
import AdapterManagementLandingPage from "@/builtinApps/AdaptersApp";
import AssetIdentificationDiscoverySettingsPage from "@/builtinApps/AssetIdentificationApp/DiscoverySettings";
import AssetIdentificationProfilingSettingsPage from "@/builtinApps/AssetIdentificationApp/ProfillngSettings";
import ObjectsConnectionsPage from "@/builtinApps/ObjectsApp/Connections";
import { AllApplications } from "@/shared/enums/index.enums";
import type { PropsWithChildren } from "react";
import type { ICAppManagerType } from "../../index.types";
import ICAppManagerContext from "./ICAppManagerContext";

const apps: ICAppManagerType[] = [
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
];

export default function ICAppManagerProvider(props: PropsWithChildren) {
	return <ICAppManagerContext.Provider value={{ apps: apps }}>{props.children}</ICAppManagerContext.Provider>;
}
