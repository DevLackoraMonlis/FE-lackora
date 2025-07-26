import type { WorkflowStep } from "./index.types";

export function getWorkflowStatusColor(status: WorkflowStep["status"]) {
	switch (status) {
		case "completed":
			return "green";
		case "partial":
			return "orange";
		case "inprogress":
			return "blue";
		case "idle":
			return "gray";
		case "failed":
			return "red";
		default:
			return "gray";
	}
}
