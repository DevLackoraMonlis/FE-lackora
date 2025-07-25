import ICAdvancedFilterConditionItem from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionItem";
import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Button, Flex, Highlight } from "@mantine/core";
import { IconPencil, IconX } from "@tabler/icons-react";
import type { Ref } from "react";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

type Props<T> = {
	store: ICAdvancedFilterProps<T>["store"];
	ref?: Ref<HTMLDivElement> | undefined;
};

export default function ICAdvancedFilterConditionSection<T>(props: Props<T>) {
	const store = useStore(
		props.store,
		useShallow((state) => ({
			variables: state.variables,
			resetToDefaultVariables: state.resetToDefaultVariables,
			setConditions: state.setConditions,
			openedConditionSection: state.openedConditionSection,
		})),
	);

	if (!store.openedConditionSection) {
		return null;
	}

	return (
		<Flex direction={"column"} gap={"xs"} ref={props.ref}>
			<Flex bg={"gray.1"} justify={"space-between"} align={"center"}>
				<Flex gap={"xs"}>
					<Button size={"sm"} variant={"outline"}>
						<Highlight highlight={[store.variables.columns.length.toString()]}>
							{`Manage Columns (${store.variables.columns.length})`}
						</Highlight>
					</Button>
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
				<Flex>
					<Button
						size={"sm"}
						onClick={store.resetToDefaultVariables}
						leftSection={<IconX size={16} />}
						variant={"transparent"}
					>
						Clear All Filters
					</Button>
					<Button size={"sm"}>Save Filter</Button>
				</Flex>
			</Flex>
			<Flex align={"center"} bg={"gray.1"} px={"2xs"}>
				{store.variables.conditions.map((condition, index) => (
					<ICAdvancedFilterConditionItem<T>
						key={condition.id}
						showNextOperator={index !== store.variables.conditions.length - 1}
						store={props.store}
						condition={condition}
					/>
				))}
				{!!store.variables.conditions.length && (
					<Flex align={"center"}>
						<Button px={"xs"} size={"xs"} variant={"transparent"}>
							<IconPencil size={16} />
						</Button>
						<Button px={"xs"} onClick={() => store.setConditions([])} size={"xs"} variant={"transparent"}>
							<IconX size={16} />
						</Button>
					</Flex>
				)}
			</Flex>
		</Flex>
	);
}
