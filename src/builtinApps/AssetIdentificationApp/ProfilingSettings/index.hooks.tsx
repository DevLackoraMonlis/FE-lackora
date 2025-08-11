import { useToggle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { v4 } from "uuid";

import type { CustomError } from "@/http/end-points/GeneralService.types";
import { useGetAssetFilterColumns } from "@/http/generated/cyber-asset-management-cyber-assets";
import {
	changeInventoryRuleStatus,
	getInventoryRuleDependency,
	useCreateInventoryRule,
	useDeleteInventoryRule,
	useGetInventoryRules,
	useOrderInventoryRulePriority,
	useUpdateInventoryRule,
	useValidateInventoryRuleCondition,
} from "@/http/generated/inventory-rules";
import { convertICAdvancedFilterResponseColumns } from "@/shared/components/infraComponents/ICAdvancedFilter/index.helper";

import { toFormattedDate } from "@/shared/lib/dayJs";
import { getErrorMessage } from "@/shared/lib/utils";

import type { ProfilingInventoryRules } from "./index.enum";
import type { ProfilingCardData } from "./index.types";

export function useProfiling(type: ProfilingInventoryRules) {
	const inventoryRules = useGetInventoryRules(
		{ type },
		{
			query: {
				enabled: !!type,
				select: (response) => {
					const results = response?.data?.results?.map(({ conditions, ...item }) => ({
						...item,
						id: item.id,
						title: item.name,
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
						})) as ProfilingCardData["conditions"],
					}));
					return { ...response?.data, results };
				},
			},
		},
	);

	return { inventoryRules };
}

export function useProfilingReOrder() {
	const inventoryRulePriority = useOrderInventoryRulePriority();
	return { inventoryRulePriority };
}

export function useProfilingEnabled(updateEnabledCallback: VoidFunction) {
	const [loading, toggleLoading] = useToggle([false, true]);
	function enabledProfiling(inventoryRuleId: string, type: ProfilingInventoryRules) {
		toggleLoading(true);
		changeInventoryRuleStatus(inventoryRuleId, { type })
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

	return { enabledProfiling, loading };
}

export function useDeleteSingleProfiling() {
	const deleteProfiling = useDeleteInventoryRule();
	return { deleteProfiling };
}
export function useDeleteProfilingDependency(type: ProfilingInventoryRules) {
	const [dependencyLoading, toggleDependencyLoading] = useToggle([false, true]);
	async function getDependency(inventoryRuleId: string) {
		toggleDependencyLoading(true);
		return await getInventoryRuleDependency(inventoryRuleId, { type })
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

export function useColumnProfilingConditions() {
	const columnConditions = useGetAssetFilterColumns({
		query: { select: (res) => convertICAdvancedFilterResponseColumns(res) },
	});

	return { columnConditions };
}

export function useCreateProfiling() {
	const createInventoryRule = useCreateInventoryRule();
	return { createInventoryRule };
}

export function useUpdateProfiling() {
	const updateInventoryRule = useUpdateInventoryRule();
	return { updateInventoryRule };
}

export function usePolicyConditionsValidation() {
	const conditionsValidation = useValidateInventoryRuleCondition({
		mutation: { onMutate: () => ({ hideErrorMessage: false, hideSuccessMessage: true }) },
	});

	return { conditionsValidation };
}
