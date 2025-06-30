import { LoadingOverlay } from "@mantine/core";
import AgPagination from "./Pagination";
import TanStackMainTableNonVirtual from "./components/TanStackMainTableNonVirtual";
import { useTanStackDefault } from "./index.hooks";
import type { TanStackGridProps } from "./index.types";

export default function TanStackGridNonVirtual<T extends Record<string, unknown>>(
	props: TanStackGridProps<T>,
) {
	const { table, ref, tableBodyRef, tableContainerRef, tableRef, bodyHeight, viewportWidth, columns } =
		useTanStackDefault(props);

	const { rows } = table.getCoreRowModel();

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
						style: {
							display: "flex",
							width: "100%",
							marginLeft: viewportWidth / 2 - 100,
						},
					}}
					style={{
						justifyContent: "flex-start",
					}}
					w={tableRef.current?.style.width || "100%"}
					h={bodyHeight || "100%"}
					visible={props.fetching}
				/>

				<TanStackMainTableNonVirtual
					rows={rows}
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
				<AgPagination
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
