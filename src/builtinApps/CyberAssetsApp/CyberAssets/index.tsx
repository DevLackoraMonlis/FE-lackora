import CyberAssetsCrudButtons from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetsCrudButtons";
import { CYBER_ASSETS_FORMATTED_COLUMNS } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.constants";
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
import { Text } from "@mantine/core";
import { useRef } from "react";
import { v4 } from "uuid";

type AddNewPageType = Pick<ICAdvancedFilterProps<ICAdvancedFilterDataRs>, "defaultVariables" | "store">;

export default function CyberAssetsLandingPage() {
	const ref = useRef<BCMultiTabPageActions<AddNewPageType> | null>(null);
	const totalAssets = 2500;

	return (
		<BCMultiTabPage<AddNewPageType>
			subTitle={<Text c={"gray.7"} fz={"xs"}>{`(Result for last Scan: ${totalAssets})`}</Text>}
			staticPageTitle={"All Assets"}
			ref={ref}
			title={"Cyber Assets"}
			mainPage={({ params, height }) => (
				<ICAdvancedFilter<ICAdvancedFilterDataRs>
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
									display_name: column.name,
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
											column: variables.groupBy.column,
											display_name: variables.groupBy.displayName,
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
					columnsQueryKey={"cyber-assets-columns"}
					dataQueryKey={`cyber-asset-data-${v4()}`}
					fullScreenTitle={"Cyber Assets"}
					excludeColumns={["id", "classification", "related_ip"]}
					store={params?.store || createDynamicICAdvancedStore()}
					searchInputPlaceholder={"Search by hostname"}
					searchInputItems={[
						{
							label: "Host Name",
							value: "hostname",
						},
					]}
					columns={CYBER_ASSETS_FORMATTED_COLUMNS}
					height={height - 210}
					idAccessor={"id"}
					totalRecords={100}
					minColumnSize={180}
					defaultColumnSize={200}
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
								ref.current?.addNewPage("new Asset", {
									store: createDynamicICAdvancedStore(),
									defaultVariables: {
										page: 1,
										limit: 1000,
										columns: [],
										search: {
											value: "morteza for test default",
											columnName: "",
										},
										conditions: [
											{
												nextOperator: "and",
												id: "ddsdsds",
												values: [
													{
														label: "test",
														value: "test",
													},
												],
												operator: "!==",
												columnName: "hostname",
												closeBracket: 0,
												openBracket: 0,
											},
										],
									},
								});
							}}
						/>
					}
					defaultVariables={params?.defaultVariables}
				/>
			)}
		/>
	);
}
