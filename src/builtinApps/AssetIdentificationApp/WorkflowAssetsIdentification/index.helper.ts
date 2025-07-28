import dayjs from "dayjs";

import type { WorkflowStep } from "./index.types";

export function calculateScheduledScanDate(date: string) {
	if (!date) return "-";
	try {
		const today = dayjs().startOf("day");
		const inputDate = dayjs(date).startOf("day");
		const diff = inputDate.diff(today, "day");
		if (diff === 0) {
			return `Today ${dayjs(date).format("HH:mm")}`;
		}
		if (diff === -1) {
			return `Yesterday ${dayjs(date).format("HH:mm")}`;
		}
		return dayjs(date).format("YYYY-MM-DD, HH:mm");
	} catch (_e) {
		return "-";
	}
}
export function calculateNextScheduledScan(date: string) {
	if (!date) return "Scheduled scan will start in - minutes";
	try {
		const today = dayjs().startOf("day");
		const inputDate = dayjs(date).startOf("day");
		const diff = inputDate.diff(today, "day");
		return `Scheduled scan will start in ${dayjs(diff).get("minutes")} minutes`;
	} catch (_e) {
		return "Scheduled scan will start in - minutes";
	}
}

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
