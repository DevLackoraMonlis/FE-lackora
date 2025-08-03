import { getCyberAssetsChangesFormattedColumns } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.constants";
import type { CyberAssetDetailInventoryProps } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import {
	getAssetActivityHistory,
	getCyberAssetHistoryFilterColumns,
} from "@/http/generated/cyber-asset-management-history";
import ICAdvancedFilter from "@/shared/components/infraComponents/ICAdvancedFilter";
import {
	convertICAdvancedFilterResponseColumns,
	convertICAdvancedFilterToDefaultVariables,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.helper";
import { createDynamicICAdvancedStore } from "@/shared/components/infraComponents/ICAdvancedFilter/index.store";
import type { ICAdvancedFilterDataRs } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Box } from "@mantine/core";
import { useRef } from "react";

export default function CyberAssetDetailHistory(props: CyberAssetDetailInventoryProps) {
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
				{...(props.id && {
					getColumnsApi: (signal) =>
						getCyberAssetHistoryFilterColumns(signal).then((response) =>
							convertICAdvancedFilterResponseColumns(response),
						),
				})}
				{...(props.id && {
					getDataApi: (variables, signal) =>
						getAssetActivityHistory(
							{ ...convertICAdvancedFilterToDefaultVariables(variables), asset_id: props.id || "" },
							signal,
						).then((response) => ({
							...response,
							data: {
								...response.data,
								results: response.data.results?.map((item) => item as ICAdvancedFilterDataRs) || [],
							},
						})),
				})}
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
