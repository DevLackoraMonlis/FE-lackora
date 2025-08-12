import type { ReOrderPoliciesRequest } from "@/http/generated/models";
import type { ICAdvancedFilterConditionBuilderCondition } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import type { LabelValueType } from "@/shared/lib/general-types";

export type ProfilingWorkflowTypes = ReOrderPoliciesRequest["workflow"];

export type ProfilingCardData = {
	id: string;
	title: string;
	description: string;
	isActive: boolean;
	conditions: ICAdvancedFilterConditionBuilderCondition[];
	datasource: Array<{ key: string; value: LabelValueType }>;
	[key: string]: unknown;
};

export type ProfilingHandles = {
	handleEditOrCreateProfiling: (id: string) => void;
	handleDeleteProfiling: (id: string) => void;
	handleMatchedAssets: (id: string) => void;
	handleEnabledProfiling: (id: string) => void;
	handleRefetchPolicies: VoidFunction;
	profilingCards?: ProfilingCardData[];
};

type DeleteProfilingData = {
	status?: string | null;
	ipAddress?: string | null;
	key: string;
};
export type DeleteProfiling = {
	disabledDeletion: boolean;
	message: string;
	status: boolean;
	total: number;
	results?: DeleteProfilingData[];
};
