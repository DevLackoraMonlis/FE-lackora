import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Button, Collapse, Flex, Highlight } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import type { Ref } from "react";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

type Props<T> = {
	store: ICAdvancedFilterProps<T>["store"];
	run: ICAdvancedFilterProps<T>["run"];
	allColumns: ICAdvancedFilterProps<T>["allColumns"];
	hideConditionSection: ICAdvancedFilterProps<T>["hideConditionSection"];
	ref?: Ref<HTMLDivElement> | undefined;
};

export default function ICAdvancedFilterConditionSection<T>(props: Props<T>) {
	const store = useStore(
		props.store,
		useShallow((state) => ({
			variables: state.variables,
			resetToDefaultVariables: state.resetToDefaultVariables,
			openedConditionSection: state.openedConditionSection,
		})),
	);

	if (props.hideConditionSection) {
		return null;
	}

	return (
		<Collapse transitionDuration={500} transitionTimingFunction="linear" in={store.openedConditionSection}>
			<Flex mb={"xs"} bg={"gray.1"} justify={"space-between"} align={"center"} ref={props.ref}>
				<Flex gap={"xs"}>
					<Button size={"sm"} variant={"outline"}>
						<Highlight highlight={[store.variables.conditions.length.toString()]}>
							{`Conditions (${store.variables.conditions.length})`}
						</Highlight>
					</Button>
					<Button size={"sm"} variant={"outline"}>
						<Highlight highlight={[(store.variables.groupBy?.aggregatedConditions.length || "0").toString()]}>
							{`Group by (${store.variables.groupBy?.aggregatedConditions.length || 0})`}
						</Highlight>
					</Button>
					<Button size={"sm"} variant={"outline"}>
						Aggregated Conditions
					</Button>
				</Flex>
				<Flex align={"center"}>
					{store.variables.conditions.length ||
						(store.variables.groupBy && (
							<Button
								size={"sm"}
								onClick={() => {
									store.resetToDefaultVariables(props.allColumns);
									props.run();
								}}
								leftSection={<IconX size={16} />}
								variant={"transparent"}
							>
								Clear All Filters
							</Button>
						))}

					<Button size={"sm"}>Save Filter</Button>
				</Flex>
			</Flex>
		</Collapse>
	);
}
