import TanStackPagination from "@/shared/components/baseComponents/BCTanStackGrid/TanStackPagination";
import { Card, LoadingOverlay } from "@mantine/core";
import TanStackMainTableNonVirtual from "./components/TanStackMainTableNonVirtual";
import { useTanStackDefault } from "./index.hooks";
import type { TanStackGridProps } from "./index.types";

export default function TanStackGridNonVirtual<T extends Record<string, unknown>>(
	props: TanStackGridProps<T>,
) {
	const { table, ref, tableBodyRef, tableContainerRef, tableRef, columns } = useTanStackDefault(props);

	const { rows } = table.getCoreRowModel();

	return (
		<Card m={0} p={0} ref={ref} className={`tanstackTableTheme ${props.tableRootClassName}`} radius="xs">
			<div
				className={`container ${props.tableContainerClassName}`}
				ref={tableContainerRef}
				style={{
					overflow: "auto", //our scrollable table container
					position: "relative", //needed for sticky header
					height: props.h || 500, //should be a fixed height
					width: props.w || "101%",
				}}
			>
				<LoadingOverlay visible={props.fetching} />

				<TanStackMainTableNonVirtual
					withPaddingCells={props.withPaddingCells}
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
		</Card>
	);
}
