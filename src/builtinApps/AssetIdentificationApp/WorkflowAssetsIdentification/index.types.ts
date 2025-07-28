export type WorkflowStep = {
	type: string;
	status: string; // WorkflowStatus;
	title: string;
	progressStatus: string;
	description: {
		message: string;
		description: string;
		isProgress: boolean;
		value: number;
		resultMessage: string | null;
		resultCount: number | null;
	};
};

export type WorkflowAccordionProps = {
	type: string;
	status: string; // WorkflowStatus;
	title: string;
	description: { label: string; progress: boolean; value: number };
	steps: WorkflowStep[];
};

export type WorkflowHandles = {
	handleViewMatchedAssets: VoidFunction;
	handleGatewayConfiguration: VoidFunction;
};
