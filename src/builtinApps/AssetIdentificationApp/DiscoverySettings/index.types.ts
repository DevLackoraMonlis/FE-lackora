import type { PaginationRq } from "@/http/end-points/GeneralService.types";
import type {
	BCDynamicFieldGenerator,
	BCDynamicFieldProps,
} from "@/shared/components/baseComponents/BCDynamicField/index.types";

export type DiscoveryAdapterFieldObjectType = "connection" | "none";

export type DiscoveryAdaptersField = BCDynamicFieldProps<DiscoveryAdapterFieldObjectType>;

export type DiscoveryAdapterApiField = BCDynamicFieldGenerator<DiscoveryAdapterFieldObjectType>;

export type DiscoveryAdapterFilters = PaginationRq<Record<string, unknown>>;

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
