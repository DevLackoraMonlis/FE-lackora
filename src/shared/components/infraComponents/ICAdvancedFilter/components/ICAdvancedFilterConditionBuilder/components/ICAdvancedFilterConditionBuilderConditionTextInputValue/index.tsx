import type { ICAdvancedFilterConditionBuilderCondition } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { TextInput, type TextInputProps } from "@mantine/core";
import { startTransition } from "react";
import { v4 } from "uuid";

type Props = {
	defaultProps: TextInputProps;
	onChange: (newCondition: ICAdvancedFilterConditionBuilderCondition) => void;
	condition: ICAdvancedFilterConditionBuilderCondition;
	validateIp?: boolean;
};

export default function ICAdvancedFilterConditionBuilderConditionTextInputValue(props: Props) {
	return (
		<TextInput
			{...props.defaultProps}
			value={props.condition.values?.[0]?.value?.toString() || ""}
			error={props.condition.error}
			disabled={props.condition.disabled}
			onChange={(event) => {
				startTransition(() => {
					props.onChange({ ...props.condition, values: [{ label: v4(), value: event.target.value }] });
				});
			}}
		/>
	);
}
