import { useSortable } from "@dnd-kit/sortable";
import { Box, Button, Flex, Text } from "@mantine/core";
import { IconGripVertical, IconX } from "@tabler/icons-react";
import type { PropsWithChildren } from "react";

type Props = {
	id: string;
	onRemove: () => void;
} & PropsWithChildren;

export default function ICAdvancedFilterColumnSortableItem(props: Props) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });
	const style = {
		...(transform?.y && {
			transform: `translate3d(0px, ${transform?.y}px, 0)`,
		}),
		transition,
	};

	return (
		<Flex
			bg={"white"}
			h={28}
			gap="2xs"
			w="100%"
			align="center"
			ref={setNodeRef}
			style={style}
			{...attributes}
		>
			<Flex align={"center"} {...listeners}>
				<IconGripVertical color={"gray"} size={16} />
			</Flex>
			<Box w="100%">
				<Text fz="xs">{`${props.id}`}</Text>
			</Box>
			<Button id="remove-selected-columns" p={8} variant="transparent" onClick={props.onRemove}>
				<IconX color={"gray"} size={16} />
			</Button>
		</Flex>
	);
}
