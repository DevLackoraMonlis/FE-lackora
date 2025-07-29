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
};
