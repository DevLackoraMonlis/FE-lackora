import type { TanStackDataTableColumnColDef } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import ICAdvancedFilterConditionModal from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionModal";
import ICAdvancedFilterConditionSectionItems from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionSectionItems";
import ICAdvancedFilterGrid from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid";
import ICAdvancedFilterTopSection from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterTopSection";
import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Flex } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { startTransition, useEffect } from "react";
import { v4 } from "uuid";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

export default function ICAdvancedFilterComponent<T>(
	props: Omit<
		ICAdvancedFilterProps<T>,
		"run" | "allColumns" | "data" | "isLoading" | "totalRecords" | "searchInputItems" | "tableHeight"
	>,
) {
	const { ref: conditionItemsSectionRef, height: conditionItemsSectionHeight } = useElementSize();
	const store = useStore(
		props.store,
		useShallow((state) => ({
			setVariables: state.setVariables,
			setConditions: state.setConditions,
			variablesColumns: state.variables.columns,
			setRunToken: state.setRunToken,
			setPage: state.setPage,
			setColumns: state.setColumns,
		})),
	);

	const useGetColumnsQuery = useQuery({
		queryKey: ["get-columns", ...props.columnsQueryKey],
		queryFn: ({ signal }) => props.getColumnsApi?.(signal),
		staleTime: 20 * 60 * 1000,
	});

	const allColumns = useGetColumnsQuery.data?.data.results || [];
	const isLoading = useGetColumnsQuery.isFetching;

	const run = (disableResetPage = false) => {
		if (!disableResetPage) {
			store.setPage(1);
		}
		startTransition(() => {
			store.setRunToken(v4());
		});
	};

	useEffect(() => {
		if (props.defaultVariables) {
			store.setVariables(props.defaultVariables);
		}
	}, [props.defaultVariables]);

	useEffect(() => {
		if (allColumns.length) {
			store.setColumns(allColumns.filter((column) => column.isDefault));
		}
	}, [allColumns]);

	return (
		<Flex h={"100%"} direction={"column"} w={"100%"}>
			<ICAdvancedFilterTopSection
				hideCollapseButton={props.hideCollapseButton}
				hideManageColumnButton={props.hideManageColumnButton}
				allColumns={allColumns}
				store={props.store}
				leftSection={props.leftSection}
				run={run}
				getDataApi={props.getDataApi}
				searchInputPlaceholder={props.searchInputPlaceholder}
			/>
			<ICAdvancedFilterConditionModal run={run} allColumns={allColumns} store={props.store} />
			<ICAdvancedFilterConditionSectionItems
				hideConditionSection={props.hideConditionSection}
				run={run}
				allColumns={allColumns}
				ref={conditionItemsSectionRef}
				store={props.store}
			/>
			<ICAdvancedFilterGrid<Record<string, unknown>>
				conditionItemsSectionHeight={conditionItemsSectionHeight}
				tableMinusHeight={props.tableMinusHeight}
				defaultColumnSize={props.defaultColumnSize}
				hideColumnMenu={props.hideColumnMenu}
				hideCellMenu={props.hideCellMenu}
				hideExpandGroupByButton={props.hideExpandGroupByButton}
				onGroupByExpand={props.onGroupByExpand}
				excludeColumns={props.excludeColumns}
				idAccessor={props.idAccessor}
				store={props.store}
				isLoading={isLoading}
				columns={props.columns as TanStackDataTableColumnColDef<Record<string, unknown>>[]}
				allColumns={allColumns}
				run={run}
				minColumnSize={props.minColumnSize}
				recordsPerPageOptions={props.recordsPerPageOptions}
				onChangeTotalRecords={props.onChangeTotalRecords}
				getDataApi={props.getDataApi}
				dataQueryKey={props.dataQueryKey}
			/>
		</Flex>
	);
}
