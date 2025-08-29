import type { BCCalendarCardType } from "@/shared/components/baseComponents/BCCalendar/index.types";
import { useDraggable } from "@dnd-kit/core";
import { Box, type CardProps } from "@mantine/core";

type Props<T> = { cardType: BCCalendarCardType<T>; cardProps: CardProps };

export default function BCCalendarCard<T>(props: Props<T>) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: props.cardType.id,
	});

	const { style, ...other } = props.cardProps;

	return (
		<Box
			ref={setNodeRef}
			{...attributes}
			{...other}
			{...listeners}
			style={{
				position: "absolute",
				cursor: "move",
				transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
				...style,
			}}
		>
			{props.cardType.children}
		</Box>
	);
}
