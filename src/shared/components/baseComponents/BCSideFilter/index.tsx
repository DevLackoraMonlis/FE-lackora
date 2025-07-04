import type { LabelValueType } from "@/shared/lib/general-types";
import { Badge, Card, Checkbox, Divider, Flex, Switch, Text, TextInput } from "@mantine/core";
import { DatePickerInput, DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconSearch, IconX } from "@tabler/icons-react";
import { Fragment, type ReactNode } from "react";

type FilterType = "Text" | "Date" | "DateTime" | "Switch" | "CheckedList";

type FilterItem = {
	type: FilterType;
	label: string;
	placeholder?: string;
	name: string;
	items?: (LabelValueType & { renderLabel?: (params: { label: string }) => ReactNode })[];
};

type FormValues = {
	search: string;
	[name: string]: unknown;
};

type Props = {
	onChange: (values: FormValues) => void;
	filterItems: FilterItem[];
	searchPlaceholder: string;
};

export default function BCSideFilter(props: Props) {
	const form = useForm<FormValues>({
		initialValues: {
			search: "",
		},
		onValuesChange: (values) => {
			props.onChange(values);
		},
	});

	const filterItemMap: (filterItem: FilterItem) => ReactNode = (filterItem) => {
		const itemMap: Record<FilterType, ReactNode> = {
			Date: (
				<DatePickerInput
					key={filterItem.name}
					{...form.getInputProps(filterItem.name)}
					placeholder={filterItem.placeholder}
					label={filterItem.label}
				/>
			),
			Text: (
				<TextInput
					key={filterItem.name}
					{...form.getInputProps(filterItem.name)}
					placeholder={filterItem.placeholder}
					label={filterItem.label}
				/>
			),
			Switch: (
				<Switch
					key={filterItem.name}
					{...form.getInputProps(filterItem.name, { type: "checkbox" })}
					placeholder={filterItem.placeholder}
					label={filterItem.label}
				/>
			),
			DateTime: (
				<DateTimePicker
					key={filterItem.name}
					{...form.getInputProps(filterItem.name)}
					placeholder={filterItem.placeholder}
					label={filterItem.label}
				/>
			),
			CheckedList: (
				<Fragment key={filterItem.name}>
					<Divider />
					<Checkbox.Group
						label={
							<Flex align="center" justify="space-between">
								<Text fw="normal">{filterItem.label}</Text>
								{!!(form.values[filterItem.name] as unknown[])?.length && (
									<Badge
										className="cursor-pointer"
										variant="light"
										color="gray"
										rightSection={<IconX size={10} />}
										onClick={() => form.setFieldValue(filterItem.name, undefined)}
									>
										<Text fz="xs" tt="capitalize">
											Clear Filter
										</Text>
									</Badge>
								)}
							</Flex>
						}
						{...form.getInputProps(filterItem.name)}
						styles={() => ({
							label: { width: "100%" },
						})}
						my="sm"
					>
						<Flex direction="column" gap="xs" py="xs">
							{filterItem.items?.map((item) => (
								<Checkbox
									key={item.value}
									{...item}
									label={item.renderLabel ? item.renderLabel({ label: item.label }) : item.label}
								/>
							))}
						</Flex>
					</Checkbox.Group>
				</Fragment>
			),
		};

		return itemMap[filterItem.type];
	};

	return (
		<Card withBorder shadow="sm" radius="md" bd="1px solid gray.4" h="80dvh">
			<form className={"h-full w-full"}>
				<Card.Section withBorder inheritPadding py="2xs" fw="bold" bg="gray.2">
					Filter
				</Card.Section>
				<Card.Section withBorder inheritPadding py="2xs">
					<TextInput
						my="sm"
						leftSection={
							form.values.search ? (
								<IconX
									size={15}
									onClick={() => form.setFieldValue("search", "")}
									className="cursor-pointer"
								/>
							) : (
								<IconSearch size={15} />
							)
						}
						variant="filled"
						radius="md"
						{...form.getInputProps("search")}
						placeholder={props.searchPlaceholder}
					/>
					<Divider />
					{props.filterItems.map((filterItem) => {
						if (filterItem.type === "CheckedList") {
							return (
								<>
									<Divider />
									{filterItemMap(filterItem)}
								</>
							);
						}
						return filterItemMap(filterItem);
					})}
				</Card.Section>
			</form>
		</Card>
	);
}
