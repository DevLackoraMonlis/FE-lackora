import type { LabelValueType } from "@/shared/lib/general-types";
import { Badge, Card, Checkbox, Divider, Flex, ScrollArea, Switch, Text, TextInput } from "@mantine/core";
import { DatePickerInput, DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconSearch, IconX } from "@tabler/icons-react";
import { Fragment, type ReactNode } from "react";
import { useRenderLabel } from "./index.hooks";

type FilterType = "Text" | "Date" | "DateTime" | "Switch" | "CheckedList";

export type RenderLabel = (params: BCSideFilterItemOption, filterItem: BCSideFilterItem) => React.ReactNode;
type BCSideFilterItemOption = LabelValueType & {
	renderLabel?: RenderLabel;
};

export type BCSideFilterItem = {
	type: FilterType;
	label: string;
	placeholder?: string;
	name: string;
	items?: BCSideFilterItemOption[];
	order?: number;
};

type FormValues = {
	search: string;
	[name: string]: unknown;
};

type Props = {
	onChange: (values: FormValues) => void;
	filterItems: BCSideFilterItem[];
	searchPlaceholder: string;
	height?: number;
};

export default function BCSideFilter(props: Props) {
	const { renderLabel: defaultRenderLabel } = useRenderLabel();
	const form = useForm<FormValues>({
		initialValues: {
			search: "",
		},
		onValuesChange: (values) => {
			props.onChange(values);
		},
	});

	const filterItemMap: (filterItem: BCSideFilterItem) => ReactNode = (filterItem) => {
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
					my="xs"
					size="md"
					labelPosition="left"
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
										onClick={() => form.setFieldValue(filterItem.name, [])}
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
									value={item.value}
									label={
										item.renderLabel
											? item.renderLabel(item, filterItem)
											: defaultRenderLabel(item, filterItem)
									}
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
		<Card withBorder shadow="sm" radius="md" bd="1px solid gray.4" className={"h-full"}>
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
					<ScrollArea h={props.height || "fit-content"}>
						{props.filterItems
							.sort((a, b) => (b?.order || 0) - (a.order || 0))
							.map((filterItem) => {
								if (filterItem.type === "CheckedList") {
									return (
										<Fragment key={filterItem.name}>
											<Divider />
											{filterItemMap(filterItem)}
										</Fragment>
									);
								}
								return filterItemMap(filterItem);
							})}
					</ScrollArea>
				</Card.Section>
			</form>
		</Card>
	);
}
