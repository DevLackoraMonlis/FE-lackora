import { getCyberAssetsChangesFormattedColumns } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.constants";
import type { CyberAssetDetailInventoryProps } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { getChangeColumns, getChanges } from "@/http/generated/change-management";
import type {
	AdvanceFilterRequestModel,
	ChangeDataAdvanceFilterRequestModelAction,
	EachAdvanceFilterConditionOperator,
	EachAdvanceFilterConditionValue,
} from "@/http/generated/models";
import ICAdvancedFilter from "@/shared/components/infraComponents/ICAdvancedFilter";
import {
	convertICAdvancedFilterResponseColumns,
	convertICAdvancedFilterToDefaultVariables,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.helper";
import { createDynamicICAdvancedStore } from "@/shared/components/infraComponents/ICAdvancedFilter/index.store";
import type { ICAdvancedFilterDataRs } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import type { LabelValueType } from "@/shared/lib/general-types";
import { Box, Flex, SegmentedControl } from "@mantine/core";
import { useEffect, useMemo, useRef, useState } from "react";

export default function CyberAssetDetailChanges(props: CyberAssetDetailInventoryProps) {
	const [status, setStatus] = useState<string>("");

	const store = useRef(createDynamicICAdvancedStore());

	const statues: LabelValueType[] = useMemo(
		() => [
			{
				label: "All Changes",
				value: "all",
			},
			{
				label: "Modify Changes",
				value: "modify",
			},
			{
				label: "Add Changes",
				value: "add",
			},
			{
				label: "Delete Changes",
				value: "delete",
			},
		],
		[],
	);

	useEffect(() => {
		if (statues.length && !status) {
			setStatus(statues[0].value);
		}
	}, [statues]);

	return (
		<Box p={"sm"} w={"100%"}>
			<Flex align={"center"} justify={"center"} w={"100%"}>
				<SegmentedControl size={"xs"} value={status} onChange={setStatus} data={statues} />
			</Flex>
			<ICAdvancedFilter<ICAdvancedFilterDataRs>
				hideManageColumnButton
				hideCollapseButton
				hideColumnMenu
				hideCellMenu
				hideConditionSection
				hideExpandGroupByButton
				tableMinusHeight={160}
				{...(props.id && {
					getColumnsApi: (signal) =>
						getChangeColumns(signal).then((response) => convertICAdvancedFilterResponseColumns(response)),
				})}
				{...(props.id && {
					getDataApi: (variables, signal) =>
						getChanges(
							{
								...convertICAdvancedFilterToDefaultVariables<
									EachAdvanceFilterConditionOperator,
									EachAdvanceFilterConditionValue,
									AdvanceFilterRequestModel
								>(variables),
								asset_id: props.id || "",
								action: status as ChangeDataAdvanceFilterRequestModelAction,
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
				columnsQueryKey={["cyber-assets-changes-columns"]}
				dataQueryKey={["cyber-assets-changes-data", status]}
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
