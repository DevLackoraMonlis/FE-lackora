import { DndContext, rectIntersection } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core/dist/types";
import { Box, ScrollArea, Table } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { useCallback, useMemo, useState } from "react";

import BCCalendarCard from "@/shared/components/baseComponents/BCCalendar/components/BCCalendarCard";
import BCCalendarColumnDroppable from "@/shared/components/baseComponents/BCCalendar/components/BCCalendarColumnDroppable";
import BCCalendarTimeCell from "@/shared/components/baseComponents/BCCalendar/components/BCCalendarTimeCell";
import type {
	BCCalendarCardType,
	BCCalendarProps,
} from "@/shared/components/baseComponents/BCCalendar/index.types";
import classes from "./index.module.css";

export default function BCCalendar<CardType, ColumnType>(props: BCCalendarProps<ColumnType, CardType>) {
	const [reservations, setReservations] = useState<BCCalendarCardType<CardType>[]>(props.initialCardValues);
	const { height: vpHeight } = useViewportSize();

	const startHour = props.startHour ?? 0;
	const endHour = props.endHour ?? 24;
	const hours = endHour - startHour;
	const headerRowHeight = props.headerRowHeight ?? 40;
	const rowWidth = props.rowWidth ?? 200;
	const timeColumnWidth = props.timeColumnWidth ?? 60;
	const rowHeight = props.rowHeight ?? 120;
	const columnHeight = hours * rowHeight;
	const mastersCount = props.columns.length;

	const stickyTimeCol = useMemo(
		() => ({
			position: "sticky" as const,
			left: 0,
			zIndex: 3,
			background: "var(--mantine-color-body)",
		}),
		[],
	);

	const stickyHeaderCell = useMemo(
		() => ({
			position: "sticky" as const,
			top: 0,
			zIndex: 4,
			background: "var(--mantine-color-body)",
			borderTop: "1px solid var(--mantine-color-gray-3)",
		}),
		[],
	);

	const tableNaturalWidth = timeColumnWidth + mastersCount * rowWidth;

	const onDragEnd = useCallback(
		(event: DragEndEvent) => {
			const { over, active, delta } = event;

			if (!over?.id) return;

			const draggedId = String(active.id);
			const prev = reservations.find((r) => r.id === draggedId);
			if (!prev) return;

			const duration = prev.end - prev.start;
			const overId = String(over.id);

			if (!overId.startsWith("col-")) return;

			const [, masterIdxStr] = overId.split("-");
			const newMaster = Number.parseInt(masterIdxStr, 10);

			const deltaHours = delta.y / rowHeight;
			let newStart = prev.start + deltaHours;

			const startMinutes = Math.round(newStart * 60);
			newStart = (Math.round(startMinutes / 5) * 5) / 60;

			newStart = Math.max(startHour, Math.min(newStart, endHour - duration));
			const newEnd = newStart + duration;

			const oldReservations = [...reservations];
			const next = reservations.map((r) =>
				r.id === draggedId ? { ...r, masterIndex: newMaster, start: newStart, end: newEnd } : r,
			);
			setReservations(next);
			const columnName = props.columns[newMaster].name || "";
			const columnId = props.columns[newMaster].id;

			modals.openConfirmModal({
				title: "Confirm move",
				centered: true,
				children: props.onConfirmMoveChildren ? (
					props.onConfirmMoveChildren({ start: newStart, column: columnName })
				) : (
					<p>
						Move <b>{draggedId}</b> to {`${props.confirmMoveLabel || "Master"}`} {columnName} at{" "}
						{String(Math.floor(newStart)).padStart(2, "0")}:
						{String(Math.round((newStart % 1) * 60)).padStart(2, "0")}?
					</p>
				),
				labels: { confirm: "Yes, move", cancel: "Cancel" },
				onConfirm: () => props.onConfirmMove?.({ start: newStart, columnId }),
				onCancel: () => setReservations(oldReservations),
			});
		},
		[props.columns, setReservations, props.onConfirmMove, props.onConfirmMoveChildren, reservations],
	);

	return (
		<DndContext collisionDetection={rectIntersection} onDragEnd={onDragEnd}>
			<Box p="md">
				<ScrollArea h={vpHeight - 100} w="100%" type="auto" scrollHideDelay={0}>
					<Box style={{ minWidth: tableNaturalWidth }}>
						<Table
							w={"100%"}
							layout={"fixed"}
							style={{ borderCollapse: "separate" }}
							stickyHeader
							withTableBorder
						>
							<Table.Thead>
								<Table.Tr h={headerRowHeight}>
									<Table.Th
										className={classes.timeColumn}
										style={{
											...stickyHeaderCell,
											...stickyTimeCol,
											width: timeColumnWidth,
											minWidth: timeColumnWidth,
											maxWidth: timeColumnWidth,
										}}
									/>

									{Array.from({ length: mastersCount }, (_, c) => (
										<Table.Th
											key={`h-${
												// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												c
											}`}
											w={rowWidth}
											miw={rowWidth}
											style={stickyHeaderCell}
										>
											{props.columns[c].label}
										</Table.Th>
									))}
								</Table.Tr>

								<Table.Tr>
									<Table.Th
										className={classes.timeColumn}
										style={{
											...stickyTimeCol,
											verticalAlign: "top",
											width: timeColumnWidth,
											minWidth: `${timeColumnWidth}px !important`,
											maxWidth: `${timeColumnWidth}px !important`,
											padding: 0,
										}}
									>
										<div
											style={{ position: "relative", height: columnHeight, maxWidth: "100%", width: "100%" }}
										>
											{Array.from({ length: hours }, (_, r) => (
												<BCCalendarTimeCell
													key={`time-${
														// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
														r
													}`}
													rowHeight={rowHeight}
													startHour={startHour}
													index={r}
												/>
											))}
										</div>
									</Table.Th>

									{Array.from({ length: mastersCount }, (_, c) => (
										<Table.Th
											key={`col-${
												// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												c
											}`}
											w={rowWidth}
											miw={rowWidth}
											style={{
												verticalAlign: "top",
												padding: 0,
											}}
										>
											<BCCalendarColumnDroppable
												id={`col-${c}`}
												height={columnHeight}
												showHourLines
												rowHeight={rowHeight}
											>
												{reservations
													.filter(
														(res) => res.masterIndex === c && res.start >= startHour && res.end <= endHour,
													)
													.map((res) => {
														const top = (res.start - startHour) * rowHeight;
														const heightPx = (res.end - res.start) * rowHeight;
														return (
															<BCCalendarCard<CardType>
																key={res.id}
																cardType={res}
																cardProps={{
																	shadow: "sm",
																	radius: "md",
																	style: {
																		left: 6,
																		right: 6,
																		top,
																		height: heightPx,
																		background: "var(--mantine-color-blue-light)",
																		overflow: "hidden",
																	},
																}}
															/>
														);
													})}
											</BCCalendarColumnDroppable>
										</Table.Th>
									))}
								</Table.Tr>
							</Table.Thead>
						</Table>
					</Box>
				</ScrollArea>
			</Box>
		</DndContext>
	);
}
