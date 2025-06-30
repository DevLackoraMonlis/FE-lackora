import { Flex, Select, Text } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import type { ICAppManagerRqSortByType } from "../../../../../index.types";
import classes from "./index.module.css";

type Props = {
	selectValue: ICAppManagerRqSortByType;
	setSelectValue: (selectValue: ICAppManagerRqSortByType) => void;
};
export default function ICAppManagerFilterSorting(props: Props) {
	return (
		<Flex gap={8} align="center">
			<Text fw={400} fz={12} c="#7D7F85">
				Sort by:
			</Text>
			<Select
				allowDeselect={false}
				classNames={{
					root: classes.selectRoot,
					input: classes.selectInput,
					wrapper: classes.selectWrapper,
					section: classes.selectSection,
					options: classes.selectOptions,
					option: classes.selectOption,
					dropdown: classes.selectDropdown,
				}}
				data={[
					{ value: "Name", label: "Name" },
					{ value: "Newest", label: "Newest" },
					{ value: "Oldest", label: "Oldest" },
				]}
				checkIconPosition="right"
				withCheckIcon={true}
				defaultValue="Name"
				rightSection={<IconChevronDown width={20} />}
				value={props.selectValue}
				onChange={(value) => props.setSelectValue(value as ICAppManagerRqSortByType)}
			/>
		</Flex>
	);
}
