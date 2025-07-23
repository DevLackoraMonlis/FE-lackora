import BCTanStackGrid from "@/shared/components/baseComponents/BCTanStackGrid";
import type { TanStackDataTableColumnColDef } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import ICAdvancedFilterGridColumn from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid/ICAdvancedFilterGridColumn";
import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

type Props<T> = ICAdvancedFilterProps<T>;

export default function ICAdvancedFilterGrid<T extends Record<string, unknown>>(props: Props<T>) {
	const store = useStore(
		props.store,
		useShallow((state) => ({
			page: state.variables.page,
			limit: state.variables.limit,
			setPage: state.setPage,
			setLimit: state.setLimit,
		})),
	);

	const modifiedColumns: TanStackDataTableColumnColDef<T>[] = props.columns.map((column) => ({
		...column,
		header: (
			<ICAdvancedFilterGridColumn<T>
				key={column.accessor}
				column={column}
				store={props.store}
				allColumns={props.allColumns}
			/>
		),
	}));

	return (
		<BCTanStackGrid<T>
			h={props.height}
			withTableBorder
			withColumnBorders
			withRowBorders
			idAccessor={props.idAccessor}
			columns={modifiedColumns}
			records={props.data}
			totalRecords={props.totalRecords}
			page={store.page}
			recordsPerPage={store.limit}
			onPageChange={(page) => store.setPage(page)}
			onRecordsPerPageChange={(limit) => store.setLimit(limit)}
			recordsPerPageOptions={props.recordsPerPageOptions || [25, 50, 100]}
		/>
	);
}
