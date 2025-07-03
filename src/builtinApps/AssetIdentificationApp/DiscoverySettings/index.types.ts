import type { BCDynamicFieldProps } from "@/shared/components/baseComponents/BCDynamicField/index.types";
import type { LabelValueType } from "@/shared/lib/general-types";

export type DiscoveryAdapterFieldObjectType = string;

export type DiscoveryAdaptersField = BCDynamicFieldProps<DiscoveryAdapterFieldObjectType>;

export type DiscoveryAdapterFilters = Record<string, unknown> & {
	type: "none-credential" | "discovery";
	search?: string | null;
	used?: boolean | null;
};

export type DiscoveryAdapterConfigsRs = {
	key: string;
	value?: LabelValueType | null;
	id?: string;
	type?: string;
};
export type DiscoveryAdapterConfigsRq = {
	key: string;
	value: string;
	id?: string;
	type?: string;
};

export type DiscoveryAdapterConfigurationRs = {
	id: string;
	configs: DiscoveryAdapterConfigsRs[];
	isActive: boolean;
	editable: boolean;
};
