import type { TanStackDataTableColumnColDef } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import ICAdvancedFilterGridColumnSort from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid/ICAdvancedFilterGridColumn/ICAdvancedFilterGridColumnSort";
import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Flex, Text } from "@mantine/core";
import type { ReactNode } from "react";

type Props<T> = {
	column: TanStackDataTableColumnColDef<T>;
	store: ICAdvancedFilterProps<T>["store"];
	allColumns: ICAdvancedFilterProps<T>["allColumns"];
};

export default function ICAdvancedFilterGridColumn<T>(props: Props<T>) {
	return (
		<Flex>
			<Text fw={"bold"}>{props.column.title as ReactNode}</Text>
			<Flex>
				<ICAdvancedFilterGridColumnSort
					column={props.column}
					store={props.store}
					allColumns={props.allColumns}
				/>
			</Flex>
		</Flex>
	);
}
