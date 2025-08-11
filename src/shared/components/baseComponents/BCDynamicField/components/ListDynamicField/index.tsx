import { Center, InputBase, type InputBaseProps, Text } from "@mantine/core";
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
	placeholder = "",
	onChange,
	options,
	custom,
	...props
}: Props<TObject>) {
	const [data, setData] = useState<typeof options>(options || []);
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

	const comboboxOptions = data
		?.filter(({ label }) => label?.toLowerCase().includes(search))
		.map(({ label, value }) => (
			<Combobox.Option value={value} key={value}>
				{label}
			</Combobox.Option>
		));

	useEffect(() => {
		if (options?.length) {
			setData(options);
			const label =
				options?.find(({ value }) => {
					if (isObject(defaultValue)) {
						return value === defaultValue?.value;
					}
					return value === defaultValue;
				})?.label || "";
			setSelectedValue({
				label,
				value: isObject(defaultValue) ? defaultValue?.value || "" : defaultValue || "",
			});
		}
	}, [defaultValue, options]);

	return (
		<Combobox
			position="bottom"
			store={combobox}
			withinPortal={true}
			onOptionSubmit={(_, { children: label, value }) => {
				if (value === "$create") {
					const [_create, newValue] = label as string[];
					const newOption = { label: newValue, value: newValue };
					setData((current) => (current ? [...current, newOption] : [newOption]));
					onChange?.(newValue);
					setSelectedValue(newOption);
				} else {
					onChange?.(value);
					setSelectedValue({ label: label as string, value });
				}
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
					rightSectionPointerEvents="none"
					onClick={() => combobox.openDropdown()}
				>
					{selected?.label || <Text c="gray.5">{placeholder}</Text>}
				</InputBase>
			</Combobox.Target>
			<Combobox.Dropdown bd="1px solid gray.4">
				<Combobox.Search
					value={search}
					onChange={(event) => {
						setSearch(event.currentTarget.value);
					}}
					placeholder={custom ? "Search or Create new" : "Search"}
				/>
				<Combobox.Options style={{ maxHeight: 200, overflow: "auto" }}>
					{comboboxOptions?.length ? (
						comboboxOptions
					) : search && custom ? (
						<Combobox.Option value="$create">+ Create {search}</Combobox.Option>
					) : (
						<Center h="100%">
							<Combobox.Empty>Nothing found</Combobox.Empty>
						</Center>
					)}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}
