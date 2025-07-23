import type {
	ICAdvancedFilterCondition,
	ICAdvancedFilterProps,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { ActionIcon, Badge, Flex, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

type Props<T> = {
	condition: ICAdvancedFilterCondition;
	store: ICAdvancedFilterProps<T>["store"];
	showNextOperator: boolean;
};

export default function ICAdvancedFilterConditionItem<T>(props: Props<T>) {
	const store = useStore(
		props.store,
		useShallow((state) => ({
			removeCondition: state.removeCondition,
		})),
	);

	return (
		<Flex align={"center"} gap={"xs"}>
			<Badge
				rightSection={
					<ActionIcon onClick={() => store.removeCondition(props.condition.id)}>
						<IconX size={12} />
					</ActionIcon>
				}
				size={"xs"}
				radius={"xl"}
				variant={"light"}
				color={"gray"}
			>{`${props.condition.columnName}${props.condition.operator}${props.condition.values.map((item) => item.label).join(",")}`}</Badge>
			{props.showNextOperator && <Text fz={"xs"}>{props.condition.nextOperator}</Text>}
		</Flex>
	);
}
