import ICAdvancedFilterFullScreenModal from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterFullScreenModal";
import ICAdvancedFilterComponent from "@/shared/components/infraComponents/ICAdvancedFilter/index.component";
import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Flex } from "@mantine/core";
import { useCallback } from "react";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

export default function ICAdvancedFilter<T>(
	props: Omit<
		ICAdvancedFilterProps<T>,
		"run" | "allColumns" | "data" | "isLoading" | "totalRecords" | "searchInputItems" | "tableHeight"
	>,
) {
	const store = useStore(
		props.store,
		useShallow((state) => ({
			openedFullScreenModal: state.openedFullScreenModal,
			setOpenFullScreenModal: state.setOpenFullScreenModal,
		})),
	);

	const MainComponent = useCallback(() => <ICAdvancedFilterComponent<T> {...props} />, [props]);

	return (
		<Flex h={"100%"} direction={"column"} w={"100%"}>
			<ICAdvancedFilterFullScreenModal
				title={props.fullScreenTitle}
				onClose={() => store.setOpenFullScreenModal(false)}
				opened={store.openedFullScreenModal}
			>
				<Flex direction={"column"} w={"100%"} p={"xs"}>
					<MainComponent />
				</Flex>
			</ICAdvancedFilterFullScreenModal>
			<MainComponent />
		</Flex>
	);
}
