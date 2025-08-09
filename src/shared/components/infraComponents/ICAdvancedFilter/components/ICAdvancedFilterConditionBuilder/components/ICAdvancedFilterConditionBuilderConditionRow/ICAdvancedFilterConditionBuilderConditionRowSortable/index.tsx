import ICAdvancedFilterMotionElement from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterMotionElement";
import {
	IC_ADVANCED_FILTER_CONDITION_COLUMN_OPERATORS,
	IC_ADVANCED_FILTER_CONDITION_EMPTY_OPERATORS,
	IC_ADVANCED_FILTER_OPERATORS_MAP,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.constants";
import type {
	ICAdvancedFilterConditionBuilderRowProps,
	ICAdvancedFilterConditionOperator,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { Flex, Grid, Select } from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";
import { v4 } from "uuid";

export default function ICAdvancedFilterConditionBuilderConditionRowSortable(
	props: ICAdvancedFilterConditionBuilderRowProps & {
		listener?: SyntheticListenerMap;
	},
) {
	return (
		<Grid gutter={0} align={"end"} miw={700} w={"100%"}>
			<Grid.Col span={4}>
				<Flex align={"flex-end"}>
					<Flex {...props.listener} h={34} w={34} miw={32} align={"center"} justify={"center"}>
						<IconGripVertical size={16} />
					</Flex>
					<ICAdvancedFilterMotionElement disableConditional>
						<Select
							error={!props.condition.columnName}
							miw={200}
							w={"100%"}
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
			</Grid.Col>
			<Grid.Col span={3} pl={"xs"}>
				<ICAdvancedFilterMotionElement showConditionalElement={!!props.condition.columnName}>
					<Select
						w={"100%"}
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
			</Grid.Col>
			<Grid.Col span={5} pl={"xs"} pos={"relative"}>
				<ICAdvancedFilterMotionElement showConditionalElement={!!props.inputValue}>
					{IC_ADVANCED_FILTER_CONDITION_COLUMN_OPERATORS.includes(props.condition.operator as string) ? (
						<Select
							error={!props.condition.values?.[0]?.value}
							miw={220}
							w={"100%"}
							key={`condition-row-value-${props.condition.id}`}
							value={(props.condition.values?.[0]?.value as string) || ""}
							onChange={(value) => {
								props.onChange({
									...props.condition,
									values: [{ label: v4(), value }],
									error: false,
									disabled: false,
								});
							}}
							required
							size={"sm"}
							label={props.index === 0 && "Value"}
							allowDeselect={false}
							data={props.columns}
						/>
					) : (
						props.inputValue
					)}
				</ICAdvancedFilterMotionElement>
			</Grid.Col>
		</Grid>
	);
}
