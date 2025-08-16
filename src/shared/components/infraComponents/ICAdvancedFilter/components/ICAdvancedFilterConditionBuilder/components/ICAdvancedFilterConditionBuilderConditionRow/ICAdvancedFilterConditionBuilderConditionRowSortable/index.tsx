import ICAdvancedFilterMotionElement from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterMotionElement";
import {
	IC_ADVANCED_FILTER_CONDITION_EMPTY_OPERATORS,
	IC_ADVANCED_FILTER_OPERATORS_MAP,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.constants";
import type {
	ICAdvancedFilterConditionBuilderRowProps,
	ICAdvancedFilterConditionOperator,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { Flex, Select } from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";

export default function ICAdvancedFilterConditionBuilderConditionRowSortable(
	props: ICAdvancedFilterConditionBuilderRowProps & {
		listener?: SyntheticListenerMap;
	},
) {
	return (
		<Flex align={"end"} w={"fit-content"} gap={"xs"}>
			<Flex align={"flex-end"}>
				<Flex {...props.listener} h={34} w={34} miw={32} align={"center"} justify={"center"}>
					<IconGripVertical size={16} />
				</Flex>
				<ICAdvancedFilterMotionElement disableConditional>
					<Select
						error={!props.condition.columnName}
						miw={200}
						w={200}
						key={`condition-row-columnName-${props.condition.id}`}
						value={props.condition.columnName}
						onChange={(value) => {
							props.onChange({
								...props.condition,
								columnName: value || undefined,
								values: [],
								error: false,
								disabled: false,
							});
						}}
						required
						size={"sm"}
						label={props.index === 0 && "Attribute"}
						allowDeselect={false}
						data={props.columns}
					/>
				</ICAdvancedFilterMotionElement>
			</Flex>
			<ICAdvancedFilterMotionElement showConditionalElement={!!props.condition.columnName}>
				<Select
					w={100}
					error={!props.condition.operator}
					key={`condition-row-operator-${props.condition.id}`}
					value={props.condition.operator}
					required
					size={"sm"}
					miw={100}
					onChange={(value) => {
						const isEmptyOperator = value && IC_ADVANCED_FILTER_CONDITION_EMPTY_OPERATORS.includes(value);

						props.onChange({
							...props.condition,
							operator: (value || undefined) as ICAdvancedFilterConditionOperator | undefined,
							values: [],
							disabled: !!isEmptyOperator,
							error: false,
						});
					}}
					label={props.index === 0 && "Operation"}
					allowDeselect={false}
					data={
						props.columnOption?.type
							? Object.entries(IC_ADVANCED_FILTER_OPERATORS_MAP[props.columnOption.type]).map(
									([key, value]) => ({ label: key, value }),
								)
							: []
					}
				/>
			</ICAdvancedFilterMotionElement>
			<ICAdvancedFilterMotionElement showConditionalElement={!!props.inputValue}>
				{props.inputValue}
			</ICAdvancedFilterMotionElement>
		</Flex>
	);
}
