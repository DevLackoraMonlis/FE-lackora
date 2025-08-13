import CyberAssetsCrudButtons from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetsCrudButtons";
import { getCyberAssetsFormattedColumns } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.constants";
import { getAssetFilterColumns, getAssets } from "@/http/generated/cyber-asset-management-cyber-assets";
import type {
	AdvanceFilterRequestModel,
	EachAdvanceFilterConditionOperator,
	EachAdvanceFilterConditionValue,
} from "@/http/generated/models";
import BCMultiTabPage from "@/shared/components/baseComponents/BCMultiTabPage";
import type { BCMultiTabPageActions } from "@/shared/components/baseComponents/BCMultiTabPage/index.types";
import ICAdvancedFilter from "@/shared/components/infraComponents/ICAdvancedFilter";
import { IC_ADVANCED_FILTER_STRING_OPERATORS } from "@/shared/components/infraComponents/ICAdvancedFilter/index.constants";
import {
	convertICAdvancedFilterResponseColumns,
	convertICAdvancedFilterToDefaultVariables,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.helper";
import { createDynamicICAdvancedStore } from "@/shared/components/infraComponents/ICAdvancedFilter/index.store";
import type { ICAdvancedFilterDataRs } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import type { ICMonoAppPagesDefaultProps } from "@/shared/components/infraComponents/ICMonoMarket/index.types";
import type { AddAdvancedFilterNewPageType } from "@/shared/types/index.types";
import { Flex, Loader, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { v4 } from "uuid";

export default function CyberAssetsLandingPage(props: ICMonoAppPagesDefaultProps) {
	const [total, setTotal] = useState(0);
	const ref = useRef<BCMultiTabPageActions<AddAdvancedFilterNewPageType> | null>(null);

	const getDefaultAllColumnsQuery = useQuery({
		queryKey: ["get-columns", "cyber-assets-columns"],
		queryFn: ({ signal }) =>
			getAssetFilterColumns(signal).then((response) => convertICAdvancedFilterResponseColumns(response)),
		staleTime: 20 * 60 * 1000,
	});

	if (!getDefaultAllColumnsQuery.data) {
		return (
			<Flex w={"100%"} h={"100%"}>
				<Loader />
			</Flex>
		);
	}

	return (
		<BCMultiTabPage<AddAdvancedFilterNewPageType>
			subTitle={<Text mt={"2xs"} c={"gray.7"} fz={"xs"}>{`(Result for last Scan: ${total})`}</Text>}
			staticPageTitle={"All Assets"}
			ref={ref}
			title={"Cyber Assets"}
			mainPage={(values) => (
				<ICAdvancedFilter<ICAdvancedFilterDataRs>
					tableMinusHeight={100}
					onChangeTotalRecords={setTotal}
					getColumnsApi={(signal) =>
						getAssetFilterColumns(signal).then((response) => convertICAdvancedFilterResponseColumns(response))
					}
					getDataApi={(variables, signal) =>
						getAssets(
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
					columnsQueryKey={["cyber-assets-columns"]}
					dataQueryKey={["cyber-asset-data", v4()]}
					fullScreenTitle={"Cyber Assets"}
					excludeColumns={["id", "classification", "has_related_ip", "is_associated"]}
					store={values?.params?.store || createDynamicICAdvancedStore()}
					searchInputPlaceholder={"Search by hostname"}
					columns={getCyberAssetsFormattedColumns(props.appName, props.moduleName, (record) => {
						ref.current?.addNewPage("Associated Assets", {
							store: createDynamicICAdvancedStore(),
							defaultVariables: {
								search: {
									columnName: "",
									value: "",
								},
								page: 1,
								limit: 35,
								columns: getDefaultAllColumnsQuery.data.data.results,
								conditions: [
									{
										nextOperator: "and",
										values: [{ label: record.primary_ip, value: record.primary_ip }],
										openBracket: 0,
										closeBracket: 0,
										id: v4(),
										operator: IC_ADVANCED_FILTER_STRING_OPERATORS["="],
										columnName: "related_to",
									},
								],
							},
						});
					})}
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
