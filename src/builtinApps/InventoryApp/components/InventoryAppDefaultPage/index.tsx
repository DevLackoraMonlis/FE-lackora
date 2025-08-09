import { getCyberAssetsInventoryFormattedColumns } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.constants";
import InventoryAppPageWrapper from "@/builtinApps/InventoryApp/components/InventoryAppPageWrapper";
import type { InventoryAppSideCardProps } from "@/builtinApps/InventoryApp/index.types";
import {
	getInventoryData,
	getInventoryFilterColumns,
	useGetInventoryOverview,
} from "@/http/generated/inventory-management";
import type {
	AdvanceFilterRequestModel,
	EachAdvanceFilterConditionOperator,
	EachAdvanceFilterConditionValue,
	EachInventoryCategoryDisplayName,
	EachInventorySubCategory,
} from "@/http/generated/models";
import BCMultiTabPage from "@/shared/components/baseComponents/BCMultiTabPage";
import type { BCMultiTabPageActions } from "@/shared/components/baseComponents/BCMultiTabPage/index.types";
import ICAdvancedFilter from "@/shared/components/infraComponents/ICAdvancedFilter";
import {
	convertICAdvancedFilterResponseColumns,
	convertICAdvancedFilterToDefaultVariables,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.helper";
import { createDynamicICAdvancedStore } from "@/shared/components/infraComponents/ICAdvancedFilter/index.store";
import type { ICAdvancedFilterDataRs } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import type { ICMonoAppPagesDefaultProps } from "@/shared/components/infraComponents/ICMonoMarket/index.types";
import type { AddAdvancedFilterNewPageType } from "@/shared/types/index.types";
import { Text } from "@mantine/core";
import { IconDevices2 } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

export default function InventoryAppDefaultPage(props: ICMonoAppPagesDefaultProps) {
	const [total, setTotal] = useState(0);
	const [selectedInventoryType, setSelectedInventoryType] = useState<string | undefined>();
	const ref = useRef<BCMultiTabPageActions<AddAdvancedFilterNewPageType> | null>(null);

	const getInventoryOverviewQuery = useGetInventoryOverview(
		{ category: props.moduleName as EachInventoryCategoryDisplayName },
		{
			query: {
				enabled: !!props.moduleName,
				select: (response) => {
					const data: Omit<InventoryAppSideCardProps, "isLoading" | "isSelected">[] = response.data.map(
						(item) => {
							const sideCardItem: Omit<InventoryAppSideCardProps, "isLoading" | "isSelected"> = {
								onRedirect: () => setSelectedInventoryType(item.name),
								title: item.display_name,
								icon: <IconDevices2 size={20} color={"blue"} />,
								items: item.overview.map((ov) => ({
									label: ov.split(" ")[0],
									value: ov.split(" ").slice(1).join(" "),
								})),
								name: item.name,
							};
							return sideCardItem;
						},
					);

					return {
						...response,
						data,
					};
				},
			},
		},
	);

	useEffect(() => {
		if (getInventoryOverviewQuery.data?.data?.[0]?.name) {
			setSelectedInventoryType(getInventoryOverviewQuery.data.data[0].name);
		}
	}, [getInventoryOverviewQuery.data?.data?.[0]?.name]);

	return (
		<InventoryAppPageWrapper
			key={props.moduleName}
			selectedInventoryType={selectedInventoryType}
			isLoading={getInventoryOverviewQuery.isFetching}
			title={props.moduleName}
			sideItems={getInventoryOverviewQuery.data?.data || []}
			page={
				selectedInventoryType && (
					<BCMultiTabPage<AddAdvancedFilterNewPageType>
						subTitle={<Text mt={"2xs"} c={"gray.7"} fz={"xs"}>{`(Result for last Scan: ${total})`}</Text>}
						title={props.moduleName || ""}
						staticPageTitle={"All Assets"}
						ref={ref}
						mainPage={(values) => (
							<ICAdvancedFilter<ICAdvancedFilterDataRs>
								tableMinusHeight={100}
								onChangeTotalRecords={setTotal}
								getColumnsApi={(signal) =>
									getInventoryFilterColumns(selectedInventoryType as EachInventorySubCategory, signal).then(
										(response) => convertICAdvancedFilterResponseColumns(response),
									)
								}
								getDataApi={(variables, signal) =>
									getInventoryData(
										selectedInventoryType as EachInventorySubCategory,
										convertICAdvancedFilterToDefaultVariables<
											EachAdvanceFilterConditionOperator,
											EachAdvanceFilterConditionValue,
											AdvanceFilterRequestModel
										>(variables),
										signal,
									).then((response) => ({
										...response,
										data: {
											...response.data,
											results: response.data.results?.map((item) => item as ICAdvancedFilterDataRs) || [],
										},
									}))
								}
								columnsQueryKey={["inventory-columns", props.moduleName || "", selectedInventoryType || ""]}
								dataQueryKey={["inventory-data", props.moduleName || "", selectedInventoryType || ""]}
								fullScreenTitle={selectedInventoryType || ""}
								excludeColumns={["id", "classification", "has_related_ip"]}
								store={values?.params?.store || createDynamicICAdvancedStore()}
								searchInputPlaceholder={"Search by hostname"}
								columns={getCyberAssetsInventoryFormattedColumns()}
								idAccessor={"id"}
								minColumnSize={180}
								defaultColumnSize={200}
								onGroupByExpand={(variables, getColumnOption) => {
									ref.current?.addNewPage(
										`Group by ${variables.conditions.map((item) => getColumnOption(item.columnName || "")?.displayName || item.columnName).join(",")}`,
										{
											store: createDynamicICAdvancedStore(),
											defaultVariables: variables,
										},
									);
								}}
								defaultVariables={values?.params?.defaultVariables}
							/>
						)}
					/>
				)
			}
		/>
	);
}
