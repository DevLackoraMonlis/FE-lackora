import type { PaginationRs } from "@/http/end-points/GeneralService.types";
import type {
	AdvanceFilterRequestModel,
	AdvancedFilterColumnInformation,
	EachAdvanceFilterConditionOperator,
} from "@/http/generated/models";
import { ICAdvancedGroupByFunctions } from "@/shared/components/infraComponents/ICAdvancedFilter/index.enum";
import type {
	ICAdvancedFilterColumnRs,
	ICAdvancedFilterColumnType,
	ICAdvancedFilterCondition,
	ICAdvancedFilterRq,
	ICAdvancedFilterStoreType,
	SetStateStore,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import type { AxiosResponse } from "axios";
import { v4 } from "uuid";
import { IC_ADVANCED_FILTER_DEFAULT_OPERATORS, IC_ADVANCED_FILTER_STRING_OPERATORS } from "./index.constants";

const defaultAdvancedVariables: ICAdvancedFilterRq = {
	search: {
		columnName: "",
		value: "",
	},
	limit: 35,
	page: 1,
	columns: [],
	conditions: [],
};

function includeExcludeAction(
	columnName: string,
	value: unknown,
	allColumns: ICAdvancedFilterColumnRs[],
	state: ICAdvancedFilterStoreType,
	operator: ICAdvancedFilterCondition["operator"],
): Partial<ICAdvancedFilterStoreType> {
	const isFunctionColumn = state.getIsGroupByFunctionColumn(columnName);
	const condition: ICAdvancedFilterCondition = {
		columnName,
		closeBracket: 0,
		nextOperator: "and",
		openBracket: 0,
		operator,
		values: [],
		id: v4(),
	};

	const findColumn = allColumns.find((column) => column.name === columnName);

	if (findColumn?.type === "List") {
		condition.values = (value as string[]).map((item) => ({
			label: item,
			value: item,
		}));
	} else {
		Object.assign(condition, {
			values: [
				{
					label: value as unknown as string,
					value: value as unknown as string,
				},
			],
		});
	}

	const isEmptyCondition = () => {
		if (findColumn?.type === "List") {
			if ((value as unknown[])?.length === 0) return true;
			return (value as unknown[]).some((item) => [undefined, null, ""].includes(item as string));
		}

		if (!value) return true;
	};

	if (isEmptyCondition()) {
		condition.values = [];
		condition.operator =
			operator === IC_ADVANCED_FILTER_DEFAULT_OPERATORS["="]
				? IC_ADVANCED_FILTER_DEFAULT_OPERATORS["Is Null"]
				: IC_ADVANCED_FILTER_DEFAULT_OPERATORS["Is Not Null"];
	}

	if (isFunctionColumn && state.variables.groupBy) {
		const groupBy = { ...state.variables.groupBy };
		if (groupBy?.aggregatedConditions?.length) {
			const findWithOperator = groupBy?.aggregatedConditions?.find(
				(item) => item.operator === condition.operator,
			);
			if (findWithOperator) {
				const newValues = [...findWithOperator.values];
				condition.values.forEach((item) => {
					const findExistValue = newValues.find((aggItem) => aggItem.value === item.value);
					if (!findExistValue) {
						newValues.push(item);
					}
				});
				findWithOperator.values = newValues;
			} else {
				groupBy.aggregatedConditions = [...groupBy.aggregatedConditions, condition];
			}
		} else {
			groupBy.aggregatedConditions = [condition];
		}

		return {
			variables: {
				...state.variables,
				groupBy,
			},
		};
	}

	const variables = { ...state.variables };

	const findExitConditionWithColumnName = variables.conditions.find((item) => item.columnName === columnName);

	if (findExitConditionWithColumnName) {
		if (findExitConditionWithColumnName.operator === condition.operator) {
			const newValues = [...findExitConditionWithColumnName.values];
			condition.values.forEach((item) => {
				const findExistValue = newValues.find((val) => val.value === item.value);
				if (!findExistValue) {
					newValues.push(item);
				}
			});
			findExitConditionWithColumnName.values = newValues;
		} else {
			variables.conditions = [...variables.conditions, condition];
		}
	} else {
		variables.conditions = [...variables.conditions, condition];
	}

	return {
		variables,
	};
}

export function getDefaultICAdvancedStore(params: {
	set: SetStateStore<ICAdvancedFilterStoreType>;
	defaultVariables?: ICAdvancedFilterStoreType["variables"];
}): ICAdvancedFilterStoreType {
	const { defaultVariables, set } = params;

	return {
		runToken: "",
		setRunToken: (runToken) => set({ runToken }),
		openedGroupByModal: false,
		openedConditionSection: false,
		openedFullScreenModal: false,
		setOpenFullScreenModal: (value) => set({ openedFullScreenModal: value }),
		setOpenGroupByModal: (value) => set({ openedGroupByModal: value }),
		setOpenFilterConditionSection: (value) => set({ openedConditionSection: value }),
		openedFilterConditionModal: false,
		setOpenFilterConditionModal: (value) => set({ openedFilterConditionModal: value }),
		excludeCondition: (columnName, value, allColumns) => {
			set((state) => {
				return includeExcludeAction(
					columnName,
					value,
					allColumns,
					state,
					IC_ADVANCED_FILTER_DEFAULT_OPERATORS["!="],
				);
			});
		},
		includeCondition: (columnName, value, allColumns) => {
			set((state) => {
				return includeExcludeAction(
					columnName,
					value,
					allColumns,
					state,
					IC_ADVANCED_FILTER_DEFAULT_OPERATORS["="],
				);
			});
		},
		setGroupBy: (groupBy) => {
			set((state) => {
				return {
					variables: {
						...state.variables,
						groupBy,
					},
				};
			});
		},
		removeCondition: (id) => {
			set((state) => {
				return {
					variables: {
						...state.variables,
						conditions: state.variables.conditions.filter((item) => item.id !== id),
					},
				};
			});
		},
		updateOrder: (columnName, order) => {
			set((state) => {
				const variables = { ...state.variables };

				const isGroupByColumn = state.getIsGroupByFunctionColumn(columnName);

				if (isGroupByColumn) {
					if (state.variables.groupBy) {
						const groupBy = { ...state.variables.groupBy };
						groupBy.order = order;
						return {
							groupBy,
						};
					}
				}
				const findColumnInVariables = variables.columns.find((column) => column.name === columnName);
				if (findColumnInVariables) {
					findColumnInVariables.orderBy = order;
					return {
						variables,
					};
				}
				return state;
			});
		},

		getIsGroupByFunctionColumn: (columnName) => {
			return Object.keys(ICAdvancedGroupByFunctions).some((fn) => columnName.startsWith(fn));
		},
		getExistAnyGroupByColumn: (row) => {
			if (!row) return false;
			return Object.keys(ICAdvancedGroupByFunctions).some((fn) =>
				Object.keys(row).some((r) => r.startsWith(fn)),
			);
		},
		hideColumn: (columnName) => {
			set((state) => {
				const variables = { ...state.variables };

				const isGroupByColumn = state.getIsGroupByFunctionColumn(columnName);

				if (isGroupByColumn) {
					return state;
				}
				return {
					variables: {
						...variables,
						columns: variables.columns.filter((column) => column.name !== columnName),
					},
				};
			});
		},
		setSearch: (search) => set((state) => ({ variables: { ...state.variables, search } })),
		variables: defaultVariables || defaultAdvancedVariables,
		setVariables: (variables) => set({ variables }),
		resetToDefaultVariables: (allColumns) =>
			set({
				variables: defaultVariables || {
					...defaultAdvancedVariables,
					columns: allColumns.filter((item) => item.isDefault),
				},
			}),
		setColumns: (columns) => {
			set((state) => ({ variables: { ...state.variables, columns } }));
		},
		addColumnToVariables: (column) =>
			set((state) => {
				const isExistColumn = state.variables.columns.find((item) => item.name === column.name);
				if (isExistColumn) return state;
				return {
					variables: {
						...state.variables,
						columns: [...state.variables.columns, column],
					},
				};
			}),
		setConditions: (conditions) =>
			set((state) => {
				return { variables: { ...state.variables, conditions } };
			}),
		addCondition: (condition) =>
			set((state) => {
				return {
					variables: {
						...state.variables,
						conditions: [...state.variables.conditions, condition],
					},
				};
			}),
		setAggregationConditionsToGroupBy: (aggregatedConditions) =>
			set((state) => ({
				variables: { ...state.variables, aggregatedConditions },
			})),
		setPage: (page: number) => set((state) => ({ variables: { ...state.variables, page } })),
		setLimit: (limit: number) => set((state) => ({ variables: { ...state.variables, limit } })),
	};
}

export function findAllOperatorKeyByValue(valueToFind: string): string | undefined {
	for (const [key, value] of Object.entries(IC_ADVANCED_FILTER_STRING_OPERATORS)) {
		if (value === valueToFind) {
			return key;
		}
	}
	return undefined; // if not found
}

export function convertICAdvancedFilterResponseColumns<META_DATA>(
	response: AxiosResponse<PaginationRs<AdvancedFilterColumnInformation, META_DATA>, unknown>,
) {
	return {
		...response,
		data: {
			...response.data,
			results: response.data.results.map((item) => {
				const newItem: ICAdvancedFilterColumnRs = {
					displayName: item.display_name,
					isDefault: item.is_default,
					name: item.name,
					objectType: item.object_type || [],
					options: item.options?.map((opt) => ({ label: opt, value: opt })),
					type: item.type as ICAdvancedFilterColumnType,
				};
				return newItem;
			}),
		},
	};
}

export function convertICAdvancedFilterToDefaultVariables(
	variables: ICAdvancedFilterRq,
): AdvanceFilterRequestModel {
	return {
		columns: variables.columns.map((column) => ({
			name: column.name,
			order: column.orderBy,
		})),
		conditions: variables.conditions.map((item) => ({
			close_bracket: item.closeBracket,
			column_name: item.columnName,
			next_operator: item.nextOperator,
			open_bracket: item.openBracket,
			operator: item.operator as EachAdvanceFilterConditionOperator,
			values: item.values,
		})),
		end_date: variables.endDate || null,
		group_by: variables.groupBy
			? {
					aggregated_conditions: variables.groupBy.aggregatedConditions.map((agg) => ({
						close_bracket: agg.closeBracket,
						next_operator: agg.nextOperator,
						open_bracket: agg.openBracket,
						operator: agg.operator,
						values: agg.values,
					})),
					display_name: "",
					column: variables.groupBy.column,
					function: variables.groupBy.function,
					order: variables.groupBy.order,
				}
			: null,
		limit: variables.limit,
		page: variables.page,
		search:
			variables.search.columnName && variables.search.value
				? {
						column_name: variables.search.columnName,
						value: variables.search.value,
					}
				: null,
		start_date: variables.startDate || null,
	};
}
