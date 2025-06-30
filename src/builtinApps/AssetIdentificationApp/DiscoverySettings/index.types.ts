import type { BCDynamicFieldProps } from "@/shared/components/baseComponents/BCDynamicField/index.types";

export type DiscoveryAdapterFieldObjectType = "connection" | "none";

export type DiscoveryField = BCDynamicFieldProps<DiscoveryAdapterFieldObjectType>[];
