import ICAdvancedFilterGridColumnMenu from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid/ICAdvancedFilterGridColumn/ICAdvancedFilterGridColumnMenu";
import ICAdvancedFilterGridColumnSort from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid/ICAdvancedFilterGridColumn/ICAdvancedFilterGridColumnSort";
import type {
	ICAdvancedFilterColumnRs,
	ICAdvancedFilterGroupByRq,
	ICAdvancedFilterProps,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Flex, Text, Tooltip } from "@mantine/core";

type Props<T> = {
	columnName: string;
	store: ICAdvancedFilterProps<T>["store"];
	allColumns: ICAdvancedFilterProps<T>["allColumns"];
	run: ICAdvancedFilterProps<T>["run"];
	hideColumnMenu: ICAdvancedFilterProps<T>["hideColumnMenu"];
	onCopy: VoidFunction;
	columnOption?: ICAdvancedFilterColumnRs;
	groupBy?: ICAdvancedFilterGroupByRq;
};

export default function ICAdvancedFilterGridColumn<T>(props: Props<T>) {
	let columnTitle = props.columnOption?.displayName || props.columnName;

	if (props.groupBy && !props.columnOption) {
		columnTitle = `${props.columnName} (${props.groupBy?.column})`;
	}

	return (
		<Flex px={"xs"} justify={"space-between"} align={"center"} pos={"relative"}>
			<Tooltip label={columnTitle}>
				<Text w={"75%"} truncate={"end"} fw={"bold"}>
					{columnTitle}
				</Text>
			</Tooltip>
			<Flex align={"center"} pos={"absolute"} right={0} top={-2}>
				<ICAdvancedFilterGridColumnSort
					visibleParent={true}
					columnName={props.columnName}
					store={props.store}
					allColumns={props.allColumns}
					run={props.run}
				/>
				{!props.hideColumnMenu && (
					<ICAdvancedFilterGridColumnMenu
						columnLabel={columnTitle}
						onCopy={props.onCopy}
						visibleParent={true}
						columnName={props.columnName}
						store={props.store}
						allColumns={props.allColumns}
						run={props.run}
					/>
				)}
			</Flex>
		</Flex>
	);
}
