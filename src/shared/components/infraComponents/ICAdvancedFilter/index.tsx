import type { TanStackDataTableColumnColDef } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import ICAdvancedFilterConditionSection from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionSection";
import ICAdvancedFilterFullScreenModal from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterFullScreenModal";
import ICAdvancedFilterGrid from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid";
import ICAdvancedFilterTopSection from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterTopSection";
import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Collapse, Flex } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

export default function ICAdvancedFilter<T>(
	props: Omit<ICAdvancedFilterProps<T>, "run" | "allColumns" | "data" | "isLoading">,
) {
	const queryClient = useQueryClient();

	const { ref, height } = useElementSize();
	const store = useStore(
		props.store,
		useShallow((state) => ({
			setVariables: state.setVariables,
			variables: state.variables,
			openedConditionSection: state.openedConditionSection,
			openedFullScreenModal: state.openedFullScreenModal,
			setOpenFullScreenModal: state.setOpenFullScreenModal,
			setColumns: state.setColumns,
		})),
	);

	const state = queryClient.getQueryState(["get-advanced-filter-data", props.dataQueryKey]);

	const hasEverFetched =
		(state?.dataUpdatedAt || 0) > 0 || state?.status === "success" || state?.status === "error";

	console.log(state, "sttr");
	console.log(hasEverFetched, "hasEverFetched");

	const useGetColumnsQuery = useQuery({
		queryKey: ["get-columns", props.columnsQueryKey],
		queryFn: ({ signal }) => props.getColumnsApi(signal),
		staleTime: 5 * 60 * 1000,
	});

	const useGetDataQuery = useQuery({
		queryKey: ["get-advanced-filter-data", props.dataQueryKey, store.variables.columns.length],
		queryFn: ({ signal }) => props.getDataApi(store.variables, signal),
		enabled: !!store.variables.columns.length && !hasEverFetched,
	});

	const allColumns = useGetColumnsQuery.data?.data.results || [];
	const data = useGetDataQuery.data?.data.results || [];

	const isLoading = useGetDataQuery.isFetching || useGetColumnsQuery.isFetching;

	const topSection = (
		<ICAdvancedFilterTopSection
			store={props.store}
			leftSection={props.leftSection}
			run={useGetDataQuery.refetch}
			data={data}
			getDataApi={props.getDataApi}
			searchInputItems={props.searchInputItems}
			searchInputPlaceholder={props.searchInputPlaceholder}
		/>
	);

	const conditionSection = (
		<Collapse transitionDuration={500} transitionTimingFunction="linear" in={store.openedConditionSection}>
			<ICAdvancedFilterConditionSection ref={ref} store={props.store} />
		</Collapse>
	);

	const gridSection = (
		<ICAdvancedFilterGrid<Record<string, unknown>>
			excludeColumns={props.excludeColumns}
			height={props.height - (store.openedConditionSection ? height : 0)}
			idAccessor={props.idAccessor}
			store={props.store}
			data={data}
			isLoading={isLoading}
			columns={props.columns as TanStackDataTableColumnColDef<Record<string, unknown>>[]}
			allColumns={allColumns}
			totalRecords={props.totalRecords}
			run={useGetDataQuery.refetch}
			minColumnSize={props.minColumnSize}
			recordsPerPageOptions={props.recordsPerPageOptions}
		/>
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

	return (
		<Flex direction={"column"} w={"100%"}>
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
