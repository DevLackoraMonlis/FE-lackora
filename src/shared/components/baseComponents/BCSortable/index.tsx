import {
	DndContext,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core/dist/types";
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { PropsWithChildren } from "react";

type Props<T extends { id: string }> = {
	items: T[];
	handleItemChange?: (e: DragEndEvent, items: T[]) => void;
} & PropsWithChildren;
export default function BCSortable<T extends { id: string }>(props: Props<T>) {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (active.id !== over?.id) {
			const items = props.items;
			const oldIndex = items?.findIndex((item) => item.id === active.id);
			const newIndex = items?.findIndex((item) => item.id === over?.id);
			const newItems = arrayMove(items, oldIndex, newIndex);
			props?.handleItemChange?.(event, newItems);
		}
	};

	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext items={props.items} strategy={verticalListSortingStrategy}>
				{props.children}
			</SortableContext>
		</DndContext>
	);
}
