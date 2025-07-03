import { Center, Input, InputBase, type InputBaseProps } from "@mantine/core";
import { Combobox, Loader, Pagination, useCombobox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useTablePagination } from "@/shared/hooks/useTablePagination";
import type { LabelValueType } from "@/shared/lib/general-types";

import type { BCDynamicFieldProps } from "../../index.types";

type Props<TObject extends string> = InputBaseProps & Omit<BCDynamicFieldProps<TObject>, "key">;

export default function ListDynamicField<TObject extends string>({
	api,
	objectType,
	paginate,
	...props
}: Props<TObject>) {
	const [selected, setSelectedValue] = useState<LabelValueType | null>(null);
	const [search, setSearch] = useState("");
	const { setTotalRecords, tablePagination, page, pageSize, totalRecords } = useTablePagination({
		defaultPageSize: 10,
	});

	const getObjectQuery = useQuery({
		enabled: !!objectType,
		queryKey: ["get-object-data", objectType, tablePagination.page, tablePagination.recordsPerPage],
		queryFn: ({ signal }) =>
			api?.(
				{
					limit: tablePagination.recordsPerPage,
					page: tablePagination.page,
					search,
					object_type: objectType,
				},
				signal,
			),
	});

	useEffect(() => {
		if (getObjectQuery.data?.data.total) {
			setTotalRecords(getObjectQuery.data?.data?.total);
		}
	}, [getObjectQuery.data?.data.total]);

	// combobox configs
	const combobox = useCombobox({
		scrollBehavior: "smooth",
		onDropdownClose: () => {
			combobox.resetSelectedOption();
			combobox.focusTarget();
			setSearch("");
		},
		onDropdownOpen: () => {
			combobox.focusSearchInput();
		},
	});

	const options = getObjectQuery?.data?.data?.results?.map(({ label, value }) => (
		<Combobox.Option value={value} key={value}>
			{label}
		</Combobox.Option>
	));

	return (
		<Combobox
			store={combobox}
			withinPortal={false}
			onOptionSubmit={(_, { children, value }) => {
				setSelectedValue({ label: children as string, value });
				combobox.closeDropdown();
			}}
		>
			<Combobox.Target>
				<InputBase
					{...props}
					component="select"
					pointer
					rightSection={getObjectQuery.isFetching ? <Loader size="xs" /> : <Combobox.Chevron />}
					onClick={() => combobox.toggleDropdown()}
					rightSectionPointerEvents="none"
					value={selected?.value}
				>
					{selected?.label || <Input.Placeholder>Pick value</Input.Placeholder>}
				</InputBase>
			</Combobox.Target>
			<Combobox.Dropdown>
				<Combobox.Search
					value={search}
					onChange={(event) => setSearch(event.currentTarget.value)}
					placeholder="Search"
				/>
				<Combobox.Options style={{ height: 200, overflow: "auto" }}>
					{getObjectQuery.isFetching ? (
						<Center h="100%">
							<Loader />
						</Center>
					) : options?.length ? (
						options
					) : (
						<Center h="100%">
							<Combobox.Empty>Nothing found</Combobox.Empty>
						</Center>
					)}
				</Combobox.Options>
				<Combobox.Footer bg="gray.2" hidden={!paginate}>
					<Center>
						<Pagination
							size="sm"
							withControls={false}
							value={page}
							total={totalRecords / pageSize}
							onChange={(value) => tablePagination.onPageChange(value)}
						/>
					</Center>
				</Combobox.Footer>
			</Combobox.Dropdown>
		</Combobox>
	);
}
