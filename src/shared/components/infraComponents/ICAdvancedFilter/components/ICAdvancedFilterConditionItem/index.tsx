import { findAllOperatorKeyByValue } from "@/shared/components/infraComponents/ICAdvancedFilter/index.helper";
import type {
	ICAdvancedFilterColumnRs,
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
	run: ICAdvancedFilterProps<T>["run"];
	showNextOperator: boolean;
	getColumnOption: (columnName: string) => ICAdvancedFilterColumnRs | undefined;
};

export default function ICAdvancedFilterConditionItem<T>(props: Props<T>) {
	const store = useStore(
		props.store,
		useShallow((state) => ({
			removeCondition: state.removeCondition,
		})),
	);

	const getColumnOption = props.getColumnOption(props.condition.columnName || "");

	return (
		<Flex align={"center"} gap={"xs"} wrap={"nowrap"}>
			<Badge
				rightSection={
					<ActionIcon
						variant={"transparent"}
						onClick={() => {
							store.removeCondition(props.condition.id);
							props.run();
						}}
					>
						<IconX size={12} />
					</ActionIcon>
				}
				size={"sm"}
				radius={"xl"}
				variant={"light"}
				color={"gray"}
			>{`${getColumnOption?.displayName || props.condition.columnName} ${findAllOperatorKeyByValue(props.condition.operator || "") || props.condition.operator || ""} ${props.condition.values.map((item) => item.label).join(",")}`}</Badge>
			{props.showNextOperator && <Text fz={"xs"}>{props.condition.nextOperator}</Text>}
		</Flex>
	);
}
