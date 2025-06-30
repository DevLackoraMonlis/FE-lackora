import type {
	BCDynamicFieldGenerator,
	BCDynamicFieldProps,
} from "@/shared/components/baseComponents/BCDynamicField/index.types";

export type DiscoveryAdapterFieldObjectType = "connection" | "none";

export type DiscoveryAdaptersField = BCDynamicFieldProps<DiscoveryAdapterFieldObjectType>;

export type DiscoveryAdapterApiField = BCDynamicFieldGenerator<DiscoveryAdapterFieldObjectType>;

export type DiscoveryAdapterFilters = Record<string, unknown> & {
	type: "none-credential" | "discovery";
	search?: string | null;
	used?: boolean | null;
};

export type DiscoveryAdapterConfiguration = {
	key: string;
	value: string;
	id?: string;
	type?: string;
};

export type DiscoveryAdapterConfigurationRs = {
	id: string;
	configs: DiscoveryAdapterConfiguration[];
	isActive: boolean;
};
