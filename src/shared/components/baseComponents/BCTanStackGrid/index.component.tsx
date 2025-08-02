import TanStackPagination from "@/shared/components/baseComponents/BCTanStackGrid/TanStackPagination";
import { LoadingOverlay } from "@mantine/core";
import TanStackMainTable from "./components/TanStackMainTable";
import { useTanStack, useTanStackDefault } from "./index.hooks";
import type { TanStackGridProps } from "./index.types";

export default function TanStackGridComponent<T extends Record<string, unknown>>(
	props: TanStackGridProps<T>,
) {
	const { table, ref, tableBodyRef, tableContainerRef, tableRef, bodyHeight, columns } =
		useTanStackDefault(props);

	const { columnVirtualizer, rowVirtualizer, rows } = useTanStack({
		idAccessor: props.idAccessor,
		rowHeight: props.rowHeight,
		table,
		tableContainerRef,
	});

	return (
		<div ref={ref} className={`tanstackTableTheme ${props.tableRootClassName}`}>
			<div
				className={`container ${props.tableContainerClassName}`}
				ref={tableContainerRef}
				style={{
					overflow: "auto", //our scrollable table container
					position: "relative", //needed for sticky header
					height: props.h || 500, //should be a fixed height
					width: props.w || "100%",
				}}
			>
				<LoadingOverlay
					loaderProps={{
						type: "oval",
						size: "xs",
						style: {
							display: "flex",
							width: "100%",
							height: "100%",
							justifyContent: "flex-start",
							alignItems: "flex-start",
							marginTop: "15px",
							marginLeft: "15px",
						},
					}}
					style={{
						justifyContent: "flex-start",
					}}
					w={tableRef.current?.style.width || "100%"}
					h={bodyHeight + 40 || "100%"}
					visible={props.fetching}
				/>
				<TanStackMainTable<T>
					withPaddingCells={props.withPaddingCells}
					fetching={props.fetching}
					rows={rows}
					columnVirtualizer={columnVirtualizer}
					rowVirtualizer={rowVirtualizer}
					tableRef={tableRef}
					tableBodyRef={tableBodyRef}
					table={table}
					tableContainerRef={tableContainerRef}
					columns={columns}
					idAccessor={props.idAccessor}
					onRowDoubleClick={props.onRowDoubleClick}
					onRowClick={props.onRowClick}
					onSelectedRecordsChange={props.onSelectedRecordsChange}
					rowHeight={props.rowHeight}
					rowExpansion={props.rowExpansion}
					tableClassName={props.tableClassName}
				/>
			</div>
			{props.page !== undefined && (
				<TanStackPagination
					onRecordsPerPageChange={props.onRecordsPerPageChange}
					recordsPerPageOptions={props.recordsPerPageOptions}
					onPageChange={props.onPageChange}
					page={props.page}
					totalRecords={props.totalRecords}
					recordsPerPage={props.recordsPerPage}
					PaginationSize={props.paginationSize}
				/>
			)}
		</div>
	);
}
