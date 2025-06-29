import { useElementSize } from "@mantine/hooks";
import { type RowSelectionState, type Table, useReactTable } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import find from "lodash/find";
import type React from "react";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { getTanStackTableOptions, tanStackGenerateColumns } from "./index.helper";
import type { TanStackGridProps } from "./index.types";

export function useTanStack<T>(
	params: {
		table: Table<T>;
		tableContainerRef: React.RefObject<HTMLDivElement | null>;
	} & Pick<TanStackGridProps<T>, "rowHeight" | "idAccessor">,
) {
	const { rows } = params.table.getCoreRowModel();
	const rowVirtualizer = useVirtualizer({
		count: rows.length,
		estimateSize: () => params.rowHeight || 43, // Default height 43, adjusted based on expanded state
		getScrollElement: () => params.tableContainerRef.current,
		measureElement:
			typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
				? (element) => element?.getBoundingClientRect().height
				: undefined,
		overscan: 5,
		enabled: true,
	});

	const visibleColumns = params.table.getVisibleLeafColumns();
	const columnVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableCellElement>({
		count: visibleColumns.length,
		estimateSize: (index) => visibleColumns[index].getSize(), //estimate width of each column for accurate scrollbar dragging
		getScrollElement: () => params.tableContainerRef.current,
		horizontal: true,
		enabled: true,
		overscan: 5, //how many columns to render on each side off screen each way (adjust this for performance)
	});

	return {
		rowVirtualizer,
		columnVirtualizer,
		rows,
	};
}

export function useTanStackDefault<T extends Record<string, unknown>>(params: TanStackGridProps<T>) {
	const props = params;
	const tableContainerRef = useRef<HTMLDivElement>(null);
	const tableRef = useRef<HTMLTableElement>(null);
	const isInitialRowSelection = useRef<boolean>(false);
	const privateSelectedRecords = useRef<Map<string, T>>(new Map());
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({}); //manage your own row selection state

	useImperativeHandle(
		props.ref,
		() => {
			return {
				clear: () => {
					setRowSelection({});
				},
				getRowSelection: () => {
					return rowSelection;
				},
			};
		},
		[],
	);

	const { width: viewportWidth, ref } = useElementSize();
	const { height: bodyHeight, ref: tableBodyRef } = useElementSize();

	const columns = tanStackGenerateColumns({
		onSelectedRecordsChange: props.onSelectedRecordsChange,
		columns: props.columns,
		page: props.page,
		pinLastColumn: props.pinLastColumn,
		recordsPerPage: props.recordsPerPage,
		rowExpansion: props.rowExpansion,
		viewportWidth,
		recordCount: props.records.length,
	});

	const convertRowSelectionToRecord = () => {
		const selectedRecords: T[] = [];

		const rowSelectedRecords = Object.entries(rowSelection);
		for (let i = 0; i < rowSelectedRecords.length; i++) {
			const [rowKey] = rowSelectedRecords[i];
			const findInRecords = privateSelectedRecords.current.get(rowKey);
			if (findInRecords) {
				selectedRecords.push(findInRecords as T);
			} else {
				const findInCurrentRecords = find(
					props.records,
					(item) => (item[props.idAccessor as keyof T] as string) === rowKey,
				);
				if (findInCurrentRecords) {
					selectedRecords.push(findInCurrentRecords as T);
				}
			}
		}
		props.onSelectedRecordsChange?.(selectedRecords);
	};

	const table = useReactTable<T>(
		getTanStackTableOptions<T>({
			offsetWidth: tableContainerRef.current?.offsetWidth,
			rowSelection,
			records: props.records,
			rowExpansion: props.rowExpansion,
			pinLastColumn: props.pinLastColumn,
			page: props.page,
			onSelectedRecordsChange: props.onSelectedRecordsChange,
			idAccessor: props.idAccessor,
			columns,
			setRowSelection: (value) => {
				setRowSelection(value);
				setTimeout(() => {
					const newRecords = table.getSelectedRowModel().rows.map((item) => item.original);
					for (let i = 0; i < newRecords.length; i++) {
						const record = newRecords[i];
						const id = record[props.idAccessor] as string;
						if (!privateSelectedRecords.current.has(id)) {
							privateSelectedRecords.current.set(id, record);
						}
					}
				}, 0);
			},
		}),
	);

	useEffect(() => {
		if (props.pinLastColumn) {
			// Pin the last column to the right column
			const lastColumnId = table.getAllColumns().at(-1)?.id;
			if (lastColumnId && lastColumnId !== "selection-column" && lastColumnId !== "expander") {
				table.setColumnPinning({
					right: [lastColumnId],
				});
			}
		}
	}, [props.pinLastColumn, columns.length]);

	useEffect(() => {
		if (!isInitialRowSelection.current) {
			const initRowSelection = props.selectedRecords?.reduce((prev, cur) => {
				return {
					// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
					...prev,
					[cur[props.idAccessor as keyof T] as string]: true,
				};
			}, {});

			if (props.selectedRecords) {
				for (let i = 0; i < props.selectedRecords.length; i++) {
					const record = props.selectedRecords[i];
					const id = record[props.idAccessor] as string;
					if (!privateSelectedRecords.current.has(id)) {
						privateSelectedRecords.current.set(id, record);
					}
				}
			}
			if (initRowSelection) {
				setRowSelection(initRowSelection as RowSelectionState);
			}
			isInitialRowSelection.current = true;
		}
	}, [props.selectedRecords]);

	useEffect(() => {
		convertRowSelectionToRecord();
	}, [rowSelection]);

	return {
		tableBodyRef,
		ref,
		table,
		tableContainerRef,
		tableRef,
		bodyHeight,
		viewportWidth,
		columns,
	};
}
