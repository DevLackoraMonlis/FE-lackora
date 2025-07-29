import ICAdvancedFilterActionButtons from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterActionButtons";
import ICAdvancedFilterCollapseButton from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterCollapseButton";
import ICAdvancedFilterSearch from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterSearch";
import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Flex, ScrollArea } from "@mantine/core";

type Props<T> = {
	leftSection: ICAdvancedFilterProps<T>["leftSection"];
	searchInputPlaceholder: ICAdvancedFilterProps<T>["searchInputPlaceholder"];
	searchInputItems: ICAdvancedFilterProps<T>["searchInputItems"];
	store: ICAdvancedFilterProps<T>["store"];
	run: ICAdvancedFilterProps<T>["run"];
	data: ICAdvancedFilterProps<T>["data"];
	getDataApi: ICAdvancedFilterProps<T>["getDataApi"];
	allColumns: ICAdvancedFilterProps<T>["allColumns"];
	hideManageColumnButton: ICAdvancedFilterProps<T>["hideManageColumnButton"];
	hideCollapseButton: ICAdvancedFilterProps<T>["hideCollapseButton"];
};

export default function ICAdvancedFilterTopSection<T>(props: Props<T>) {
	return (
		<ScrollArea scrollbars={"x"} scrollbarSize={2} w={"100%"}>
			<Flex align={"center"} justify={"space-between"} py={"xs"}>
				{props.leftSection}
				<Flex pl={"xs"} align={"center"} gap={"xs"}>
					<ICAdvancedFilterSearch
						allColumns={props.allColumns}
						searchInputPlaceholder={props.searchInputPlaceholder}
						searchInputItems={props.searchInputItems}
						store={props.store}
						run={props.run}
					/>
					{!props.hideCollapseButton && <ICAdvancedFilterCollapseButton store={props.store} />}
					<ICAdvancedFilterActionButtons
						hideManageColumnButton={props.hideManageColumnButton}
						data={props.data}
						getDataApi={props.getDataApi}
						store={props.store}
						run={props.run}
					/>
				</Flex>
			</Flex>
		</ScrollArea>
	);
}
