import { useToggle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { v4 } from "uuid";

import type { CustomError } from "@/http/end-points/GeneralService.types";
import {
	enablePolicy,
	enforcePolicy,
	getPolicyDependency,
	useCreatePolicy,
	useDeletePolicy,
	useGetPolicies,
	useGetPolicyManagementColumns,
	useOrderPolicyPriority,
	useUpdatePolicy,
} from "@/http/generated/policy-management";
import {
	runWorkflow,
	useGetWorkflowHistory,
	useGetWorkflowHistoryDetail,
	useGetWorkflowStep,
	useGetWorkflows,
} from "@/http/generated/workflow-management";
import { convertICAdvancedFilterResponseColumns } from "@/shared/components/infraComponents/ICAdvancedFilter/index.helper";

import { toFormattedDate } from "@/shared/lib/dayJs";
import { getErrorMessage } from "@/shared/lib/utils";
import { getValueFromDynamicColumnRecord } from "./index.helper";
import type { PolicyCardData } from "./index.types";

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
					const results = response?.data?.results?.map(({ conditions, ...item }) => ({
						...item,
						id: item.id,
						title: item.name,
						enforce: !!item.has_triggered,
						isActive: !!item.enabled,
						description: `Created at ${toFormattedDate(item.created_time, "YYYY-MM-DD")} by ${item.creator}`,
						conditions: (conditions as unknown as Record<string, unknown>[]).map((condition) => ({
							id: v4(),
							closeBracket: condition.close_bracket,
							columnName: condition.column_name,
							nextOperator: condition.next_operator,
							openBracket: condition.open_bracket,
							operator: condition.operator,
							values: condition.values,
						})) as PolicyCardData["conditions"],
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
					message: "Successfully applied to the current scan.",
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
				const debouncedCallback = setTimeout(() => {
					updateEnabledCallback();
					toggleLoading(false);
					notifications.show({
						title: "Success",
						message: "The operation was successful.",
						color: "green",
						withBorder: true,
					});
					clearTimeout(debouncedCallback);
				}, 2000);
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
					status,
					ipAddress: primary_ip,
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

export function useColumnPolicyConditions() {
	const columnConditions = useGetPolicyManagementColumns({
		query: { select: (res) => convertICAdvancedFilterResponseColumns(res) },
	});

	return { columnConditions };
}

export function useCreateWorkflowPolicy() {
	const createPolicy = useCreatePolicy();
	return { createPolicy };
}

export function useUpdateWorkflowPolicy() {
	const updatePolicy = useUpdatePolicy();
	return { updatePolicy };
}
