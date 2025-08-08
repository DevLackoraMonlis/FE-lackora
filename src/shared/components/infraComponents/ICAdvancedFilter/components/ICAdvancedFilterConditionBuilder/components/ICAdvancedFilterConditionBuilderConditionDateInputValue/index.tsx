import type { ICAdvancedFilterConditionBuilderCondition } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { DatePickerInput, type DatePickerInputProps, type DateValue } from "@mantine/dates";
import { startTransition } from "react";
import { v4 } from "uuid";

type Props = {
	defaultProps: DatePickerInputProps;
	onChange: (newCondition: ICAdvancedFilterConditionBuilderCondition) => void;
	condition: ICAdvancedFilterConditionBuilderCondition;
};

export default function ICAdvancedFilterConditionBuilderConditionDateInputValue(props: Props) {
	return (
		<DatePickerInput
			{...props.defaultProps}
			allowDeselect={false}
			disabled={props.condition.disabled}
			error={props.condition.error}
			value={props.condition.values?.[0]?.value ? (props.condition.values[0].value as DateValue) : null}
			onChange={(value) => {
				startTransition(() => {
					props.onChange({
						...props.condition,
						values: [{ label: v4(), value: value || "" }],
					});
				});
			}}
		/>
	);
}
