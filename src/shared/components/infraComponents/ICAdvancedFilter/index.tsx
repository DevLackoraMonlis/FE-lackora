import ICAdvancedFilterConditionSection from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionSection";
import ICAdvancedFilterFullScreenModal from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterFullScreenModal";
import ICAdvancedFilterGrid from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid";
import ICAdvancedFilterTopSection from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterTopSection";
import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Collapse, Flex } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useEffect } from "react";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

export default function ICAdvancedFilter<T extends Record<string, unknown>>(props: ICAdvancedFilterProps<T>) {
	const { ref, height } = useElementSize();
	const store = useStore(
		props.store,
		useShallow((state) => ({
			setVariables: state.setVariables,
			openedConditionSection: state.openedConditionSection,
			openedFullScreenModal: state.openedFullScreenModal,
			setOpenFullScreenModal: state.setOpenFullScreenModal,
		})),
	);

	const topSection = (
		<ICAdvancedFilterTopSection
			store={props.store}
			leftSection={props.leftSection}
			run={props.run}
			data={props.data}
			exportDataApi={props.exportDataApi}
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
		<ICAdvancedFilterGrid<T>
			excludeColumns={props.excludeColumns}
			height={props.height - (store.openedConditionSection ? height : 0)}
			idAccessor={props.idAccessor}
			store={props.store}
			data={props.data}
			isLoading={props.isLoading}
			columns={props.columns}
			allColumns={props.allColumns}
			totalRecords={props.totalRecords}
			run={props.run}
			minColumnSize={props.minColumnSize}
			recordsPerPageOptions={props.recordsPerPageOptions}
		/>
	);

	useEffect(() => {
		if (props.defaultVariables) {
			store.setVariables(props.defaultVariables);
		}
	}, [props.defaultVariables]);

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
