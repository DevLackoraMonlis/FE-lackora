import BCModal from "@/shared/components/baseComponents/BCModal";
import {
	IC_ADVANCED_FILTER_INT64_OPERATORS,
	IC_ADVANCED_FILTER_OPERATORS_MAP,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.constants";
import { ICAdvancedGroupByFunctions } from "@/shared/components/infraComponents/ICAdvancedFilter/index.enum";
import type {
	ICAdvancedFilterConditionOperator,
	ICAdvancedFilterGroupByRq,
	ICAdvancedFilterOrder,
	ICAdvancedFilterProps,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Box, Button, Flex, Grid, NumberInput, Select, TagsInput, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

type Props<T> = {
	store: ICAdvancedFilterProps<T>["store"];
	run: ICAdvancedFilterProps<T>["run"];
	allColumns: ICAdvancedFilterProps<T>["allColumns"];
};

export default function ICAdvancedFilterGroupByModal<T>(props: Props<T>) {
	const store = useStore(
		props.store,
		useShallow((state) => ({
			variables: state.variables,
			setConditions: state.setConditions,
			setOpenGroupByModal: state.setOpenGroupByModal,
			openedGroupByModal: state.openedGroupByModal,
			setGroupBy: state.setGroupBy,
			setColumns: state.setColumns,
		})),
	);

	const [groupBy, setGroupBy] = useState<ICAdvancedFilterGroupByRq | undefined>();

	const [columns, setColumns] = useState<string[]>([]);

	const aggregationCondition = groupBy?.aggregatedConditions?.[0];
	const isError =
		(groupBy?.aggregatedConditions.length && !aggregationCondition?.values?.[0]?.value) ||
		!columns.length ||
		!groupBy?.function;

	const handleClose = () => {
		setGroupBy(undefined);
		setColumns([]);
		store.setOpenGroupByModal(false);
	};

	useEffect(() => {
		if (store.variables.groupBy && store.openedGroupByModal) {
			setGroupBy(store.variables.groupBy);
			if (store.variables.groupBy && store.variables.columns.length) {
				setColumns(store.variables.columns.map((item) => item.name));
			}
		}
	}, [store.variables, store.openedGroupByModal]);

	return (
		<BCModal title={"Group by"} size={600} opened={store.openedGroupByModal} onClose={handleClose}>
			<Flex direction={"column"} p={"xs"} gap={"2xs"}>
				<Text>Select fields(s) to group by</Text>

				<Box bg={"gray.1"} p={"sm"} w={"100%"} h={"fit-content"} mih={"fit-content"}>
					<Grid gutter={"2xs"} align={"center"}>
						<Grid.Col span={3}>
							<Select
								value={groupBy?.function}
								onChange={(value) =>
									setGroupBy((prevState) =>
										prevState
											? { ...prevState, function: value as ICAdvancedGroupByFunctions }
											: {
													function: value as ICAdvancedGroupByFunctions,
													aggregatedConditions: [],
													column: "",
													displayName: "",
													order: null,
												},
									)
								}
								data={Object.entries(ICAdvancedGroupByFunctions).map(([key, value]) => ({
									label: key,
									value,
								}))}
							/>
						</Grid.Col>
						<Grid.Col span={6}>
							<TagsInput
								value={columns}
								onChange={setColumns}
								placeholder={"Select column(s)"}
								data={props.allColumns.map((item) => ({ label: item.displayName, value: item.name }))}
							/>
						</Grid.Col>
						<Grid.Col span={3}>
							<Select
								placeholder={"Order"}
								value={groupBy?.order}
								data={[
									{ label: "Ascending", value: "asc" },
									{ label: "Descending", value: "desc" },
								]}
								onChange={(value) =>
									setGroupBy(
										(prevState) => prevState && { ...prevState, order: value as ICAdvancedFilterOrder },
									)
								}
							/>
						</Grid.Col>
						<Grid.Col span={3}>
							{!groupBy?.aggregatedConditions.length ? (
								<Button
									disabled={!groupBy?.function}
									onClick={() => {
										setGroupBy(
											(prevState) =>
												prevState && {
													...prevState,
													aggregatedConditions: [
														{
															nextOperator: "and",
															closeBracket: 0,
															openBracket: 0,
															values: [],
															operator: IC_ADVANCED_FILTER_INT64_OPERATORS["="],
															id: v4(),
														},
													],
												},
										);
									}}
									variant={"transparent"}
									size={"xs"}
								>
									Group by conditions
								</Button>
							) : (
								<Text fz={"xs"} c={"gray.6"} ta={"right"}>
									Result Value(s):
								</Text>
							)}
						</Grid.Col>
						{!!groupBy?.aggregatedConditions.length && (
							<>
								<Grid.Col span={3}>
									<Select
										data={Object.entries(IC_ADVANCED_FILTER_OPERATORS_MAP.Int64).map(([key, value]) => ({
											label: key,
											value,
										}))}
										value={
											(groupBy?.aggregatedConditions?.[0]?.operator as ICAdvancedFilterConditionOperator) || 0
										}
										onChange={(value) =>
											groupBy &&
											setGroupBy(
												(prevState) =>
													prevState && {
														...prevState,
														aggregatedConditions: prevState.aggregatedConditions.length
															? [
																	{
																		...prevState.aggregatedConditions[0],
																		operator:
																			(value as ICAdvancedFilterConditionOperator) ||
																			IC_ADVANCED_FILTER_INT64_OPERATORS["="],
																	},
																]
															: [
																	{
																		openBracket: 0,
																		closeBracket: 0,
																		operator: value as ICAdvancedFilterConditionOperator,
																		nextOperator: "and",
																		id: v4(),
																		values: [],
																	},
																],
													},
											)
										}
									/>
								</Grid.Col>
								<Grid.Col span={3}>
									<NumberInput
										hideControls
										value={(groupBy?.aggregatedConditions?.[0]?.values?.[0]?.value as number) || undefined}
										onChange={(value) =>
											groupBy &&
											setGroupBy(
												(prevState) =>
													prevState && {
														...prevState,
														aggregatedConditions: prevState.aggregatedConditions.length
															? [
																	{
																		...prevState.aggregatedConditions[0],
																		values: [
																			{ label: value?.toString() || "0", value: value?.toString() || "" },
																		],
																	},
																]
															: [
																	{
																		openBracket: 0,
																		closeBracket: 0,
																		operator: IC_ADVANCED_FILTER_INT64_OPERATORS["="],
																		nextOperator: "and",
																		id: v4(),
																		values: [
																			{ label: value?.toString() || "0", value: value?.toString() || "" },
																		],
																	},
																],
													},
											)
										}
									/>
								</Grid.Col>
								<Grid.Col span={3}>
									<Button
										onClick={() =>
											setGroupBy((prevState) => prevState && { ...prevState, aggregatedConditions: [] })
										}
										p={0}
										size={"xs"}
										variant={"transparent"}
									>
										<IconX size={20} color={"gray"} />
									</Button>
								</Grid.Col>
							</>
						)}
					</Grid>
				</Box>

				<Flex align={"center"} mih={"fit-content"} wrap={"wrap"} pb={"3xl"} gap={"2xs"}>
					<Text fz={"xs"} miw={"fit-content"}>
						Show data grouped by
					</Text>
					<Text fz={"xs"} fw={"bold"} miw={"fit-content"}>{` ${columns.join(",")}`}</Text>
					{!!groupBy?.aggregatedConditions.length && (
						<>
							<Text fz={"xs"} miw={"fit-content"}>
								where the
							</Text>
							<Text
								miw={"fit-content"}
								fz={"xs"}
								fw={"bold"}
							>{`${groupBy?.function || ""} is ${aggregationCondition?.operator || ""} ${aggregationCondition?.values?.[0]?.value || ""}`}</Text>
						</>
					)}
				</Flex>
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
							store.setGroupBy(groupBy);
							store.setColumns(columns.map((item) => ({ name: item })));
							props.run();
							store.setOpenGroupByModal(false);
						}}
						disabled={!groupBy || isError}
						size={"xs"}
					>
						Apply
					</Button>
					<Button onClick={handleClose} size={"xs"} variant={"default"}>
						Cancel
					</Button>
				</Flex>
			</BCModal.EmptyFooter>
		</BCModal>
	);
}
