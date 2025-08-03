import { getCyberAssetsInventoryFormattedColumns } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.constants";
import { getAssetInventoryData, getInventoryFilterColumns } from "@/http/generated/inventory-management";
import type { EachAdvanceFilterConditionOperator } from "@/http/generated/models";
import ICAdvancedFilter from "@/shared/components/infraComponents/ICAdvancedFilter";
import type {
	ICAdvancedFilterColumnRs,
	ICAdvancedFilterColumnType,
	ICAdvancedFilterDataRs,
	ICAdvancedFilterStoreType,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import type { LabelValueType } from "@/shared/lib/general-types";
import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import type { StoreApi } from "zustand/index";

type Props = {
	type: string;
	items: LabelValueType[];
	store?: StoreApi<ICAdvancedFilterStoreType>;
	id?: string;
};

export default function CyberAssetDetailInventoryDynamicGrid(props: Props) {
	const [selectedItem, setSelectedItem] = useState<string | null>(null);

	if (!props.store) {
		return null;
	}

	useEffect(() => {
		if (props.items.length && !selectedItem) {
			setSelectedItem(props.items[0].value);
		}
	}, [props.items]);

	return (
		<ICAdvancedFilter<ICAdvancedFilterDataRs>
			hideManageColumnButton
			hideCollapseButton
			hideColumnMenu
			hideCellMenu
			hideConditionSection
			hideExpandGroupByButton
			tableMinusHeight={160}
			{...(selectedItem && {
				getColumnsApi: (signal) =>
					getInventoryFilterColumns(selectedItem || "", signal).then((response) => ({
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
					})),
			})}
			getDataApi={(variables, signal) =>
				getAssetInventoryData(
					selectedItem || "",
					{
						asset_id: props.id || "",
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
			columnsQueryKey={["cyber-assets-inventory-columns"]}
			dataQueryKey={["cyber-assets-inventory-data", selectedItem || "", props.type]}
			fullScreenTitle={"Cyber Asset Inventory"}
			excludeColumns={["id"]}
			store={props.store}
			searchInputPlaceholder={"Search by hostname"}
			columns={getCyberAssetsInventoryFormattedColumns()}
			idAccessor={"id"}
			minColumnSize={180}
			defaultColumnSize={200}
			leftSection={
				<Select value={selectedItem} onChange={setSelectedItem} allowDeselect={false} data={props.items} />
			}
		/>
	);
}
