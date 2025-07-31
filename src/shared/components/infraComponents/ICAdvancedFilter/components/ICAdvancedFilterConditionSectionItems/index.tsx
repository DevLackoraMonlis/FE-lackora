import ICAdvancedFilterConditionGroupByItem from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionGroupByItem";
import ICAdvancedFilterConditionItem from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionItem";
import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Button, Flex } from "@mantine/core";
import { IconPencil, IconX } from "@tabler/icons-react";
import { type Ref, useCallback } from "react";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

type Props<T> = {
	store: ICAdvancedFilterProps<T>["store"];
	run: ICAdvancedFilterProps<T>["run"];
	allColumns: ICAdvancedFilterProps<T>["allColumns"];
	hideConditionSection: ICAdvancedFilterProps<T>["hideConditionSection"];
	ref?: Ref<HTMLDivElement> | undefined;
};

const DeleteButtons = (props: { onDelete: VoidFunction; onEdit?: VoidFunction }) => {
	return (
		<Flex align={"center"}>
			<Button onClick={props.onEdit} px={"xs"} size={"xs"} variant={"transparent"}>
				<IconPencil size={16} />
			</Button>
			<Button px={"xs"} onClick={props.onDelete} size={"xs"} variant={"transparent"}>
				<IconX size={16} />
			</Button>
		</Flex>
	);
};

export default function ICAdvancedFilterConditionSectionItems<T>(props: Props<T>) {
	const store = useStore(
		props.store,
		useShallow((state) => ({
			variables: state.variables,
			setConditions: state.setConditions,
			setGroupBy: state.setGroupBy,
			setColumns: state.setColumns,
		})),
	);

	const getColumnOption = useCallback(
		(columnName: string) => {
			return props.allColumns.find((column) => column.name === columnName);
		},
		[props.allColumns],
	);

	if (props.hideConditionSection) {
		return null;
	}

	return (
		<Flex
			h={!store.variables.conditions.length && !store.variables.groupBy ? 0 : "auto"}
			ref={props.ref}
			align={"center"}
			bg={"gray.1"}
			px={"2xs"}
			mb={store.variables.conditions.length || store.variables.groupBy ? "xs" : 0}
		>
			{store.variables.conditions.map((condition, index) => (
				<ICAdvancedFilterConditionItem<T>
					run={props.run}
					getColumnOption={getColumnOption}
					key={condition.id}
					showNextOperator={index !== store.variables.conditions.length - 1}
					store={props.store}
					condition={condition}
				/>
			))}
			{!!store.variables.conditions.length && (
				<DeleteButtons
					onDelete={() => {
						store.setConditions([]);
						props.run();
					}}
				/>
			)}
			{store.variables.groupBy && (
				<Flex align={"center"}>
					{store.variables.columns.map((column) => (
						<ICAdvancedFilterConditionGroupByItem<T>
							run={props.run}
							allColumns={props.allColumns}
							key={column.name}
							store={props.store}
							columnName={column.name}
						/>
					))}
					<DeleteButtons
						onDelete={() => {
							store.setGroupBy(undefined);
							store.setColumns(props.allColumns.filter((column) => column.isDefault));
							props.run();
						}}
					/>
				</Flex>
			)}
		</Flex>
	);
}
