import dayjs from "dayjs";

import { WORKFLOW_STATUS } from "@/shared/constants/workflow";
import type { WorkflowStatus } from "@/shared/enums/index.enums";

import { toFormattedDate } from "@/shared/lib/dayJs";

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
	} catch (_) {
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
	} catch (_) {
		return "Scheduled scan will start in - minutes";
	}
}
export function stepDescription(step: Record<string, unknown>, isProgressOrFailed: boolean) {
	if (!step) return "-";
	const { start_time, end_time, duration } = step;
	if (isProgressOrFailed) {
		const start = toFormattedDate(start_time as string, "HH:mm") || "-";
		return `Start at ${start}`;
	}
	const start = toFormattedDate(start_time as string, "HH:mm") || "-";
	const end = toFormattedDate(end_time as string, "HH:mm") || "-";
	return `Start at ${start} - End at ${end}  |  Duration: ${duration}`;
}

export function getWorkflowStatusColor(status: string) {
	return WORKFLOW_STATUS[status as WorkflowStatus]?.color;
}
