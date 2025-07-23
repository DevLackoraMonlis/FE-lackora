import type { BCDynamicConfigRs } from "@/shared/components/baseComponents/BCDynamicField/index.types";

export type DiscoveryAdapterFilters = Record<string, unknown> & {
	type: "none-credential" | "discovery";
	search?: string | null;
	used?: boolean | null;
};

export type DiscoveryAdapterConfigurationRs = {
	id: string;
	adapterId: string;
	lastExecution: string;
	lastExecutionId: string;
	isActive: boolean;
	editable: boolean;
	configs: BCDynamicConfigRs[];
};

export type ConfigurationRs = {
	adapterId: string;
	adapterName: string;
	configurationId: string;
	configurationIP: string;
	lastExecutionId: string;
};

type DeleteDependencyAsset = {
	hostname: string;
	id: string;
	status: string;
	ipAddress: string;
	key: string;
};
export type DeleteDependencyAssets = {
	disabledDeletion: boolean;
	message: string;
	status: boolean;
	total: number;
	results?: DeleteDependencyAsset[];
};
