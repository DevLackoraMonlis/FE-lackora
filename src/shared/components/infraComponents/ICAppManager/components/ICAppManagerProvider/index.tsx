"use client";
import AssetIdentificationDiscoverySettingsPage from "@/builtinApps/AssetIdentificationApp/DiscoverySettings";
import AssetIdentificationProfilingSettingsPage from "@/builtinApps/AssetIdentificationApp/ProfillngSettings";
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
];

export default function ICAppManagerProvider(props: PropsWithChildren) {
	return (
		<ICAppManagerContext.Provider value={{ apps: apps }}>
			{props.children}
		</ICAppManagerContext.Provider>
	);
}
