import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Button, Indicator } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconFilter } from "@tabler/icons-react";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

type Props<T> = {
	store: ICAdvancedFilterProps<T>["store"];
};

export default function ICAdvancedFilterCollapseButton<T>(props: Props<T>) {
	const store = useStore(
		props.store,
		useShallow((state) => ({
			openedConditionSection: state.openedConditionSection,
			setOpenFilterConditionSection: state.setOpenFilterConditionSection,
			conditions: state.variables.conditions,
			groupBy: state.variables.groupBy,
		})),
	);

	const isAnyCondition = store.groupBy || store.conditions.length;

	const button = (
		<Button
			variant={store.openedConditionSection ? "light" : "outline"}
			color={store.openedConditionSection ? "gray" : "main"}
			leftSection={<IconFilter size={16} />}
			size={"sm"}
			rightSection={
				store.openedConditionSection ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
			}
			onClick={() => store.setOpenFilterConditionSection(!store.openedConditionSection)}
		>
			Advance Filter
		</Button>
	);

	if (isAnyCondition) {
		return (
			<Indicator color={"red"} processing>
				{button}
			</Indicator>
		);
	}

	return button;
}
