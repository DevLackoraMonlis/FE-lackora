import dayjs from "dayjs";
import { isNumber } from "lodash";

import { WORKFLOW_STATUS } from "@/shared/constants/workflow";
import { WorkflowStatus } from "@/shared/enums/index.enums";

import { toFormattedDate } from "@/shared/lib/dayJs";

export const getDifferenceDateTime = ({ date = "", format = "HH:mm:ss" }) => {
	let remainingTime = {
		Hours: { first: "0", second: "0" },
		Minutes: { first: "0", second: "0" },
		Seconds: { first: "0", second: "0" },
	};
	if (date) {
		try {
			const getTime = dayjs(date).diff(dayjs());
			const getDifference = dayjs(getTime).subtract(3.5, "hours").format(format); // .tz("Asia/Tehran")
			const [hh, mm, ss] = getDifference.split(":");
			remainingTime = {
				Hours: { first: hh?.[0], second: hh?.[1] },
				Minutes: { first: mm?.[0], second: mm?.[1] },
				Seconds: { first: ss?.[0], second: ss?.[1] },
			};
			return {
				remainingTime,
				getDifference,
				resetTimer: Math.abs(getTime) <= 300,
				isMessage: !dayjs(date).isValid(),
			};
		} catch (_error) {}
	}
	return { remainingTime, getDifference: "", resetTimer: false, isMessage: true };
};

export function calculateScheduledScanDate(date?: string | null) {
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
		return date;
	} catch (_) {
		return "-";
	}
}

export function calculateNextScheduledScan(date?: string | null) {
	if (!date) return "Scheduled scan will start in - minutes";
	try {
		if (!dayjs(date).isValid()) return `Scheduled scan will start in ${date}`;
		const { getDifference } = getDifferenceDateTime({ date, format: "HH:mm" });
		return `Scheduled scan started ${getDifference} ago`;
	} catch (_) {
		return `Scheduled scan will start in ${date}`;
	}
}

export function phaseDescription<T extends Record<string, unknown>>(phase: T) {
	const progressPhase = ((phase?.current_processed as number) / (phase?.total_processing as number)) * 100;
	const isProgress = isNumber(progressPhase) && progressPhase < 100;
	const failed = (phase.status as string) === WorkflowStatus.Failed;
	const idle = (phase.status as string) === WorkflowStatus.Idle;
	const inprogress = (phase.status as string) === WorkflowStatus.Inprogress;
	const completed = (phase.status as string) === WorkflowStatus.Completed;
	const partial = (phase.status as string) === WorkflowStatus.PartialSuccess;
	const message = failed
		? `${phase.progress} | Duration: ${phase.duration}`
		: idle
			? (phase.description as string) || "-"
			: inprogress
				? `${phase.progress} ${phase.duration || ""}`
				: `Completed: ${phase.progress} | Duration: ${phase.duration}`;

	return {
		failed,
		inprogress,
		completed,
		partial,
		idle,
		message,
		isProgress,
		value: progressPhase,
		description: "",
		resultMessage: null,
		resultCount: null,
	};
}

export function stepDescription<T extends Record<string, unknown>>(step: T) {
	const progressStepValue = ((step?.current_processed as number) / (step?.total_processing as number)) * 100;
	const isProgress = (step.status as string) === WorkflowStatus.Inprogress;
	const failed = (step.status as string) === WorkflowStatus.Failed;
	const start = toFormattedDate(step.start_time as string, "HH:mm") || "-";
	const end = toFormattedDate(step.end_time as string, "HH:mm") || "-";
	return {
		description: failed
			? `${step.message}`
			: isProgress
				? `Start at ${start}`
				: `Start at ${start} - End at ${end}  |  Duration: ${step.duration || "-"}`,
		isProgress,
		value: progressStepValue,
		resultMessage: step.result_message as string,
		resultCount: step.result_count as number,
		message: `${step.progress ? `${step.progress} |` : ""} Duration: ${step.duration || "-"}`,
	};
}

export function getWorkflowStatus(status?: string) {
	return WORKFLOW_STATUS[status as WorkflowStatus] || {};
}

export function getValueFromDynamicColumnRecord(record: { [key: string]: unknown }, key: string) {
	const value = record[key];
	const type = typeof value;

	switch (type) {
		case "string":
			return value as string;
		case "object": {
			const joinValue = Array.isArray(value)
				? typeof value?.[0] === "string" || typeof value?.[0] === "number"
					? value.join(" - ")
					: Object.entries(value?.[0] || {})
							.map(([_, value]) => value)
							.join(" - ")
				: "unknown";
			return joinValue;
		}
		default:
			return value as string;
	}
}
