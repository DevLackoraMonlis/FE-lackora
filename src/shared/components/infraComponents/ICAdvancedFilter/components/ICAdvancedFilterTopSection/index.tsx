import ICAdvancedFilterActionButtons from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterActionButtons";
import ICAdvancedFilterCollapseButton from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterCollapseButton";
import ICAdvancedFilterSearch from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterSearch";
import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Flex, ScrollArea } from "@mantine/core";
import { useMemo } from "react";

type Props<T> = {
	leftSection: ICAdvancedFilterProps<T>["leftSection"];
	searchInputPlaceholder: ICAdvancedFilterProps<T>["searchInputPlaceholder"];
	store: ICAdvancedFilterProps<T>["store"];
	run: ICAdvancedFilterProps<T>["run"];
	getDataApi: ICAdvancedFilterProps<T>["getDataApi"];
	allColumns: ICAdvancedFilterProps<T>["allColumns"];
	hideManageColumnButton: ICAdvancedFilterProps<T>["hideManageColumnButton"];
	hideCollapseButton: ICAdvancedFilterProps<T>["hideCollapseButton"];
};

export default function ICAdvancedFilterTopSection<T>(props: Props<T>) {
	const searchInputItems = props.allColumns.map((item) => ({ label: item.displayName, value: item.name }));

	const search = useMemo(
		() => (
			<ICAdvancedFilterSearch
				allColumns={props.allColumns}
				searchInputPlaceholder={props.searchInputPlaceholder}
				searchInputItems={searchInputItems}
				store={props.store}
				run={props.run}
			/>
		),
		[props.allColumns, props.searchInputPlaceholder, searchInputItems, props.store, props.run],
	);

	const actionButtons = useMemo(
		() => (
			<ICAdvancedFilterActionButtons
				hideManageColumnButton={props.hideManageColumnButton}
				getDataApi={props.getDataApi}
				store={props.store}
				run={props.run}
			/>
		),
		[props.hideManageColumnButton, props.getDataApi, props.store, props.run],
	);

	return (
		<ScrollArea scrollbars={"x"} scrollbarSize={2} w={"100%"}>
			<Flex align={"center"} justify={"space-between"} py={"xs"}>
				{props.leftSection ? (
					<>
						{props.leftSection}
						<Flex pl={"xs"} align={"center"} gap={"xs"}>
							{search}
							{!props.hideCollapseButton && (
								<ICAdvancedFilterCollapseButton
									allColumns={props.allColumns}
									run={props.run}
									store={props.store}
								/>
							)}
							{actionButtons}
						</Flex>
					</>
				) : (
					<>
						{search}
						<Flex pl={"xs"} align={"center"} gap={"xs"}>
							{!props.hideCollapseButton && (
								<ICAdvancedFilterCollapseButton
									allColumns={props.allColumns}
									run={props.run}
									store={props.store}
								/>
							)}
							{actionButtons}
						</Flex>
					</>
				)}
			</Flex>
		</ScrollArea>
	);
}
