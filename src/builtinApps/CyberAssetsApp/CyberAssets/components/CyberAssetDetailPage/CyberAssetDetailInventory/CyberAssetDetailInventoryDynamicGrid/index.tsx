import { getCyberAssetsInventoryFormattedColumns } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.constants";
import { getAssetInventoryData, getInventoryFilterColumns } from "@/http/generated/inventory-management";
import type {
	AdvanceFilterRequestModel,
	EachAdvanceFilterConditionOperator,
	EachAdvanceFilterConditionValue,
	EachInventorySubCategory,
} from "@/http/generated/models";
import ICAdvancedFilter from "@/shared/components/infraComponents/ICAdvancedFilter";
import {
	convertICAdvancedFilterResponseColumns,
	convertICAdvancedFilterToDefaultVariables,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.helper";
import type {
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
	defaultItem?: string;
};

export default function CyberAssetDetailInventoryDynamicGrid(props: Props) {
	const [selectedItem, setSelectedItem] = useState<string | null>(null);

	if (!props.store) {
		return null;
	}

	useEffect(() => {
		if (props.items.length && !selectedItem) {
			setSelectedItem(props.defaultItem || props.items[0].value);
		}
	}, [props.items, props.defaultItem]);

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
					getInventoryFilterColumns((selectedItem || "") as EachInventorySubCategory, signal).then(
						(response) => convertICAdvancedFilterResponseColumns(response),
					),
			})}
			{...(selectedItem && {
				getDataApi: (variables, signal) =>
					getAssetInventoryData(
						(selectedItem || "") as EachInventorySubCategory,
						{
							...convertICAdvancedFilterToDefaultVariables<
								EachAdvanceFilterConditionOperator,
								EachAdvanceFilterConditionValue,
								AdvanceFilterRequestModel
							>(variables),
							asset_id: props.id || "",
						},
						signal,
					).then((response) => ({
						...response,
						data: {
							...response.data,
							results: response.data.results?.map((item) => item as ICAdvancedFilterDataRs) || [],
						},
					})),
			})}
			columnsQueryKey={["cyber-assets-inventory-columns", selectedItem || ""]}
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
