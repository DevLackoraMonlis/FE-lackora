import type { TanStackDataTableColumnColDef } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import ICAdvancedFilterConditionSection from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionSection";
import ICAdvancedFilterConditionSectionItems from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionSectionItems";
import ICAdvancedFilterFullScreenModal from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterFullScreenModal";
import ICAdvancedFilterGrid from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid";
import ICAdvancedFilterTopSection from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterTopSection";
import { GET_ADVANCED_FILTER_DATA } from "@/shared/components/infraComponents/ICAdvancedFilter/index.constants";
import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Flex } from "@mantine/core";
import { useElementSize, useViewportSize } from "@mantine/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { startTransition, useEffect, useMemo } from "react";
import { v4 } from "uuid";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

export default function ICAdvancedFilter<T>(
	props: Omit<
		ICAdvancedFilterProps<T>,
		"run" | "allColumns" | "data" | "isLoading" | "totalRecords" | "searchInputItems" | "tableHeight"
	>,
) {
	const queryClient = useQueryClient();
	const { height } = useViewportSize();
	const { ref: conditionFixedSectionRef, height: conditionFixedSectionHeight } = useElementSize();
	const { ref: conditionItemsSectionRef, height: conditionItemsSectionHeight } = useElementSize();
	const store = useStore(
		props.store,
		useShallow((state) => ({
			setVariables: state.setVariables,
			variables: state.variables,
			runToken: state.runToken,
			setRunToken: state.setRunToken,
			setPage: state.setPage,
			openedConditionSection: state.openedConditionSection,
			openedFullScreenModal: state.openedFullScreenModal,
			setOpenFullScreenModal: state.setOpenFullScreenModal,
			setColumns: state.setColumns,
		})),
	);

	const getDataQueryKey = [GET_ADVANCED_FILTER_DATA, ...props.dataQueryKey];

	const state = queryClient.getQueryState(getDataQueryKey);

	const hasEverFetched =
		(state?.dataUpdatedAt || 0) > 0 || state?.status === "success" || state?.status === "error";

	const useGetColumnsQuery = useQuery({
		queryKey: ["get-columns", ...props.columnsQueryKey],
		queryFn: ({ signal }) => props.getColumnsApi(signal),
		staleTime: 5 * 60 * 1000,
	});

	const useGetDataQuery = useQuery({
		queryKey: [...getDataQueryKey, store.variables.columns.length, store.runToken],
		queryFn: ({ signal }) => props.getDataApi(store.variables, signal),
		enabled: !!store.variables.columns.length && !hasEverFetched,
	});

	const fixedTopSectionHeight = 110;
	const allColumns = useGetColumnsQuery.data?.data.results || [];
	const data = useGetDataQuery.data?.data.results || [];
	const totalRecords = useGetDataQuery.data?.data.total || 0;
	const total = useGetDataQuery.data?.data?.metadata?.total;
	const searchInputItems = allColumns.map((item) => ({ label: item.displayName, value: item.name }));
	const isLoading = useGetDataQuery.isFetching || useGetColumnsQuery.isFetching;
	const conditionFixedHeight = store.openedConditionSection ? conditionFixedSectionHeight : 0;
	const conditionItemsHeight =
		store.variables.conditions.length || store.variables.groupBy ? conditionItemsSectionHeight + 10 : 0;

	const run = (disableResetPage = false) => {
		if (!disableResetPage) {
			store.setPage(1);
		}
		startTransition(() => {
			store.setRunToken(v4());
		});
	};

	const topSection = useMemo(
		() => (
			<ICAdvancedFilterTopSection
				allColumns={allColumns}
				store={props.store}
				leftSection={props.leftSection}
				run={run}
				data={data}
				getDataApi={props.getDataApi}
				searchInputItems={searchInputItems}
				searchInputPlaceholder={props.searchInputPlaceholder}
			/>
		),
		[props.store, props.leftSection, data, props.getDataApi, searchInputItems, props.searchInputPlaceholder],
	);

	const conditionFixedSection = useMemo(
		() => (
			<ICAdvancedFilterConditionSection
				run={run}
				allColumns={allColumns}
				ref={conditionFixedSectionRef}
				store={props.store}
			/>
		),
		[props.store, allColumns],
	);

	const conditionItemsSection = useMemo(
		() => (
			<ICAdvancedFilterConditionSectionItems
				run={run}
				allColumns={allColumns}
				ref={conditionItemsSectionRef}
				store={props.store}
			/>
		),
		[props.store, allColumns],
	);

	const gridSection = useMemo(
		() => (
			<ICAdvancedFilterGrid<Record<string, unknown>>
				onGroupByExpand={props.onGroupByExpand}
				excludeColumns={props.excludeColumns}
				tableHeight={
					height -
					fixedTopSectionHeight -
					props.tableMinusHeight -
					conditionFixedHeight -
					conditionItemsHeight
				}
				idAccessor={props.idAccessor}
				store={props.store}
				data={data}
				isLoading={isLoading}
				columns={props.columns as TanStackDataTableColumnColDef<Record<string, unknown>>[]}
				allColumns={allColumns}
				totalRecords={totalRecords}
				run={run}
				minColumnSize={props.minColumnSize}
				recordsPerPageOptions={props.recordsPerPageOptions}
			/>
		),
		[
			conditionFixedHeight,
			conditionItemsHeight,
			props.excludeColumns,
			props.tableMinusHeight,
			store.openedConditionSection,
			props.idAccessor,
			props.store,
			data,
			height,
			isLoading,
			props.columns,
			allColumns,
			totalRecords,
			props.minColumnSize,
			props.recordsPerPageOptions,
		],
	);

	useEffect(() => {
		if (props.defaultVariables) {
			store.setVariables(props.defaultVariables);
		}
	}, [props.defaultVariables]);

	useEffect(() => {
		if (allColumns.length && !store.variables.columns.length) {
			store.setColumns(allColumns.filter((column) => column.isDefault));
		}
	}, [allColumns]);

	useEffect(() => {
		if (total) {
			props.onChangeTotalRecords?.(total);
		}
	}, [total]);

	return (
		<Flex h={"100%"} direction={"column"} w={"100%"}>
			<ICAdvancedFilterFullScreenModal
				title={props.fullScreenTitle}
				onClose={() => store.setOpenFullScreenModal(false)}
				opened={store.openedFullScreenModal}
			>
				<Flex direction={"column"} w={"100%"} p={"xs"}>
					{topSection}
					{conditionFixedSection}
					{conditionItemsSection}
					{gridSection}
				</Flex>
			</ICAdvancedFilterFullScreenModal>
			{topSection}
			{conditionFixedSection}
			{conditionItemsSection}
			{gridSection}
		</Flex>
	);
}
