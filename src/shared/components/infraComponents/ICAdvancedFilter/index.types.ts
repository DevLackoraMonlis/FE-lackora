import type { CyberAssetDetailInventoryType } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import type { PaginationRq, PaginationRs } from "@/http/end-points/GeneralService.types";
import type { TanStackDataTableColumnColDef } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import type {
	IC_ADVANCED_FILTER_DEFAULT_OPERATORS,
	IC_ADVANCED_FILTER_STRING_OPERATORS,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.constants";
import type { ICAdvancedGroupByFunctions } from "@/shared/components/infraComponents/ICAdvancedFilter/index.enum";
import type { LabelValueType } from "@/shared/lib/general-types";
import type { ValueOf } from "@/shared/types/index.types";
import type { AxiosResponse } from "axios";
import type { ReactNode } from "react";
import type { StoreApi } from "zustand/index";

export type ICAdvancedFilterOrder = "asc" | "desc";
export type ICAdvancedFilterOperator = "and" | "or";

type ICAdvancedFilterDataColumnRq = {
	name: string;
	orderBy?: ICAdvancedFilterOrder | null;
};

export type ICAdvancedConditionValueTypeRq = {
	objectType?: string;
	label: string;
	value: string;
};

export type ICAdvancedFilterConditionOperator =
	| ValueOf<typeof IC_ADVANCED_FILTER_STRING_OPERATORS>
	| ValueOf<typeof IC_ADVANCED_FILTER_DEFAULT_OPERATORS>;

export type ICAdvancedFilterCondition = {
	id: string;
	openBracket: number;
	columnName: string;
	operator: ICAdvancedFilterConditionOperator;
	values: ICAdvancedConditionValueTypeRq[];
	closeBracket: number;
	nextOperator: ICAdvancedFilterOperator;
};

export type ICAdvancedFilterAggregationConditionRq = Omit<ICAdvancedFilterCondition, "columnName">;

export type ICAdvancedFilterGroupByRq = {
	function: ICAdvancedGroupByFunctions;
	order: ICAdvancedFilterOrder | null;
	displayName: string;
	column: "*" | string;
	aggregatedConditions: ICAdvancedFilterAggregationConditionRq[];
};

export type ICAdvancedFilterSearchRq = {
	columnName: string | null;
	value: string;
};

export type ICAdvancedFilterColumnType = "Int64" | "String" | "Boolean" | "Date" | "DateTime" | "IP" | "List";

export type ICAdvancedFilterColumnOption = {
	label: string;
	value: string;
};

export type ICAdvancedFilterColumnRs = {
	name: string;
	type: ICAdvancedFilterColumnType;
	objectType?: string[];
	isDefault: boolean;
	displayName: string;
	options?: ICAdvancedFilterColumnOption[];
};

export type ICAdvancedFilterRq<META_DATA extends Record<string, unknown> | unknown = unknown> = {
	search: ICAdvancedFilterSearchRq;
	columns: ICAdvancedFilterDataColumnRq[];
	groupBy?: ICAdvancedFilterGroupByRq;
	conditions: ICAdvancedFilterCondition[];
	startDate?: string;
	endDate?: string;
	metaData?: META_DATA;
} & Pick<PaginationRq, "page" | "limit">;

export type ICAdvancedFilterDataRs = { [key: string]: string };

export type ICAdvancedFilterRs = PaginationRs<ICAdvancedFilterDataRs, { total: number }>;

export type ICAdvancedFilterSaveConditionCreateRq = {
	name: string;
	scope: "PUBLIC" | "PRIVATE";
	description: string;
} & Omit<ICAdvancedFilterRq, "metaData" | "page" | "limit">;

export type ICAdvancedFilterSaveConditionRs = PaginationRs<
	ICAdvancedFilterSaveConditionCreateRq & { id: string }
>;

export type ICAdvancedFilterStoreIncludeExcludeType = (
	columnName: string,
	value: unknown,
	allColumns: ICAdvancedFilterColumnRs[],
) => void;

export type ICAdvancedFilterStoreType = {
	updateOrder: (columnName: string, order: ICAdvancedFilterOrder | null) => void;
	includeCondition: ICAdvancedFilterStoreIncludeExcludeType;
	excludeCondition: ICAdvancedFilterStoreIncludeExcludeType;
	setGroupBy: (groupBy?: ICAdvancedFilterGroupByRq) => void;
	variables: ICAdvancedFilterRq;
	setVariables: (variables: ICAdvancedFilterRq) => void;
	setColumns: (columns: ICAdvancedFilterDataColumnRq[]) => void;
	addColumnToVariables: (column: ICAdvancedFilterDataColumnRq) => void;
	setConditions: (conditions: ICAdvancedFilterCondition[]) => void;
	addCondition: (condition: ICAdvancedFilterCondition) => void;
	setAggregationConditionsToGroupBy: (columns: ICAdvancedFilterCondition[]) => void;
	setPage: (page: number) => void;
	setLimit: (limit: number) => void;
	setSearch: (search: ICAdvancedFilterSearchRq) => void;
	resetToDefaultVariables: (allColumns: ICAdvancedFilterColumnRs[]) => void;
	openedFilterConditionModal: boolean;
	setOpenFilterConditionModal: (opened: boolean) => void;
	openedFullScreenModal: boolean;
	setOpenFullScreenModal: (opened: boolean) => void;
	openedConditionSection: boolean;
	setOpenFilterConditionSection: (opened: boolean) => void;
	openedGroupByModal: boolean;
	setOpenGroupByModal: (opened: boolean) => void;
	removeCondition: (id: string) => void;
	hideColumn: (columnName: string) => void;
	getIsGroupByFunctionColumn: (columnName: string) => boolean;
	getExistAnyGroupByColumn: (row?: Record<string, unknown>) => boolean;
	setRunToken: (runToken: string) => void;
	runToken: string;
};

export type SetStateStore<T> = (
	partial: T | Partial<T> | ((state: T) => T | Partial<T>),
	replace?: false | undefined,
) => void;

export type ICAdvancedFilterProps<T> = {
	hideCellMenu?: boolean;
	hideColumnMenu?: boolean;
	hideCollapseButton?: boolean;
	hideConditionSection?: boolean;
	hideManageColumnButton?: boolean;
	hideExpandGroupByButton?: boolean;
	tableHeight: number;
	tableMinusHeight: number;
	idAccessor: string;
	store: StoreApi<ICAdvancedFilterStoreType>;
	data: T[];
	isLoading: boolean;
	columns: TanStackDataTableColumnColDef<T>[];
	allColumns: ICAdvancedFilterColumnRs[];
	totalRecords: number;
	recordsPerPageOptions?: number[];
	run: (disableResetPage?: boolean) => void;
	leftSection?: ReactNode;
	searchInputPlaceholder: string;
	minColumnSize?: number;
	defaultColumnSize?: number;
	searchInputItems: LabelValueType[];
	excludeColumns?: string[];
	defaultVariables?: ICAdvancedFilterRq;
	fullScreenTitle: string;
	columnsQueryKey: string[];
	onChangeTotalRecords?: (total: number) => void;
	onGroupByExpand?: (
		variables: ICAdvancedFilterRq,
		getColumnOption: (columnName: string) => ICAdvancedFilterColumnRs | undefined,
	) => void;
	dataQueryKey: string[];
	getDataApi?: (
		variables: ICAdvancedFilterRq,
		signal?: AbortSignal,
	) => Promise<AxiosResponse<ICAdvancedFilterRs>>;
	getColumnsApi?: (signal?: AbortSignal) => Promise<AxiosResponse<PaginationRs<ICAdvancedFilterColumnRs>>>;
};

export type ICAdvancedFilterDynamicStoreType = {
	name: string;
	store: StoreApi<ICAdvancedFilterStoreType>;
	types: CyberAssetDetailInventoryType[];
	mainPage: ReactNode;
};
