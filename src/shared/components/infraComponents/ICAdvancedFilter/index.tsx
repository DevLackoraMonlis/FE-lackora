import type { TanStackDataTableColumnColDef } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import ICAdvancedFilterConditionSection from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionSection";
import ICAdvancedFilterFullScreenModal from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterFullScreenModal";
import ICAdvancedFilterGrid from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid";
import ICAdvancedFilterTopSection from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterTopSection";
import { GET_ADVANCED_FILTER_DATA } from "@/shared/components/infraComponents/ICAdvancedFilter/index.constants";
import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Collapse, Flex } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { startTransition, useEffect, useMemo } from "react";
import { v4 } from "uuid";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

export default function ICAdvancedFilter<T>(
	props: Omit<
		ICAdvancedFilterProps<T>,
		"run" | "allColumns" | "data" | "isLoading" | "totalRecords" | "searchInputItems"
	>,
) {
	const queryClient = useQueryClient();
	const { ref, height } = useElementSize();
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

	const allColumns = useGetColumnsQuery.data?.data.results || [];
	const data = useGetDataQuery.data?.data.results || [];
	const totalRecords = useGetDataQuery.data?.data.total || 0;
	const total = useGetDataQuery.data?.data?.metadata?.total;
	const searchInputItems = allColumns.map((item) => ({ label: item.displayName, value: item.name }));
	const isLoading = useGetDataQuery.isFetching || useGetColumnsQuery.isFetching;

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

	const conditionSection = useMemo(
		() => (
			<Collapse transitionDuration={500} transitionTimingFunction="linear" in={store.openedConditionSection}>
				<ICAdvancedFilterConditionSection run={run} allColumns={allColumns} ref={ref} store={props.store} />
			</Collapse>
		),
		[store.openedConditionSection, props.store],
	);

	const gridSection = useMemo(
		() => (
			<ICAdvancedFilterGrid<Record<string, unknown>>
				onGroupByExpand={props.onGroupByExpand}
				excludeColumns={props.excludeColumns}
				tableHeight={props.tableHeight - (store.openedConditionSection ? height : 0)}
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
			height,
			props.excludeColumns,
			props.tableHeight,
			store.openedConditionSection,
			props.idAccessor,
			props.store,
			data,
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
					{conditionSection}
					{gridSection}
				</Flex>
			</ICAdvancedFilterFullScreenModal>
			{topSection}
			{conditionSection}
			{gridSection}
		</Flex>
	);
}
