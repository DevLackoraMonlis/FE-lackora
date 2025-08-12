import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Button, Indicator, Menu } from "@mantine/core";
import { IconAdjustments, IconChevronDown, IconColorFilter, IconFilter, IconX } from "@tabler/icons-react";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

type Props<T> = {
	store: ICAdvancedFilterProps<T>["store"];
	run: ICAdvancedFilterProps<T>["run"];
	allColumns: ICAdvancedFilterProps<T>["allColumns"];
};

export default function ICAdvancedFilterCollapseButton<T>(props: Props<T>) {
	const store = useStore(
		props.store,
		useShallow((state) => ({
			variables: state.variables,
			resetToDefaultVariables: state.resetToDefaultVariables,
			setOpenFilterConditionModal: state.setOpenFilterConditionModal,
			setOpenGroupByModal: state.setOpenGroupByModal,
			groupBy: state.variables.groupBy,
		})),
	);

	const isAnyCondition = store.groupBy || store.variables.conditions.length;

	const button = (
		<Button
			variant={"outline"}
			color={"main"}
			leftSection={<IconFilter size={16} />}
			size={"sm"}
			rightSection={<IconChevronDown size={16} />}
		>
			Advance Filter
		</Button>
	);

	return (
		<Menu width={200} radius="md" closeOnClickOutside closeOnEscape position="bottom-start">
			<Menu.Target>
				{isAnyCondition ? (
					<Indicator color={"red"} processing>
						{button}
					</Indicator>
				) : (
					button
				)}
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item
					onClick={() => store.setOpenFilterConditionModal(true)}
					leftSection={<IconAdjustments size={12} />}
				>
					Filter by...
				</Menu.Item>
				<Menu.Item
					onClick={() => store.setOpenGroupByModal(true)}
					leftSection={<IconColorFilter size={12} />}
				>
					Group by...
				</Menu.Item>
				{(store.variables.conditions.length || store.variables.groupBy) && (
					<Menu.Item
						onClick={() => {
							store.resetToDefaultVariables(props.allColumns);
							props.run();
						}}
						leftSection={<IconX size={12} />}
					>
						Clear All Filters
					</Menu.Item>
				)}
			</Menu.Dropdown>
		</Menu>
	);
}
