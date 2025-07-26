import { ICAdvancedGroupByFunctions } from "@/shared/components/infraComponents/ICAdvancedFilter/index.enum";
import type {
	ICAdvancedFilterColumnRs,
	ICAdvancedFilterCondition,
	ICAdvancedFilterRq,
	ICAdvancedFilterStoreType,
	SetStateStore,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { v4 } from "uuid";
import { IC_ADVANCED_FILTER_DEFAULT_OPERATORS } from "./index.constants";

const defaultAdvancedVariables: ICAdvancedFilterRq = {
	search: {
		columnName: "",
		value: "",
	},
	limit: 25,
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
		condition.values = [
			{
				label: condition as unknown as string,
				value: condition as unknown as string,
			},
		];
	}
	const isEmptyCondition = () => {
		if (!Array.isArray(value) || value.length === 0) return true;
		return value.some((item) => [undefined, null, ""].includes(item?.value));
	};

	if (isEmptyCondition()) {
		condition.values = [];
		condition.operator =
			operator === IC_ADVANCED_FILTER_DEFAULT_OPERATORS["="]
				? IC_ADVANCED_FILTER_DEFAULT_OPERATORS["Is Null"]
				: IC_ADVANCED_FILTER_DEFAULT_OPERATORS["Is Not Null"];
	}

	if (isFunctionColumn && state.groupBy) {
		const groupBy = { ...state.groupBy };
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
			groupBy,
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
					IC_ADVANCED_FILTER_DEFAULT_OPERATORS["="],
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
					IC_ADVANCED_FILTER_DEFAULT_OPERATORS["!="],
				);
			});
		},
		setGroupBy: (groupBy) => {
			set({ groupBy });
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
					if (state.groupBy) {
						const groupBy = { ...state.groupBy };
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
		resetToDefaultVariables: () => set({ variables: defaultVariables || defaultAdvancedVariables }),
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
