import type { BCDynamicConfigRs } from "@/shared/components/baseComponents/BCDynamicField/index.types";

export type AdaptersFilters = Record<string, unknown> & {
	search?: string | null;
};

export type AdaptersConfigurationRs = {
	id: string;
	isActive: boolean;
	editable: boolean;
	configs: BCDynamicConfigRs[];
};
