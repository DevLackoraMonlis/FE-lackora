import { getCyberAssetsChangesFormattedColumns } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.constants";
import type { CyberAssetDetailInventoryProps } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { getAssetFilterColumns, getAssets } from "@/http/generated/cyber-asset-management-cyber-assets";
import type { EachAdvanceFilterConditionOperator } from "@/http/generated/models";
import ICAdvancedFilter from "@/shared/components/infraComponents/ICAdvancedFilter";
import { createDynamicICAdvancedStore } from "@/shared/components/infraComponents/ICAdvancedFilter/index.store";
import type {
	ICAdvancedFilterColumnRs,
	ICAdvancedFilterColumnType,
	ICAdvancedFilterDataRs,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Box } from "@mantine/core";
import { useRef } from "react";

export default function CyberAssetDetailHistory(_props: CyberAssetDetailInventoryProps) {
	const store = useRef(createDynamicICAdvancedStore());

	return (
		<Box p={"sm"} w={"100%"}>
			<ICAdvancedFilter<ICAdvancedFilterDataRs>
				hideManageColumnButton
				hideCollapseButton
				hideColumnMenu
				hideCellMenu
				hideConditionSection
				hideExpandGroupByButton
				tableMinusHeight={130}
				getColumnsApi={(signal) =>
					getAssetFilterColumns(signal).then((response) => ({
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
					}))
				}
				getDataApi={(variables, signal) =>
					getAssets(
						{
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
						},
						signal,
					).then((response) => ({
						...response,
						data: {
							...response.data,
							results: response.data.results?.map((item) => item as ICAdvancedFilterDataRs) || [],
						},
					}))
				}
				columnsQueryKey={["cyber-assets-changes-columns"]}
				dataQueryKey={["cyber-assets-histories-data"]}
				fullScreenTitle={"Cyber Asset Inventory"}
				excludeColumns={["id"]}
				store={store.current}
				searchInputPlaceholder={"Search by hostname"}
				columns={getCyberAssetsChangesFormattedColumns()}
				idAccessor={"id"}
				minColumnSize={180}
				defaultColumnSize={200}
			/>
		</Box>
	);
}
