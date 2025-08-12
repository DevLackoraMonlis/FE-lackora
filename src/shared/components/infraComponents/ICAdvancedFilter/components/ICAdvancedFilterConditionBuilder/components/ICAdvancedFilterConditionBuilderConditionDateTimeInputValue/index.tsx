import type { ICAdvancedFilterConditionBuilderCondition } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { DateTimePicker, type DateTimePickerProps, type DateValue } from "@mantine/dates";
import { startTransition } from "react";

type Props = {
	defaultProps: DateTimePickerProps;
	onChange: (newCondition: ICAdvancedFilterConditionBuilderCondition) => void;
	condition: ICAdvancedFilterConditionBuilderCondition;
};

export default function ICAdvancedFilterConditionBuilderConditionDateTimeInputValue(props: Props) {
	return (
		<DateTimePicker
			{...props.defaultProps}
			error={props.condition.error}
			value={props.condition.values?.[0]?.value ? (props.condition.values[0].value as DateValue) : null}
			disabled={props.condition.disabled}
			onChange={(value) => {
				startTransition(() => {
					props.onChange({
						...props.condition,
						values: [{ label: `${value}`, value: value || "" }],
					});
				});
			}}
		/>
	);
}
