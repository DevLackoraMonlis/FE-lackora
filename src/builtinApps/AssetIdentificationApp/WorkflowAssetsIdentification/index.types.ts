export type WorkflowStatus = "failed" | "completed" | "inprogress" | "idle" | "partial";

export type WorkflowStep = {
	type: string;
	status: WorkflowStatus;
	title: string;
	progressStatus: string;
	description: { label: string; progress: boolean; value: number };
};

export type WorkflowAccordionProps = {
	type: string;
	status: WorkflowStatus;
	title: string;
	description: { label: string; progress: boolean; value: number };
	steps: WorkflowStep[];
};

export type WorkflowHandles = {
	handleViewMatchedAssets: VoidFunction;
	handleGatewayConfiguration: VoidFunction;
};
