import { useToggle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import {
	enablePolicy,
	enforcePolicy,
	getPolicyDependency,
	useDeletePolicy,
	useGetPolicies,
	useOrderPolicyPriority,
} from "@/http/generated/policy-management";
import {
	runWorkflow,
	useGetWorkflowHistory,
	useGetWorkflowHistoryDetail,
	useGetWorkflowStep,
	useGetWorkflows,
} from "@/http/generated/workflow-management";

import type { CustomError } from "@/http/end-points/GeneralService.types";
import { toFormattedDate } from "@/shared/lib/dayJs";
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
						const key = Object.values(record).join("-");
						return {
							key,
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
						const key = Object.values(record).join("-");
						return Object.entries(record).reduce(
							(acc, [key]) => {
								acc[key] = getValueFromDynamicColumnRecord(record, key);
								return acc;
							},
							{ key } as Record<string, unknown>,
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
				const debouncedWorkflowCallback = setTimeout(() => {
					workflowCallback();
					toggleLoading(false);
					notifications.show({
						title: "Successfully Run",
						message: "The workflow has been successfully triggered manually.",
						color: "green",
						withBorder: true,
					});
					clearTimeout(debouncedWorkflowCallback);
				}, 3000);
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

export function useWorkflowPolicy(workflow: string) {
	const polices = useGetPolicies(
		{ workflow },
		{
			query: {
				enabled: !!workflow,
				select: (response) => {
					const results = response?.data?.results?.map((item) => ({
						...item,
						id: item.id,
						title: item.name,
						description: `Created at ${toFormattedDate(item.created_time, "YYYY-MM-DD")} by ${item.creator}`,
						enforce: !!item.has_triggered,
						isActive: !!item.enabled,
					}));
					return { ...response?.data, results };
				},
			},
		},
	);

	return { polices };
}

export function useWorkflowPolicyReOrder() {
	const reOrderPolices = useOrderPolicyPriority();
	return { reOrderPolices };
}

export function useWorkflowPolicyEnforce(updateEnforceCallback: VoidFunction) {
	const [loading, toggleLoading] = useToggle([false, true]);

	function workflowEnforcePolicy(policyId: string) {
		toggleLoading(true);
		enforcePolicy(policyId)
			.then(() => {
				updateEnforceCallback();
				toggleLoading(false);
				notifications.show({
					title: "Success",
					message: "The operation was successful.",
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

	return { workflowEnforcePolicy, loading };
}

export function useWorkflowPolicyEnabled(updateEnabledCallback: VoidFunction) {
	const [loading, toggleLoading] = useToggle([false, true]);

	function workflowEnabledPolicy(policyId: string) {
		toggleLoading(true);
		enablePolicy(policyId)
			.then(() => {
				updateEnabledCallback();
				toggleLoading(false);
				notifications.show({
					title: "Success",
					message: "The operation was successful.",
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

	return { workflowEnabledPolicy, loading };
}

export function useDeleteSinglePolicy() {
	const deletePolicy = useDeletePolicy();
	return { deletePolicy };
}
export function useDeletePolicyDependency() {
	const [dependencyLoading, toggleDependencyLoading] = useToggle([false, true]);

	async function getDependency(configurationId: string) {
		toggleDependencyLoading(true);
		return await getPolicyDependency(configurationId)
			.then(({ data }) => {
				toggleDependencyLoading(false);
				const results = data?.results?.map(({ primary_ip, status }, idx) => ({
					status: status as string,
					ipAddress: primary_ip as string,
					key: `${idx + 1}`,
				}));
				return { ...data, disabledDeletion: false, results };
			})
			.catch(() => {
				toggleDependencyLoading(false);
				return {
					disabledDeletion: true,
					message: "",
					status: false,
					total: 0,
					results: [],
				};
			});
	}

	return { getDependency, dependencyLoading };
}
