import CyberAssetsCrudButtons from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetsCrudButtons";
import { getCyberAssetsFormattedColumns } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.constants";
import { getAssetFilterColumns, getAssets } from "@/http/generated/cyber-asset-management-cyber-assets";
import type { EachAdvanceFilterConditionOperator } from "@/http/generated/models";
import BCMultiTabPage from "@/shared/components/baseComponents/BCMultiTabPage";
import type { BCMultiTabPageActions } from "@/shared/components/baseComponents/BCMultiTabPage/index.types";
import ICAdvancedFilter from "@/shared/components/infraComponents/ICAdvancedFilter";
import { createDynamicICAdvancedStore } from "@/shared/components/infraComponents/ICAdvancedFilter/index.store";
import type {
	ICAdvancedFilterColumnRs,
	ICAdvancedFilterColumnType,
	ICAdvancedFilterDataRs,
	ICAdvancedFilterProps,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import type { ICMonoAppPagesDefaultProps } from "@/shared/components/infraComponents/ICMonoMarket/index.types";
import { Text } from "@mantine/core";
import { useRef, useState } from "react";
import { v4 } from "uuid";

type AddNewPageType = Pick<ICAdvancedFilterProps<ICAdvancedFilterDataRs>, "defaultVariables" | "store">;

export default function CyberAssetsLandingPage(props: ICMonoAppPagesDefaultProps) {
	const [total, setTotal] = useState(0);
	const ref = useRef<BCMultiTabPageActions<AddNewPageType> | null>(null);

	return (
		<BCMultiTabPage<AddNewPageType>
			subTitle={<Text mt={"2xs"} c={"gray.7"} fz={"xs"}>{`(Result for last Scan: ${total})`}</Text>}
			staticPageTitle={"All Assets"}
			ref={ref}
			title={"Cyber Assets"}
			mainPage={(values) => (
				<ICAdvancedFilter<ICAdvancedFilterDataRs>
					tableMinusHeight={100}
					onChangeTotalRecords={setTotal}
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
					columnsQueryKey={["cyber-assets-columns"]}
					dataQueryKey={["cyber-asset-data", v4()]}
					fullScreenTitle={"Cyber Assets"}
					excludeColumns={["id", "classification", "has_related_ip"]}
					store={values?.params?.store || createDynamicICAdvancedStore()}
					searchInputPlaceholder={"Search by hostname"}
					columns={getCyberAssetsFormattedColumns(props.appName, props.moduleName)}
					idAccessor={"id"}
					minColumnSize={180}
					defaultColumnSize={200}
					onGroupByExpand={(variables, getColumnOption) => {
						ref.current?.addNewPage(
							`Group by ${variables.conditions.map((item) => getColumnOption(item.columnName)?.displayName || item.columnName).join(",")}`,
							{
								store: createDynamicICAdvancedStore(),
								defaultVariables: variables,
							},
						);
					}}
					leftSection={
						<CyberAssetsCrudButtons
							onDelete={() => {
								console.log("delete");
							}}
							onEdit={() => {
								console.log("edit");
							}}
							onNew={() => {
								console.log("edit");
							}}
						/>
					}
					defaultVariables={values?.params?.defaultVariables}
				/>
			)}
		/>
	);
}
