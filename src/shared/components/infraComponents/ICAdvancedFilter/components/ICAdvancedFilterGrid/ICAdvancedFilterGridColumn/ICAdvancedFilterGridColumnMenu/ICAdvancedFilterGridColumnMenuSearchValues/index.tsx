import type { TanStackDataTableColumnColDef } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import {
	IC_ADVANCED_FILTER_DEFAULT_OPERATORS,
	IC_ADVANCED_FILTER_OPERATORS_MAP,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.constants";
import type {
	ICAdvancedConditionValueTypeRq,
	ICAdvancedFilterColumnType,
	ICAdvancedFilterCondition,
	ICAdvancedFilterConditionOperator,
	ICAdvancedFilterProps,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { validateInput } from "@/shared/lib/utils";
import type { ModalDefaultProps } from "@/shared/types/index.types";
import { Button, Flex, Menu, NumberInput, Select, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { v4 } from "uuid";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

type Props<T> = ModalDefaultProps & {
	store: ICAdvancedFilterProps<T>["store"];
	allColumns: ICAdvancedFilterProps<T>["allColumns"];
	run: ICAdvancedFilterProps<T>["run"];
	column: TanStackDataTableColumnColDef<T>;
};

type FormValues = {
	operator: string;
	values: unknown[] | string;
};

export default function ICAdvancedFilterGridColumnMenuSearchValues<T>(props: Props<T>) {
	const store = useStore(
		props.store,
		useShallow((state) => ({
			addCondition: state.addCondition,
		})),
	);

	const getColumnOptions = props.allColumns.find((column) => column.name === props.column.accessor);

	const numberTypes: ICAdvancedFilterColumnType[] = ["Int64"];

	const getOperatorInput = () => {
		if (getColumnOptions?.options?.length) {
			return (
				<Select
					data={getColumnOptions?.options || []}
					label={getColumnOptions?.displayName || ""}
					multiple
					{...form.getInputProps("values")}
					allowDeselect={false}
				/>
			);
		}

		if (getColumnOptions?.type === "Boolean") {
			return (
				<Switch
					label={getColumnOptions?.displayName || ""}
					{...form.getInputProps("values", { type: "checkbox" })}
				/>
			);
		}
		if (numberTypes.includes(getColumnOptions?.type || "String")) {
			return (
				<NumberInput
					label={getColumnOptions?.displayName || ""}
					{...form.getInputProps("values")}
					hideControls
					allowDecimal={false}
				/>
			);
		}

		return <TextInput {...form.getInputProps("values")} label={getColumnOptions?.displayName || ""} />;
	};

	const form = useForm<FormValues>({
		initialValues: {
			operator: IC_ADVANCED_FILTER_DEFAULT_OPERATORS["="],
			values: [],
		},
		validate: {
			values: (value) => validateInput(value, { required: true }),
		},
	});

	const onSubmit = (formValues: FormValues) => {
		if (getColumnOptions) {
			const condition: ICAdvancedFilterCondition = {
				id: v4(),
				operator: formValues.operator as ICAdvancedFilterConditionOperator,
				columnName: getColumnOptions.name,
				openBracket: 0,
				closBracket: 0,
				nextOperator: "and",
				values: (getColumnOptions.options?.length
					? (formValues.values as string[]).map((item) => ({ label: item, value: item }))
					: [
							{
								label: formValues.values as string,
								value: formValues.values as string,
							},
						]) satisfies ICAdvancedConditionValueTypeRq[],
			};
			store.addCondition(condition);
			props.run();
		}
	};

	if (props.opened) {
		return (
			<Menu.Dropdown>
				<form onSubmit={form.onSubmit(onSubmit)}>
					<Flex p={"md"} direction={"column"}>
						<Select
							data={
								!getColumnOptions?.type || getColumnOptions?.type === "Boolean"
									? Object.entries(IC_ADVANCED_FILTER_OPERATORS_MAP.String).map(([key, value]) => ({
											label: key,
											value,
										}))
									: Object.entries(IC_ADVANCED_FILTER_OPERATORS_MAP[getColumnOptions.type]).map(
											([key, value]) => ({
												label: key,
												value,
											}),
										)
							}
							{...form.getInputProps("operator")}
							allowDeselect={false}
							label={"Operation"}
						/>
						{getOperatorInput()}
						<Flex justify={"flex-end"}>
							<Button type={"submit"} size={"xs"}>
								Apply
							</Button>
							<Button
								onClick={() => {
									form.reset();
									props.onClose();
								}}
								variant={"default"}
								size={"xs"}
							>
								Cancel
							</Button>
						</Flex>
					</Flex>
				</form>
			</Menu.Dropdown>
		);
	}
	return null;
}
