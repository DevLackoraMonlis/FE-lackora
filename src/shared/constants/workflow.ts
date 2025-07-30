import {
	IconAlertTriangle,
	IconCheck,
	IconLoader,
	IconPercentage50,
	IconPlayerPause,
} from "@tabler/icons-react";

import { WorkflowStatus } from "../enums/index.enums";

type WorkflowStatusParams = { label: string; color: string; c: string; bg: string; icon: typeof IconCheck };
export const WORKFLOW_STATUS: Record<WorkflowStatus, WorkflowStatusParams> = {
	[WorkflowStatus.Completed]: {
		label: "Completed",
		color: "green",
		c: "green",
		bg: "green.1",
		icon: IconCheck,
	},
	[WorkflowStatus.Idle]: {
		label: "Idle",
		color: "gray",
		c: "gray.5",
		bg: "gray.1",
		icon: IconPlayerPause,
	},
	[WorkflowStatus.Failed]: {
		label: "Failed",
		color: "red",
		c: "red",
		bg: "red.1",
		icon: IconAlertTriangle,
	},
	[WorkflowStatus.PartialSuccess]: {
		label: "Partial Success",
		color: "orange",
		c: "orange",
		bg: "orange.1",
		icon: IconPercentage50,
	},
	[WorkflowStatus.Inprogress]: {
		label: "Inprogress",
		color: "blue",
		c: "blue",
		bg: "blue.1",
		icon: IconLoader,
	},
};
