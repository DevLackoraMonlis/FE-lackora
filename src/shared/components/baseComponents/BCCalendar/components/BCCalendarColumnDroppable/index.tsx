import BCCalendarTimeCellLine from "@/shared/components/baseComponents/BCCalendar/components/BCCalendarTimeCellLine";
import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";

type Props = {
	id: string;
	height: number;
	showHourLines: boolean;
	rowHeight: number;
	children: ReactNode;
};

export default function BCCalendarColumnDroppable({ id, height, showHourLines, rowHeight, children }: Props) {
	const { setNodeRef, isOver } = useDroppable({ id });

	return (
		<div
			ref={setNodeRef}
			data-col-droppable={id}
			style={{
				position: "relative",
				height,
				outline: isOver ? "2px dashed var(--mantine-color-blue-6)" : "none",
				outlineOffset: isOver ? -2 : 0,
				borderRadius: 6,
			}}
		>
			{showHourLines && (
				<div
					aria-hidden
					style={{
						position: "absolute",
						inset: 0,
						pointerEvents: "none",
					}}
				>
					{Array.from({ length: Math.floor(height / rowHeight) + 1 }, (_, r) => (
						<BCCalendarTimeCellLine
							key={`hour-line-${
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								r
							}`}
							index={r}
							rowHeight={rowHeight}
						/>
					))}
				</div>
			)}
			{children}
		</div>
	);
}
