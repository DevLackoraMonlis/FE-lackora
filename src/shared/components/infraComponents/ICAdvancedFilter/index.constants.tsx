import type { TanStackDataTableColumnColDef } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import type {
	ICAdvancedFilterColumnType,
	ICAdvancedFilterConditionOperator,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Flex, Text } from "@mantine/core";

export const IC_ADVANCED_FILTER_DEFAULT_OPERATORS = {
	"=": "equal",
	"!=": "not_equal",
	"Is Null": "is_null",
	In: "in",
	"Not In": "not_in",
	"Is Not Null": "is_not_null",
} as const;

export const IC_ADVANCED_FILTER_STRING_OPERATORS = {
	...IC_ADVANCED_FILTER_DEFAULT_OPERATORS,
	Like: "like",
	"Not Like": "not_like",
	"Starts With": "start_with",
	"Not Starts With": "not_start_with",
	"Ends With": "end_with",
	"Not Ends With": "not_end_with",
	Regex: "regex",
} as const;

export const IC_ADVANCED_FILTER_INT64_OPERATORS = {
	...IC_ADVANCED_FILTER_DEFAULT_OPERATORS,
	">": "greater_than",
	">=": "greater_than_or_equal",
	"<": "less_than",
	"<=": "less_than_or_equal",
} as const;

export const IC_ADVANCED_FILTER_DATE_OPERATORS = {
	...IC_ADVANCED_FILTER_DEFAULT_OPERATORS,
	Like: "like",
	"Not Like": "not_like",
	"Field Like": "field_like",
	"Field Not Like": "field_not_like",
} as const;

export const IC_ADVANCED_FILTER_OPERATORS_MAP: Record<ICAdvancedFilterColumnType, Record<string, string>> = {
	Date: IC_ADVANCED_FILTER_DATE_OPERATORS,
	DateTime: IC_ADVANCED_FILTER_DATE_OPERATORS,
	Int64: IC_ADVANCED_FILTER_INT64_OPERATORS,
	IP: IC_ADVANCED_FILTER_INT64_OPERATORS,
	List: IC_ADVANCED_FILTER_STRING_OPERATORS,
	String: IC_ADVANCED_FILTER_STRING_OPERATORS,
	Boolean: IC_ADVANCED_FILTER_DEFAULT_OPERATORS,
};

export const ROW_NUMBER_COLUMN: TanStackDataTableColumnColDef<unknown> = {
	accessor: "row-number",
	title: (
		<Flex w="100%" align={"center"} justify={"center"}>
			#
		</Flex>
	),
	render: (_record, _row, rowIndex) => (
		<Flex w="100%" align={"center"} justify={"center"}>
			{rowIndex}
		</Flex>
	),
	width: 50,
};

export const IC_ADVANCED_FILTER_BLANK_TEXT = (
	<Text fz={"xs"} fs={"italic"} c={"gray.5"}>
		BLANK
	</Text>
);

export const GET_ADVANCED_FILTER_DATA = "get-advanced-filter-data";

export const IC_ADVANCED_FILTER_CONDITION_MULTIPLE_VALUE_TYPES: ICAdvancedFilterConditionOperator[] = [
	IC_ADVANCED_FILTER_STRING_OPERATORS["="],
	IC_ADVANCED_FILTER_STRING_OPERATORS["!="],
	IC_ADVANCED_FILTER_STRING_OPERATORS.Like,
	IC_ADVANCED_FILTER_STRING_OPERATORS["Not Like"],
	IC_ADVANCED_FILTER_STRING_OPERATORS["Starts With"],
	IC_ADVANCED_FILTER_STRING_OPERATORS["Ends With"],
	IC_ADVANCED_FILTER_STRING_OPERATORS["Not Ends With"],
	IC_ADVANCED_FILTER_STRING_OPERATORS["Not Starts With"],
	IC_ADVANCED_FILTER_STRING_OPERATORS.Regex,
	IC_ADVANCED_FILTER_STRING_OPERATORS.In,
	IC_ADVANCED_FILTER_STRING_OPERATORS["Not In"],
];

export const IC_ADVANCED_FILTER_CONDITION_EMPTY_OPERATORS: string[] = [
	IC_ADVANCED_FILTER_DEFAULT_OPERATORS["Is Null"],
	IC_ADVANCED_FILTER_DEFAULT_OPERATORS["Is Not Null"],
];

export const IC_ADVANCED_FILTER_CONDITION_BUILDER_DEFAULT_WIDTH = 300;
