import BCModal from "@/shared/components/baseComponents/BCModal";
import ICAdvancedFilterConditionBuilder from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionBuilder";
import ICAdvancedFilterConditionItemReadonly from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionItemReadonly";
import { IC_ADVANCED_FILTER_CONDITION_EMPTY_OPERATORS } from "@/shared/components/infraComponents/ICAdvancedFilter/index.constants";
import type {
	ICAdvancedFilterConditionBuilderCondition,
	ICAdvancedFilterProps,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { EmptyData } from "@/shared/icons/components/general";
import { Box, Button, Flex, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { omit } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

type Props<T> = {
	store: ICAdvancedFilterProps<T>["store"];
	run: ICAdvancedFilterProps<T>["run"];
	allColumns: ICAdvancedFilterProps<T>["allColumns"];
};

const initCondition: ICAdvancedFilterConditionBuilderCondition = {
	id: v4(),
	closeBracket: 0,
	openBracket: 0,
	values: [],
	nextOperator: "and",
	error: true,
	disabled: false,
};

export default function ICAdvancedFilterConditionModal<T>(props: Props<T>) {
	const { height } = useViewportSize();
	const store = useStore(
		props.store,
		useShallow((state) => ({
			variables: state.variables,
			setConditions: state.setConditions,
			setOpenFilterConditionModal: state.setOpenFilterConditionModal,
			openedFilterConditionModal: state.openedFilterConditionModal,
		})),
	);

	const [conditions, setConditions] = useState<ICAdvancedFilterConditionBuilderCondition[]>([]);

	const isError = conditions.some((item) => item.error || !!item.bracketError);

	const defaultConditions = useMemo(
		() =>
			store.variables.conditions.map((item) => ({
				...item,
				error: false,
				disabled: IC_ADVANCED_FILTER_CONDITION_EMPTY_OPERATORS.includes(item.operator as string),
			})),
		[store.variables.conditions],
	);

	useEffect(() => {
		if (defaultConditions.length && store.openedFilterConditionModal) {
			setConditions(defaultConditions);
		}
	}, [defaultConditions, store.openedFilterConditionModal]);

	const handleClose = () => {
		setConditions([]);
		store.setOpenFilterConditionModal(false);
	};

	const calculatedHeight = conditions.length === 1 ? 150 : (conditions.length - 1) * 33 + 150;
	const maxHeight = height - 300;

	return (
		<BCModal
			keepMounted={false}
			title={"Build Filter"}
			size={1024}
			opened={store.openedFilterConditionModal}
			onClose={handleClose}
		>
			<Flex direction={"column"} p={"xs"} gap={"2xs"}>
				{!!conditions.length && (
					<Text>Create one or more conditions to filter your data. Combine them using AND or OR.</Text>
				)}

				<Box bg={"gray.1"} w={"100%"} h={"fit-content"} mih={350}>
					{conditions.length ? (
						<ICAdvancedFilterConditionBuilder
							onChange={setConditions}
							allColumns={props.allColumns}
							conditions={conditions}
							h={calculatedHeight <= maxHeight ? calculatedHeight : maxHeight}
							w={950}
						/>
					) : (
						<Flex gap={"sm"} direction={"column"} p={"xl"} align={"center"} justify={"center"}>
							<EmptyData width={100} height={98} />
							<Text fw={"bolder"} fz={"md"}>
								No conditions added yet!
							</Text>
							<Text>
								Create one or more conditions to filter your data. Combine them using AND or OR. Add your
								first condition using the button below
							</Text>
							<Button
								onClick={() => {
									setConditions([initCondition]);
								}}
								leftSection={<IconPlus />}
								color={"main"}
							>
								Create First Condition
							</Button>
						</Flex>
					)}
				</Box>
				{!!conditions.length && (
					<Flex bg={"white"} align={"center"} mb={50} gap={"xs"}>
						{conditions.length && (
							<Text fz={"xs"} fw={"bolder"}>
								IF
							</Text>
						)}
						{conditions.map((condition, index) => (
							<ICAdvancedFilterConditionItemReadonly
								showNextOperator={conditions.length - 1 !== index}
								condition={condition}
								key={condition.id}
							/>
						))}
					</Flex>
				)}
			</Flex>

			<BCModal.EmptyFooter>
				<Flex
					className={"w-full h-full"}
					bg={"white"}
					gap={"xs"}
					p={"xs"}
					justify={"flex-end"}
					align={"center"}
				>
					<Button
						onClick={() => {
							if (isError) {
								return;
							}
							store.setConditions(conditions.map((item) => omit(item, ["error", "disabled"])));
							props.run();
							store.setOpenFilterConditionModal(false);
						}}
						disabled={!conditions.length || isError}
						size={"xs"}
					>
						Apply Filter
					</Button>
					<Button
						onClick={() => {
							setConditions(defaultConditions);
						}}
						disabled={!conditions.length}
						size={"xs"}
						variant={"outline"}
					>
						Reset Filter
					</Button>
					<Button onClick={handleClose} size={"xs"} variant={"default"}>
						Cancel
					</Button>
				</Flex>
			</BCModal.EmptyFooter>
		</BCModal>
	);
}
