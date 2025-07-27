import type { TanStackDataTableColumnColDef } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import type { ICAdvancedFilterColumnType } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Flex, Text } from "@mantine/core";

export const IC_ADVANCED_FILTER_DEFAULT_OPERATORS = {
	"=": "equal",
	"!=": "not_equal",
	"==": "==",
	"!==": "!==",
	">": "greater_than",
	">=": "greater_than_or_equal",
	"<": "less_than",
	"<=": "less_than_or_equal",
	"Is Null": "is_null",
	"Is Not Null": "is_not_null",
	"Field Equal": "field_equal",
	"Field Not Equal": "field_not_equal",
	"Field Greater Than": "field_greater_than",
	"Field Less Than": "field_less_than",
	"Field Greater Than Or Equal": "field_greater_than_or_equal",
	"Field Less Than Or Equal": "field_less_than_or_equal",
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
	"Field Like": "field_like",
	"Field Not Like": "field_not_like",
	Contains: "contains",
	"Not Contains": "not_contains",
} as const;

export const IC_ADVANCED_FILTER_INT64_OPERATORS = {
	...IC_ADVANCED_FILTER_DEFAULT_OPERATORS,
} as const;

export const IC_ADVANCED_FILTER_DATE_OPERATORS = {
	...IC_ADVANCED_FILTER_DEFAULT_OPERATORS,
	Like: "like",
	"Not Like": "not_like",
	"Field Like": "field_like",
	"Field Not Like": "field_not_like",
} as const;

export const IC_ADVANCED_FILTER_OPERATORS_MAP: Record<
	Exclude<ICAdvancedFilterColumnType, "Boolean">,
	Record<string, string>
> = {
	Date: IC_ADVANCED_FILTER_DATE_OPERATORS,
	DateTime: IC_ADVANCED_FILTER_DATE_OPERATORS,
	Int64: IC_ADVANCED_FILTER_INT64_OPERATORS,
	IP: IC_ADVANCED_FILTER_INT64_OPERATORS,
	List: IC_ADVANCED_FILTER_STRING_OPERATORS,
	String: IC_ADVANCED_FILTER_STRING_OPERATORS,
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
