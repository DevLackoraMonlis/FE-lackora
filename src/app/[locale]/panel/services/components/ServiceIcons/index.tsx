import { Group, Select, type SelectProps } from "@mantine/core";

import { SERVICE_ICONS } from "../../lib/index.constants";

const iconProps = {
	stroke: 1.5,
	color: "currentColor",
	opacity: 0.6,
	size: 18,
};

const renderSelectOption: SelectProps["renderOption"] = ({ option }) => {
	const Icon = SERVICE_ICONS[option.value];
	return (
		<Group flex="1" gap="xs">
			{Icon && <Icon {...iconProps} />}
			{option.label}
		</Group>
	);
};

export default function ServiceIcons({ color, ...props }: SelectProps) {
	return (
		<Select
			withAsterisk
			label="Service Icon"
			description="Icon of service to show in pages"
			placeholder="Select text align"
			data={[
				{ value: "IconButterfly", label: "IconButterfly" },
				{ value: "IconInfinity", label: "IconInfinity" },
			]}
			renderOption={renderSelectOption}
			{...props}
		/>
	);
}
