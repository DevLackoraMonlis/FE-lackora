import { Center, InputBase, type InputBaseProps } from "@mantine/core";
import { Combobox, Loader, Pagination, useCombobox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { isNumber, isObject } from "lodash";
import { useEffect, useState } from "react";

import { useTablePagination } from "@/shared/hooks/useTablePagination";
import type { LabelValueType } from "@/shared/lib/general-types";

import { GET_OBJECT_DATA_QUERY_KEY } from "../../index.constants";
import type { BCDynamicFieldProps } from "../../index.types";

type Props<TObject extends string> = InputBaseProps &
	Omit<BCDynamicFieldProps<TObject>, "key"> & {
		onChange?: (value: string) => void;
	};

export default function ListDynamicField<TObject extends string>({
	api,
	objectType,
	paginate,
	defaultValue = null,
	onChange,
	renderFooterInList,
	...props
}: Props<TObject>) {
	const [selected, setSelectedValue] = useState<LabelValueType | null>(
		isObject(defaultValue) ? defaultValue : null,
	);
	const [search, setSearch] = useState("");
	const { setTotalRecords, tablePagination, page, pageSize, totalRecords } = useTablePagination({
		defaultPageSize: 10,
	});

	const getObjectQuery = useQuery({
		enabled: !!objectType,
		queryKey: [
			GET_OBJECT_DATA_QUERY_KEY,
			objectType,
			tablePagination.page,
			tablePagination.recordsPerPage,
			search,
		],
		refetchOnMount: false,
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
		if (isNumber(getObjectQuery.data?.data.total)) {
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
			position="bottom"
			store={combobox}
			withinPortal={true}
			onOptionSubmit={(_, { children, value }) => {
				onChange?.(value);
				setSelectedValue({ label: children as string, value });
				combobox.closeDropdown();
			}}
		>
			<Combobox.Target>
				<InputBase
					{...props}
					component="button"
					type="button"
					pointer
					rightSection={getObjectQuery.isLoading ? <Loader size="xs" /> : <Combobox.Chevron />}
					onClick={() => combobox.toggleDropdown()}
					rightSectionPointerEvents="none"
				>
					{selected?.label || ""}
				</InputBase>
			</Combobox.Target>
			<Combobox.Dropdown bd="1px solid gray.4">
				<Combobox.Search
					value={search}
					onChange={(event) => {
						tablePagination.onPageChange(1);
						setSearch(event.currentTarget.value);
					}}
					placeholder="Search"
				/>
				<Combobox.Options style={{ maxHeight: 200, overflow: "auto" }}>
					{options?.length ? (
						options
					) : (
						<Center h="100%">
							<Combobox.Empty>Nothing found</Combobox.Empty>
						</Center>
					)}
				</Combobox.Options>
				{paginate && totalRecords > pageSize && (
					<Combobox.Footer bg="gray.2">
						<Center>
							<Pagination
								size="sm"
								withControls={false}
								value={page}
								total={Math.ceil(totalRecords / pageSize)}
								onChange={(value) => tablePagination.onPageChange(value)}
							/>
						</Center>
					</Combobox.Footer>
				)}
				{!!renderFooterInList && <Combobox.Footer bg="gray.2"> {renderFooterInList} </Combobox.Footer>}
			</Combobox.Dropdown>
		</Combobox>
	);
}
