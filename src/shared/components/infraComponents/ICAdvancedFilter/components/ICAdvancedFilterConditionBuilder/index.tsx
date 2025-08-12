import BCSortable from "@/shared/components/baseComponents/BCSortable";
import ICAdvancedFilterConditionBuilderConditionDateInputValue from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionBuilder/components/ICAdvancedFilterConditionBuilderConditionDateInputValue";
import ICAdvancedFilterConditionBuilderConditionDateTimeInputValue from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionBuilder/components/ICAdvancedFilterConditionBuilderConditionDateTimeInputValue";
import ICAdvancedFilterConditionBuilderConditionNumberInputValue from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionBuilder/components/ICAdvancedFilterConditionBuilderConditionNumberInputValue";
import ICAdvancedFilterConditionBuilderConditionRow from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionBuilder/components/ICAdvancedFilterConditionBuilderConditionRow";
import ICAdvancedFilterConditionBuilderConditionTextInputValue from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionBuilder/components/ICAdvancedFilterConditionBuilderConditionTextInputValue";
import ICAdvancedFilterCreatableMultiSelect from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterCreatableMultiSelect";
import {
	IC_ADVANCED_FILTER_CONDITION_BUILDER_DEFAULT_WIDTH,
	IC_ADVANCED_FILTER_CONDITION_EMPTY_OPERATORS,
	IC_ADVANCED_FILTER_CONDITION_MULTIPLE_VALUE_TYPES,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.constants";
import { checkBracketBalance } from "@/shared/components/infraComponents/ICAdvancedFilter/index.helper";
import type {
	ICAdvancedFilterColumnRs,
	ICAdvancedFilterConditionBuilderCondition,
	ICAdvancedFilterConditionBuilderProps,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { validateInput } from "@/shared/lib/utils";
import { Button, Flex, ScrollArea, Select, Switch } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { startTransition, useCallback, useMemo } from "react";
import { v4 } from "uuid";

export default function ICAdvancedFilterConditionBuilder(props: ICAdvancedFilterConditionBuilderProps) {
	const getColumnOption = useCallback(
		(columnName: string) => {
			return props.allColumns.find((column) => column.name === columnName);
		},
		[props.allColumns],
	);

	const onChangeBrackets = useCallback(
		(id: string, type: "PlusOpen" | "MinusOpen" | "PlusClose" | "MinusClose") => {
			const newConditions = [...props.conditions];
			const findCondition = newConditions.find((item) => item.id === id);

			let anyChange = false;
			if (findCondition) {
				if (type === "PlusOpen") {
					findCondition.openBracket += 1;
					anyChange = true;
				}

				if (type === "PlusClose") {
					findCondition.closeBracket += 1;
					anyChange = true;
				}

				if (type === "MinusOpen" && findCondition?.openBracket > 0) {
					findCondition.openBracket -= 1;
					anyChange = true;
				}

				if (type === "MinusClose" && findCondition?.closeBracket > 0) {
					findCondition.closeBracket -= 1;
					anyChange = true;
				}
			}

			const bracketErrors = checkBracketBalance(newConditions);

			const updatedErrorConditions = newConditions.map((item) => {
				const updatedItem = { ...item };
				const findError = bracketErrors.find((errorItem) => errorItem.itemId === item.id);
				updatedItem.error = !!findError;
				updatedItem.bracketError = findError;
				return updatedItem;
			});

			if (anyChange) {
				props.onChange(updatedErrorConditions);
			}
		},
		[props.conditions],
	);

	const onChange = useCallback(
		(newCondition: ICAdvancedFilterConditionBuilderCondition) => {
			const newConditions = [...props.conditions];
			const findCondition = newConditions.find((condition) => condition.id === newCondition.id);
			if (findCondition) {
				const columnOption = getColumnOption(findCondition?.columnName || "");
				let anyError = false;
				if (columnOption?.type === "IP") {
					newCondition.values.forEach((item) => {
						if (validateInput(item.value, { mustBeIP: true })) {
							anyError = true;
						}
					});
				}

				// check empty values for error for non empty operators
				if (!IC_ADVANCED_FILTER_CONDITION_EMPTY_OPERATORS.includes(newCondition.operator as string)) {
					if (!newCondition.values.length || newCondition.values.some((item) => !item.value)) {
						anyError = true;
					}
				}

				const hasError = !findCondition.disabled && anyError;
				Object.assign(findCondition, newCondition, { error: hasError });
			}

			startTransition(() => {
				props.onChange(newConditions);
			});
		},
		[props.conditions, props.onChange],
	);

	const onRemove = useCallback(
		(conditionId: string) => {
			startTransition(() => {
				props.onChange(props.conditions.filter((item) => item.id !== conditionId));
			});
		},
		[props.conditions, props.onChange],
	);

	const columns = useMemo(
		() => props.allColumns.map((item) => ({ label: item.displayName, value: item.name })),
		[props.allColumns],
	);

	const defaultInputProps = useCallback(
		(id: string, index: number) => ({
			required: true,
			label: index === 0 && "Value",
			w: IC_ADVANCED_FILTER_CONDITION_BUILDER_DEFAULT_WIDTH,
			miw: IC_ADVANCED_FILTER_CONDITION_BUILDER_DEFAULT_WIDTH,
			key: `condition-row-value-${id}`,
		}),
		[],
	);

	const getIsMultipleInput = useCallback(
		(operator: ICAdvancedFilterConditionBuilderCondition["operator"]) =>
			operator && IC_ADVANCED_FILTER_CONDITION_MULTIPLE_VALUE_TYPES.includes(operator),
		[],
	);

	const getSingleValueInput = useCallback(
		(
			condition: ICAdvancedFilterConditionBuilderCondition,
			index: number,
			columnOption?: ICAdvancedFilterColumnRs,
		) => ({
			String: (
				<ICAdvancedFilterConditionBuilderConditionTextInputValue
					condition={condition}
					defaultProps={defaultInputProps(condition.id, index)}
					onChange={onChange}
					validateIp={false}
				/>
			),
			Boolean: (
				<Switch
					{...defaultInputProps(condition.id, index)}
					onChange={(event) =>
						onChange({
							...condition,
							values: [
								{ label: event.currentTarget.checked ? "true" : "false", value: event.currentTarget.checked },
							],
						})
					}
				/>
			),
			List: (
				<Select
					multiple
					{...defaultInputProps(condition.id, index)}
					error={condition.error}
					onChange={(value) =>
						onChange({ ...condition, values: [{ label: value as string, value: value as string }] })
					}
					allowDeselect={false}
					data={columnOption?.options}
				/>
			),
			IP: (
				<ICAdvancedFilterConditionBuilderConditionTextInputValue
					condition={condition}
					defaultProps={defaultInputProps(condition.id, index)}
					onChange={onChange}
					validateIp
				/>
			),
			Int64: (
				<ICAdvancedFilterConditionBuilderConditionNumberInputValue
					condition={condition}
					defaultProps={defaultInputProps(condition.id, index)}
					onChange={onChange}
				/>
			),
			DateTime: (
				<ICAdvancedFilterConditionBuilderConditionDateTimeInputValue
					condition={condition}
					defaultProps={defaultInputProps(condition.id, index)}
					onChange={onChange}
				/>
			),
			Date: (
				<ICAdvancedFilterConditionBuilderConditionDateInputValue
					condition={condition}
					defaultProps={defaultInputProps(condition.id, index)}
					onChange={onChange}
				/>
			),
		}),
		[onChange, defaultInputProps],
	);

	const multiValueInput = useCallback(
		(condition: ICAdvancedFilterConditionBuilderCondition, index: number) => (
			<ICAdvancedFilterCreatableMultiSelect<ICAdvancedFilterConditionBuilderCondition>
				w={IC_ADVANCED_FILTER_CONDITION_BUILDER_DEFAULT_WIDTH}
				miw={IC_ADVANCED_FILTER_CONDITION_BUILDER_DEFAULT_WIDTH}
				required
				item={condition}
				onChange={onChange}
				label={index === 0 && "Value"}
			/>
		),
		[onChange],
	);

	const getInputValue = useCallback(
		(
			condition: ICAdvancedFilterConditionBuilderCondition,
			index: number,
			columnOption?: ICAdvancedFilterColumnRs,
		) =>
			getIsMultipleInput(condition.operator) || columnOption?.type === "List"
				? multiValueInput(condition, index)
				: columnOption?.type && condition.operator
					? getSingleValueInput(condition, index, columnOption)[columnOption.type]
					: null,
		[multiValueInput, getIsMultipleInput, getSingleValueInput],
	);

	return (
		<ScrollArea
			h={props.h || 800}
			scrollbars={"xy"}
			scrollbarSize={2}
			w={"100%"}
			miw={"100%"}
			bg={"gray.1"}
			p={"xs"}
		>
			<Flex direction={"column"} gap={"2xs"} h={"100%"} w={"100%"}>
				<BCSortable<ICAdvancedFilterConditionBuilderCondition>
					items={props.conditions}
					handleItemChange={(_e, newConditions) => {
						const oldConditions = [...props.conditions];
						const updatedConditions = newConditions.map((newCondition, index) => {
							const findInOld = oldConditions[index];

							return {
								...newCondition,
								openBracket: findInOld.openBracket,
								closeBracket: findInOld.closeBracket,
							};
						});
						props.onChange(updatedConditions);
					}}
				>
					{props.conditions.map((condition, index) => {
						const columnOption = getColumnOption(condition.columnName || "");
						return (
							<ICAdvancedFilterConditionBuilderConditionRow
								onRemove={() => onRemove(condition.id)}
								index={index}
								onMinusCloseBracket={() => onChangeBrackets(condition.id, "MinusClose")}
								onMinusOpenBracket={() => onChangeBrackets(condition.id, "MinusOpen")}
								columns={columns}
								onPlusCloseBracket={() => onChangeBrackets(condition.id, "PlusClose")}
								onPlusOpenBracket={() => onChangeBrackets(condition.id, "PlusOpen")}
								key={condition.id}
								condition={condition}
								columnOption={columnOption}
								onChange={onChange}
								inputValue={getInputValue(condition, index, columnOption)}
								isLastCondition={props.conditions.length - 1 === index}
							/>
						);
					})}
				</BCSortable>

				<Button
					mt={"xs"}
					onClick={() => {
						const newCondition: ICAdvancedFilterConditionBuilderCondition = {
							closeBracket: 0,
							id: v4(),
							values: [],
							nextOperator: "and",
							openBracket: 0,
							error: true,
							disabled: false,
						};

						const newConditions = [...props.conditions];
						newConditions.push(newCondition);
						props.onChange(newConditions);
					}}
					pl={0}
					w={"fit-content"}
					size={"xs"}
					variant={"transparent"}
					leftSection={<IconPlus size={16} />}
				>
					Add another
				</Button>
			</Flex>
		</ScrollArea>
	);
}
