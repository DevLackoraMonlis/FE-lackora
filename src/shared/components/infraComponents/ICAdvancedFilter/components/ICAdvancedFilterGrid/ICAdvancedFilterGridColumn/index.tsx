import ICAdvancedFilterGridColumnMenu from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid/ICAdvancedFilterGridColumn/ICAdvancedFilterGridColumnMenu";
import ICAdvancedFilterGridColumnSort from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid/ICAdvancedFilterGridColumn/ICAdvancedFilterGridColumnSort";
import type {
	ICAdvancedFilterColumnRs,
	ICAdvancedFilterGroupByRq,
	ICAdvancedFilterProps,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

type Props<T> = {
	columnName: string;
	store: ICAdvancedFilterProps<T>["store"];
	allColumns: ICAdvancedFilterProps<T>["allColumns"];
	run: ICAdvancedFilterProps<T>["run"];
	onCopy: VoidFunction;
	columnOption?: ICAdvancedFilterColumnRs;
	groupBy?: ICAdvancedFilterGroupByRq;
};

export default function ICAdvancedFilterGridColumn<T>(props: Props<T>) {
	const [opened, handlers] = useDisclosure(false);
	let columnTitle = props.columnOption?.displayName || props.columnName;

	if (props.groupBy && !props.columnOption) {
		columnTitle = `${props.columnName} (${props.groupBy?.column})`;
	}

	return (
		<Flex
			px={"xs"}
			justify={"space-between"}
			align={"center"}
			onMouseEnter={handlers.open}
			onMouseLeave={handlers.close}
			pos={"relative"}
		>
			<Text fw={"bold"}>{columnTitle}</Text>
			<Flex align={"center"} pos={"absolute"} right={0} top={-2}>
				<ICAdvancedFilterGridColumnSort
					visibleParent={opened}
					columnName={props.columnName}
					store={props.store}
					allColumns={props.allColumns}
				/>
				<ICAdvancedFilterGridColumnMenu
					columnLabel={columnTitle}
					onCopy={props.onCopy}
					visibleParent={opened}
					columnName={props.columnName}
					store={props.store}
					allColumns={props.allColumns}
					run={props.run}
				/>
			</Flex>
		</Flex>
	);
}
