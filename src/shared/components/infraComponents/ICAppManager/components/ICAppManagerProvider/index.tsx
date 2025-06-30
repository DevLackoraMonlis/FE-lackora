"use client";
import AssetIdentificationDiscoverySettingsPage from "@/builtinApps/AssetIdentificationApp/DiscoverySettings";
import AssetIdentificationProfilingSettingsPage from "@/builtinApps/AssetIdentificationApp/ProfillngSettings";
import ObjectsConnectionsPage from "@/builtinApps/ObjectsApp/Connections";
import { AllApplications } from "@/shared/enums/index.enums";
import type { PropsWithChildren } from "react";
import type { ICAppManagerType } from "../../index.types";
import ICAppManagerContext from "./ICAppManagerContext";

const apps: ICAppManagerType[] = [
	{
		name: AllApplications.ASSET_IDENTIFICATION.name,
		modules: [
			{
				name: AllApplications.ASSET_IDENTIFICATION.modules.DISCOVERY_SETTINGS,
				page: AssetIdentificationDiscoverySettingsPage,
			},
			{
				name: AllApplications.ASSET_IDENTIFICATION.modules.PROFILING_SETTINGS,
				page: AssetIdentificationProfilingSettingsPage,
			},
		],
	},
	{
		name: AllApplications.OBJECTS.name,
		modules: [
			{
				name: AllApplications.OBJECTS.modules.CONNECTIONS,
				page: ObjectsConnectionsPage,
			},
		],
	},
];

export default function ICAppManagerProvider(props: PropsWithChildren) {
	return <ICAppManagerContext.Provider value={{ apps: apps }}>{props.children}</ICAppManagerContext.Provider>;
}
