import { Flex, type MantineSize, Pagination, Select, Text } from "@mantine/core";
import type { FC } from "react";

export type AgPaginationProps = {
	totalRecords?: number;
	page?: number;
	recordsPerPage?: number;
	onPageChange?: (page: number) => void;
	onRecordsPerPageChange?: (pageSize: number) => void;
	recordsPerPageOptions?: number[];
	PaginationSize?: number | MantineSize | string;
};

const TanStackPagination: FC<AgPaginationProps> = (props) => {
	const { PaginationSize = "sm" } = props;

	const handleChangePageSize = (selectedPageSize: string | null) => {
		if (selectedPageSize) {
			props.onRecordsPerPageChange?.(+selectedPageSize);
			props.onPageChange?.(1);
		}
	};

	const showing = () => {
		const page = props.page || 1;
		if (page <= 1) {
			return 1;
		}

		return (page - 1) * (props.recordsPerPage || 0) + 1;
	};

	return (
		<Flex className={"tanStackTablePagination"} align="center" justify="space-between" p="2xs">
			<Flex columnGap={8} align="center">
				<Text size="xs">{` Showing ${showing()}-${(props.page || 0) * (props.recordsPerPage || 0)} of ${props.totalRecords} items`}</Text>
			</Flex>
			<Pagination
				value={props.page}
				onChange={props.onPageChange}
				total={
					props.totalRecords && props.recordsPerPage
						? Math.ceil(props.totalRecords / props.recordsPerPage)
						: 1
				}
				size={PaginationSize}
			/>
			<Flex columnGap={8} align="center">
				<Select
					size="xs"
					id="pagination-data-test"
					w={150}
					value={props.recordsPerPage?.toString()}
					searchable={false}
					onChange={handleChangePageSize}
					data={props.recordsPerPageOptions?.map((item) => ({
						value: item.toString(),
						label: `${item.toString()} per page`,
					}))}
				/>
			</Flex>
		</Flex>
	);
};

export default TanStackPagination;
