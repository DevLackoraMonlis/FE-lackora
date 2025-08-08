import { Flex } from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";
import type { Identifier, XYCoord } from "dnd-core";
import { type FC, type ReactNode, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

type DragItem = {
	index: number;
	id: string;
	type: string;
};

enum ItemTypes {
	CARD = "card",
}

export type DnDCardBoxProps = {
	index: number;
	moveCard: (dragIndex: number, hoverIndex: number) => void;
	id: string;
	content: ReactNode;
};

const DnDCardBox: FC<DnDCardBoxProps> = ({ index, moveCard, id, content }) => {
	const ref = useRef<HTMLDivElement>(null);
	const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
		accept: ItemTypes.CARD,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: DragItem, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;

			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}

			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();

			// Get vertical middle
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

			// Determine mouse position
			const clientOffset = monitor.getClientOffset();

			// Get pixels to the top
			const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%

			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			// Time to actually perform the action
			moveCard(dragIndex, hoverIndex);

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.CARD,
		item: () => {
			return { id, index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));
	return (
		<Flex justify="space-between" gap="sm" style={{ opacity }} ref={ref}>
			<Flex pt="2lg" pl="xs">
				<IconGripVertical size={20} data-handler-id={handlerId} />
			</Flex>
			{content}
		</Flex>
	);
};

export default DnDCardBox;
