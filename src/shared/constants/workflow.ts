import { WorkflowStatus } from "../enums/index.enums";

type WorkflowStatusParams = { label: string; color: string; c: string; bg: string };
export const WORKFLOW_STATUS: Record<WorkflowStatus, WorkflowStatusParams> = {
	[WorkflowStatus.Completed]: {
		label: "Completed",
		color: "green",
		c: "green",
		bg: "green.1",
	},
	[WorkflowStatus.Idle]: {
		label: "Idle",
		color: "gray",
		c: "gray",
		bg: "gray.1",
	},
	[WorkflowStatus.Failed]: {
		label: "Failed",
		color: "red",
		c: "red",
		bg: "red.1",
	},
	[WorkflowStatus.PartialSuccess]: {
		label: "Partial Success",
		color: "orange",
		c: "orange",
		bg: "orange.1",
	},
	[WorkflowStatus.Inprogress]: {
		label: "Inprogress",
		color: "blue",
		c: "blue",
		bg: "blue.1",
	},
};
