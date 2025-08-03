import { useToggle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import type { CustomError } from "@/http/end-points/GeneralService.types";
import {
	runWorkflow,
	useGetWorkflowHistory,
	useGetWorkflowHistoryDetail,
	useGetWorkflowStep,
	useGetWorkflows,
} from "@/http/generated/workflow-management";
import { getErrorMessage } from "@/shared/lib/utils";

import { getValueFromDynamicColumnRecord } from "./index.helper";

export function useWorkflow(refetchInterval: false | number = false) {
	const workflows = useGetWorkflows({
		query: {
			refetchOnMount: true,
			staleTime: 0,
			gcTime: 0,
			refetchInterval,
			select: (res) => res.data,
		},
	});
	return { workflows, isLoading: workflows?.isLoading };
}

export function useWorkflowScanHistory(queryParams: Record<string, unknown>) {
	const scanHistoryList = useGetWorkflowHistory(queryParams, {
		query: {
			select: (res) => {
				const results =
					res?.data?.results?.map((record) => {
						return {
							id: record.id || "",
							scanId: `${record.scan_id || ""}`,
							status: record.status,
						};
					}) || [];
				return { ...res.data, results };
			},
		},
	});
	const filters = scanHistoryList.data?.metadata?.filters.map((item) => ({
		...item,
		items: item.items?.map(({ label, value }) => ({ label, value: value as string })),
	}));

	return { scanHistoryList, filters };
}

export function useWorkflowHistoryDetail(stepId: string, _queryParams: Record<string, unknown>) {
	const historyDetail = useGetWorkflowHistoryDetail(stepId, {
		query: {
			enabled: !!stepId,
			select: (res) => {
				const results =
					res?.data?.results?.map((record) => {
						return {
							key: `${record.ip}-${record.mac}-${record.gateway_name}`,
							ipAddress: record.ip,
							macAddress: record.mac,
							discoveryTime: record.discovery_time,
							gateway: record.gateway_name,
						};
					}) || [];
				return { ...res.data, results };
			},
		},
	});
	return { historyDetail };
}

export function useWorkflowStep(stepId: string) {
	const stepDetails = useGetWorkflowStep(stepId, {
		query: {
			enabled: !!stepId,
			select: (res) => {
				const results =
					res?.data?.results?.map((record) => {
						return Object.entries(record).reduce(
							(acc, [key]) => {
								acc[key] = getValueFromDynamicColumnRecord(record, key);
								return acc;
							},
							{
								key: `${record.ip}-${record.mac}-${record.discovery_time}`,
							} as Record<string, unknown>,
						);
					}) || [];
				return { ...res.data, results };
			},
		},
	});

	return { stepDetails };
}

export function useWorkflowRunNow(workflowCallback: VoidFunction) {
	const [loading, toggleLoading] = useToggle([false, true]);

	function workflowRunNow() {
		toggleLoading(true);
		runWorkflow()
			.then(() => {
				workflowCallback();
				toggleLoading(false);
				notifications.show({
					title: "Successfully Run",
					message: "The workflow has been successfully triggered manually.",
					color: "green",
					withBorder: true,
				});
			})
			.catch((error: CustomError) => {
				toggleLoading(false);
				notifications.show({
					title: "Failed",
					message: getErrorMessage(error),
					color: "red",
					withBorder: true,
				});
			});
	}

	return { workflowRunNow, loading };
}
