export type WorkflowDescription = {
	message: string;
	description: string;
	isProgress: boolean;
	value: number;
	resultMessage: string | null;
	resultCount: number | null;
};

export type WorkflowStep = {
	type: string;
	status: string; // WorkflowStatus;
	title: string;
	progressStatus: string;
	description: WorkflowDescription;
};

export type WorkflowPhase = {
	type: string;
	status: string; // WorkflowStatus;
	title: string;
	steps: WorkflowStep[];
	description: WorkflowDescription & {
		failed: boolean;
		inprogress: boolean;
		completed: boolean;
		partial: boolean;
		idle: boolean;
	};
};

export type WorkflowHandles = {
	handleViewMatchedAssets: VoidFunction;
	handleGatewayConfiguration: VoidFunction;
};
