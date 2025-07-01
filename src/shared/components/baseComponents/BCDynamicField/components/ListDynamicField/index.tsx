import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Center, Input, InputBase, InputBaseProps } from "@mantine/core";
import { Combobox, Loader, Pagination, useCombobox } from "@mantine/core";

import { useTablePagination } from "@/shared/hooks/useTablePagination";

import type { BCDynamicFieldProps } from "../../index.types";

type Props<TObject extends string> = InputBaseProps & {
  api?: BCDynamicFieldProps<TObject>["api"];
  objectType?: TObject;
};

export default function ListDynamicField<TObject extends string>({
  api,
  objectType,
  ...props
}: Props<TObject>) {
  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { setTotalRecords, tablePagination, page, totalRecords } = useTablePagination({
    defaultPageSize: 10,
  });

  const getObjectQuery = useQuery({
    enabled: !!api,
    queryKey: ["get-object-data", objectType, tablePagination.page, tablePagination.recordsPerPage],
    queryFn: ({ signal }) =>
      api?.({ limit: tablePagination.recordsPerPage, page: tablePagination.page, search }, signal),
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
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          {...props}
          component="button"
          type="button"
          pointer
          rightSection={getObjectQuery.isFetching ? <Loader size={18} /> : <Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
        >
          {value || <Input.Placeholder>Pick value</Input.Placeholder>}
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
              <Combobox.Empty>Loading....</Combobox.Empty>
            </Center>
          ) : !!options?.length ? (
            options
          ) : (
            <Center h="100%">
              <Combobox.Empty>Nothing found</Combobox.Empty>
            </Center>
          )}
        </Combobox.Options>
        <Combobox.Footer bg="gray.2" hidden={!(totalRecords > 10)}>
          <Center>
            <Pagination
              size="sm"
              withControls={false}
              value={page}
              total={totalRecords}
              onChange={(value) => tablePagination.onPageChange(value)}
            />
          </Center>
        </Combobox.Footer>
      </Combobox.Dropdown>
    </Combobox>
  );
}
