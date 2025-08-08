import type { ICAdvancedFilterConditionBuilderCondition } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { NumberInput, type NumberInputProps } from "@mantine/core";
import { startTransition } from "react";
import { v4 } from "uuid";

type Props = {
	defaultProps: NumberInputProps;
	onChange: (newCondition: ICAdvancedFilterConditionBuilderCondition) => void;
	condition: ICAdvancedFilterConditionBuilderCondition;
};

export default function ICAdvancedFilterConditionBuilderConditionNumberInputValue(props: Props) {
	return (
		<NumberInput
			{...props.defaultProps}
			value={props.condition.values?.[0]?.value?.toString() || ""}
			error={props.condition.error}
			hideControls
			disabled={props.condition.disabled}
			onChange={(value) => {
				startTransition(() => {
					props.onChange({ ...props.condition, values: [{ label: v4(), value: value }] });
				});
			}}
		/>
	);
}
