import { findAllOperatorKeyByValue } from "@/shared/components/infraComponents/ICAdvancedFilter/index.helper";
import type { ICAdvancedFilterCondition } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Badge, Flex, Text } from "@mantine/core";

type Props = {
	condition: ICAdvancedFilterCondition;
	showNextOperator: boolean;
};

export default function ICAdvancedFilterConditionItemReadonly(props: Props) {
	return (
		<Flex align={"center"} gap={"xs"} wrap={"nowrap"} miw={"fit-content"}>
			<Badge
				size={"sm"}
				radius={"xl"}
				variant={"light"}
				color={"gray"}
			>{`${props.condition.columnName} ${findAllOperatorKeyByValue(props.condition.operator || "") || props.condition.operator || ""} ${props.condition.values.map((item) => item.label).join(",")}`}</Badge>
			{props.showNextOperator && <Text fz={"xs"}>{props.condition.nextOperator}</Text>}
		</Flex>
	);
}
