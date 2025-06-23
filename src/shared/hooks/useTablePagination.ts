import { useState } from "react";

export const PAGE_SIZES = [25, 100, 200, 500, 1000];

export type PaginationType = {
	totalRecords: number;
	page: number;
	recordsPerPage: number;
	onPageChange: (page: number) => void;
	onRecordsPerPageChange: (recordsPerPage: number) => void;
	recordsPerPageOptions: number[];
};

type PropsHook = {
	defaultPage?: number;
	defaultPageSize?: number;
};
export const useTablePagination = (props?: PropsHook) => {
	const { defaultPage = 1, defaultPageSize = PAGE_SIZES[0] } = props || {};
	const [page, setPage] = useState<number>(defaultPage);
	const [pageSize, setPageSize] = useState<number>(defaultPageSize);
	const [totalRecords, setTotalRecords] = useState<number>(0);

	const tablePagination: PaginationType = {
		onPageChange: setPage,
		onRecordsPerPageChange: setPageSize,
		page,
		recordsPerPage: pageSize,
		recordsPerPageOptions: PAGE_SIZES,
		totalRecords,
	};

	return {
		page,
		pageSize,
		totalRecords,
		setTotalRecords,
		tablePagination,
	};
};
