import ICAdvancedFilterConditionSection from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionSection";
import ICAdvancedFilterGrid from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid";
import ICAdvancedFilterTopSection from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterTopSection";
import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Flex } from "@mantine/core";
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
		})),
	);

	useEffect(() => {
		if (props.defaultVariables) {
			store.setVariables(props.defaultVariables);
		}
	}, [props.defaultVariables]);

	return (
		<Flex
			direction={"column"}
			className={"overflowAuto"}
			gap={"xs"}
			h={props.height + height + 85}
			w={"100%"}
		>
			<ICAdvancedFilterTopSection
				store={props.store}
				leftSection={props.leftSection}
				run={props.run}
				data={props.data}
				exportDataApi={props.exportDataApi}
				searchInputItems={props.searchInputItems}
				searchInputPlaceholder={props.searchInputPlaceholder}
			/>
			<ICAdvancedFilterConditionSection ref={ref} store={props.store} />
			<ICAdvancedFilterGrid<T>
				excludeColumns={props.excludeColumns}
				height={props.height}
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
		</Flex>
	);
}
