import {
	IconAlertTriangle,
	IconCheck,
	IconHourglassEmpty,
	IconLoader,
	IconPercentage50,
	IconPlayerPause,
} from "@tabler/icons-react";

import { WorkflowStatus } from "../enums/index.enums";

type WorkflowStatusParams = {
	label: string;
	color: string;
	c: string;
	bg: string;
	value: string;
	icon: typeof IconCheck;
};
export const WORKFLOW_STATUS: Record<WorkflowStatus, WorkflowStatusParams> = {
	[WorkflowStatus.Completed]: {
		value: WorkflowStatus.Completed,
		label: "Completed",
		color: "green",
		c: "green",
		bg: "green.2",
		icon: IconCheck,
	},
	[WorkflowStatus.Idle]: {
		value: WorkflowStatus.Idle,
		label: "Idle",
		color: "gray",
		c: "gray.5",
		bg: "gray.2",
		icon: IconPlayerPause,
	},
	[WorkflowStatus.Failed]: {
		value: WorkflowStatus.Failed,
		label: "Failed",
		color: "red",
		c: "red",
		bg: "red.2",
		icon: IconAlertTriangle,
	},
	[WorkflowStatus.PartialSuccess]: {
		value: WorkflowStatus.PartialSuccess,
		label: "Partial Success",
		color: "orange",
		c: "orange",
		bg: "orange.2",
		icon: IconPercentage50,
	},
	[WorkflowStatus.Inprogress]: {
		value: WorkflowStatus.Inprogress,
		label: "Inprogress",
		color: "blue",
		c: "blue",
		bg: "blue.2",
		icon: IconLoader,
	},
	[WorkflowStatus.Pending]: {
		value: WorkflowStatus.Pending,
		label: "Pending",
		color: "gray",
		c: "gray.4",
		bg: "gray.2",
		icon: IconHourglassEmpty,
	},
};
