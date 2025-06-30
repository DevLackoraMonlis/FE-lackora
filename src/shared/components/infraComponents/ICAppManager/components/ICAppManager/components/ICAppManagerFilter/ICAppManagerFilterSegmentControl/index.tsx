import { SegmentedControl } from "@mantine/core";
import type { ICAppManagerRqFilterType } from "../../../../../index.types";
import { PLUGIN_MANAGER_FILTER_SEGMENT_ITEM } from "./index.constants";

type Props = {
	selectedType: ICAppManagerRqFilterType;
	setSelectedType: (selectedType: ICAppManagerRqFilterType) => void;
	info: Record<ICAppManagerRqFilterType, number>;
};

export default function ICAppManagerFilterSegmentControl(props: Props) {
	return (
		<SegmentedControl
			display="flex"
			color="primary"
			value={props.selectedType}
			onChange={(value) => props.setSelectedType(value as ICAppManagerRqFilterType)}
			data={PLUGIN_MANAGER_FILTER_SEGMENT_ITEM.map((item) => {
				return {
					label: `${item?.label} (${props.info[item.value] || 0})`,
					value: item.value,
				};
			})}
		/>
	);
}
