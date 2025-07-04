import type { BCDynamicConfigRs } from "@/shared/components/baseComponents/BCDynamicField/index.types";

export type DiscoveryAdapterFilters = Record<string, unknown> & {
	type: "none-credential" | "discovery";
	search?: string | null;
	used?: boolean | null;
};

export type DiscoveryAdapterConfigurationRs = {
	id: string;
	isActive: boolean;
	editable: boolean;
	configs: BCDynamicConfigRs[];
};
