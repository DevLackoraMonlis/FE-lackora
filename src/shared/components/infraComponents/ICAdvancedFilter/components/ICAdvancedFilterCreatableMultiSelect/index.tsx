import type { LabelValueType } from "@/shared/lib/general-types";
import { type FlexProps, InputWrapper, ScrollArea } from "@mantine/core";
import { CheckIcon, Combobox, Flex, Group, Pill, PillsInput, useCombobox } from "@mantine/core";
import { type ReactNode, useCallback, useMemo } from "react";
import { useState } from "react";

type DefaultType = { values: LabelValueType<unknown>[]; error?: boolean; disabled?: boolean; id?: string };

type Props<T extends DefaultType> = {
	onChange?: (data: T) => void;
	maxDisplay?: number;
	rightSection?: ReactNode;
	mb?: number;
	onMouseEnter?: VoidFunction;
	onMouseLeave?: VoidFunction;
	w?: FlexProps["w"];
	miw?: FlexProps["miw"];
	required?: boolean;
	label?: ReactNode;
	item?: T;
};

export default function ICAdvancedFilterCreatableMultiSelect<T extends DefaultType>(props: Props<T>) {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
		onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
	});

	const maxDisplayItems = props.maxDisplay || 4;

	const [search, setSearch] = useState("");

	const exactOptionMatch = useMemo(
		() => props.item?.values?.some((item) => item.value === search),
		[props.item?.values, search],
	);

	const handleValueSelect = useCallback(
		(val: string) => {
			setSearch("");
			const trimValue = search.trim();
			if (val === "$create") {
				const newValues = props.item?.values?.length ? [...props.item.values] : [];

				if (newValues?.some((item) => item.value === search)) {
					return newValues;
				}
				if (trimValue?.includes(",")) {
					const addBatchArray = trimValue.split(",");
					addBatchArray.forEach((singleSearch) =>
						newValues.push({
							label: singleSearch?.toString()?.trim(),
							value: singleSearch?.toString()?.trim(),
						}),
					);
				} else {
					newValues.push({ label: trimValue, value: trimValue });
				}

				if (props.item) {
					props.onChange?.({ ...props.item, values: newValues });
				}
			} else {
				const newValues = props.item?.values?.length ? [...props.item.values] : [];
				const filteredValues = newValues?.some((item) => item.value === val)
					? newValues.filter((v) => v.value !== val)
					: [
							...newValues,
							{
								label: val,
								value: val,
							},
						];

				if (props.item) {
					props.onChange?.({ ...props.item, values: filteredValues });
				}
			}
		},
		[props.onChange, props.item?.values, search],
	);

	const handleValueRemove = useCallback(
		(val?: string) => {
			const newValues = props.item?.values?.filter((v) => v.value !== val) || [];
			if (props.item) {
				props.onChange?.({ ...props.item, values: newValues });
			}
		},
		[props.item?.values, props.onChange],
	);

	const options = useMemo(
		() =>
			props.item?.values
				?.filter((item) => item.toString().toLowerCase().includes(search.trim().toLowerCase()))
				?.map((item) => (
					<Combobox.Option
						value={item.value as string}
						key={item.value as string}
						onClick={() => handleValueSelect(item.value as string)}
						active={props.item?.values?.includes(item)}
					>
						<Group gap="sm">
							{props.item?.values?.includes(item) ? (
								<CheckIcon onClick={() => handleValueSelect(item.value as string)} size={12} />
							) : null}
							<span>{item.label}</span>
						</Group>
					</Combobox.Option>
				)),
		[props.item?.values, search, handleValueSelect],
	);

	const elementValues = useMemo(
		() =>
			props.item?.values
				?.slice(0, maxDisplayItems === props.item.values.length ? maxDisplayItems : maxDisplayItems - 1)
				?.map((item) => (
					<Pill
						key={item.value as string}
						withRemoveButton
						onRemove={() => handleValueRemove(item.value as string)}
					>
						{item.label}
					</Pill>
				)),
		[props.item?.values, maxDisplayItems, handleValueRemove],
	);

	const showOptionsSection = (!exactOptionMatch && search.trim().length > 0) || options?.length || 0;

	console.log(props.item);
	return (
		<Flex key={`condition-row-values-${props.item?.id}`} direction="column" w={props.w} miw={props.miw}>
			<InputWrapper label={props.label} required={props.required}>
				<Combobox size={"sm"} store={combobox} withinPortal={true}>
					<Combobox.DropdownTarget>
						<PillsInput
							error={props.item?.error}
							onMouseEnter={props.onMouseEnter}
							onMouseLeave={props.onMouseLeave}
							disabled={props.item?.disabled}
							onClick={() => combobox.openDropdown()}
							rightSection={props.rightSection}
							rightSectionWidth={70}
							rightSectionProps={{
								onMouseEnter: props.onMouseEnter,
								onMouseLeave: props.onMouseLeave,
							}}
							onKeyDown={(event) => {
								if (event.key === "Enter" && search.length > 0) {
									event.preventDefault();
									handleValueSelect("$create");
								}
							}}
						>
							<ScrollArea scrollbarSize={2} scrollbars={"x"} w={"100%"}>
								<Flex gap={"2xs"} align={"center"}>
									{(props.item?.values?.length || 0) > 0 && (
										<>
											{elementValues}
											{(props.item?.values?.length || 0) > maxDisplayItems && (
												<Pill>+{(props.item?.values?.length || 0) - (maxDisplayItems - 1)} more</Pill>
											)}
										</>
									)}

									<Combobox.EventsTarget>
										<PillsInput.Field
											onFocus={() => combobox.openDropdown()}
											onBlur={() => combobox.closeDropdown()}
											value={search}
											placeholder="create Custom"
											unselectable="on"
											onChange={(event) => {
												combobox.updateSelectedOptionIndex();
												setSearch(event.currentTarget.value);
											}}
											onKeyDown={(event) => {
												if (event.key === "Backspace" && search.length === 0) {
													event.preventDefault();
													handleValueRemove(props.item?.values?.at(-1)?.value as string);
												}
											}}
										/>
									</Combobox.EventsTarget>
								</Flex>
							</ScrollArea>
						</PillsInput>
					</Combobox.DropdownTarget>
					{!!showOptionsSection && (
						<Combobox.Dropdown>
							<ScrollArea.Autosize type="hover" mah={200}>
								<Combobox.Options>
									{options}
									{!exactOptionMatch && search.trim().length > 0 && (
										<Combobox.Option onClick={() => handleValueSelect("$create")} value="$create">
											+ Create {search}
										</Combobox.Option>
									)}
									{exactOptionMatch && search.trim().length > 0 && options?.length === 0 && (
										<Combobox.Empty>Nothing found</Combobox.Empty>
									)}
								</Combobox.Options>
							</ScrollArea.Autosize>
						</Combobox.Dropdown>
					)}
				</Combobox>
			</InputWrapper>
		</Flex>
	);
}
