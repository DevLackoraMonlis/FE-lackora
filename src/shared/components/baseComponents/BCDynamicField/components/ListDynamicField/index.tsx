import { Center, InputBase, type InputBaseProps } from "@mantine/core";
import { Combobox, useCombobox } from "@mantine/core";
import { isObject } from "lodash";
import { useEffect, useState } from "react";

import type { LabelValueType } from "@/shared/lib/general-types";

import type { BCDynamicFieldProps } from "../../index.types";

type Props<TObject extends string> = InputBaseProps &
	Omit<BCDynamicFieldProps<TObject>, "key"> & {
		onChange?: (value: string) => void;
	};

export default function ListDynamicField<TObject extends string>({
	objectType,
	defaultValue = null,
	onChange,
	options,
	...props
}: Props<TObject>) {
	const [selected, setSelectedValue] = useState<LabelValueType | null>();
	const [search, setSearch] = useState("");

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

	const comboboxOptions = options?.map(({ label, value }) => (
		<Combobox.Option value={value} key={value}>
			{label}
		</Combobox.Option>
	));

	useEffect(() => {
		setSelectedValue(isObject(defaultValue) ? defaultValue : null);
	}, [defaultValue]);

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
					rightSection={<Combobox.Chevron />}
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
						setSearch(event.currentTarget.value);
					}}
					placeholder="Search"
				/>
				<Combobox.Options style={{ maxHeight: 200, overflow: "auto" }}>
					{comboboxOptions?.length ? (
						comboboxOptions
					) : (
						<Center h="100%">
							<Combobox.Empty>Nothing found</Combobox.Empty>
						</Center>
					)}
				</Combobox.Options>
				{/* <Combobox.Footer bg="gray.2">Footer</Combobox.Footer> */}
			</Combobox.Dropdown>
		</Combobox>
	);
}
