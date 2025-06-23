import { Flex, Select, Text } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import type { ICAppManagerPricingType } from "../../../../../index.types";
import classes from "./index.module.css";

type Props = {
	selectValue: ICAppManagerPricingType;
	setSelectValue: (selectValue: ICAppManagerPricingType) => void;
};

export default function ICAppManagerFilterPricing(props: Props) {
	return (
		<Flex gap={8} align="center">
			<Text fw={400} fz={12} c="#7D7F85">
				Pricing:
			</Text>
			<Select
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
					{ value: "ALL", label: "All" },
					{ value: "Free", label: "Free" },
					{ value: "Commercial", label: "Commercial" },
				]}
				defaultValue="ALL"
				checkIconPosition="right"
				allowDeselect={false}
				withCheckIcon={true}
				rightSection={<IconChevronDown width={20} />}
				value={props.selectValue}
				onChange={(value) =>
					props.setSelectValue(value as ICAppManagerPricingType)
				}
			/>
		</Flex>
	);
}
