import type { ReOrderPoliciesRequest } from "@/http/generated/models";
import type { ICAdvancedFilterConditionBuilderCondition } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";

export type WorkflowDescription = {
	message: string;
	description: string;
	isProgress: boolean;
	value: number;
	resultMessage: string | null;
	resultCount: number | null;
};

export type WorkflowStep = {
	id: string;
	type?: string | null;
	status?: string | null; // WorkflowStatus;
	title?: string | null;
	progressStatus?: string | null;
	description: WorkflowDescription;
};

export type WorkflowPhase = {
	phaseId: string;
	type: string;
	status: string; // WorkflowStatus;
	title: string;
	steps?: WorkflowStep[];
	description: WorkflowDescription & {
		failed: boolean;
		inprogress: boolean;
		completed: boolean;
		partial: boolean;
		idle: boolean;
	};
};

export type WorkflowScan = {
	id: string;
	scanId: string;
	status: string;
};

export type WorkflowHandles = {
	handleViewMatchedAssets: (id: string) => void;
	handleGatewayConfiguration: (id: string) => void;
	handleViewPolices: (id: string) => void;
};

export type PolicyWorkflowTypes = ReOrderPoliciesRequest["workflow"];

export type PolicyCardData = {
	id: string;
	title: string;
	description: string;
	isActive: boolean;
	enforce: boolean;
	conditions: ICAdvancedFilterConditionBuilderCondition[];
	[key: string]: unknown;
};

export type PolicyHandles = {
	handleEditOrCreatePolicy: (id: string) => void;
	handleDeletePolicy: (id: string) => void;
	handleRefetchPolicies: VoidFunction;
	policyCards?: PolicyCardData[];
};

type DeletePolicyData = {
	status?: string | null;
	ipAddress?: string | null;
	key: string;
};
export type DeletePolicy = {
	disabledDeletion: boolean;
	message: string;
	status: boolean;
	total: number;
	results?: DeletePolicyData[];
};
