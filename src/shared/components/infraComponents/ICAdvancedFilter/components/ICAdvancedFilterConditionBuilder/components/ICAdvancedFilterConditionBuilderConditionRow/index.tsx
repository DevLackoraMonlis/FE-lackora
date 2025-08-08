import ICAdvancedFilterConditionBuilderConditionRowSortable from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionBuilder/components/ICAdvancedFilterConditionBuilderConditionRow/ICAdvancedFilterConditionBuilderConditionRowSortable";
import { BracketButtons } from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionBuilder/components/ICAdvancedFilterConditionBuilderConditionRow/ICAdvancedFilterConditionRowBracketButtons";
import type {
	ICAdvancedFilterConditionBuilderRowProps,
	ICAdvancedFilterOperator,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { useSortable } from "@dnd-kit/sortable";
import { Flex, Grid, ScrollArea, Select } from "@mantine/core";

export default function ICAdvancedFilterConditionBuilderConditionRow(
	props: ICAdvancedFilterConditionBuilderRowProps,
) {
	const nextOperators: ICAdvancedFilterOperator[] = ["and", "or"];

	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: props.condition.id,
	});

	const style = {
		...(transform?.y && {
			transform: `translate3d(0px, ${transform?.y}px, 0)`,
		}),
		transition,
	};

	return (
		<Flex
			style={style}
			ref={setNodeRef}
			gap={"2xs"}
			align={"flex-end"}
			w={"100%"}
			miw={"100%"}
			{...attributes}
		>
			<Grid align={"end"} gutter={0} w={"100%"} miw={"100%"} classNames={{ inner: "w-full" }}>
				<Grid.Col span={1} p={0}>
					<BracketButtons
						error={
							props.condition.bracketError?.type === "close" &&
							props.condition.bracketError?.index === props.index
						}
						showLabel={props.index === 0}
						onMinusOpenBracket={props.onMinusOpenBracket}
						onPlusOpenBracket={props.onPlusOpenBracket}
						onPlusCloseBracket={props.onPlusCloseBracket}
						onMinusCloseBracket={props.onMinusCloseBracket}
						type={"OpenBracket"}
						key={`open-bracket-buttons-${props.condition.id}`}
						condition={props.condition}
					/>
				</Grid.Col>
				<Grid.Col span={9} p={0}>
					<ScrollArea scrollbars={"x"} w={"100%"} scrollbarSize={2}>
						<ICAdvancedFilterConditionBuilderConditionRowSortable listener={listeners} {...props} />
					</ScrollArea>
				</Grid.Col>
				<Grid.Col span={1} p={0} pl={"xs"}>
					<BracketButtons
						error={
							props.condition.bracketError?.type === "open" &&
							props.condition.bracketError?.index === props.index
						}
						showLabel={props.index === 0}
						onMinusOpenBracket={props.onMinusOpenBracket}
						onPlusOpenBracket={props.onPlusOpenBracket}
						onPlusCloseBracket={props.onPlusCloseBracket}
						onMinusCloseBracket={props.onMinusCloseBracket}
						type={"CloseBracket"}
						key={`close-bracket-buttons-${props.condition.id}`}
						condition={props.condition}
					/>
				</Grid.Col>
				<Grid.Col span={1} p={0} pl={"xs"}>
					<Select
						disabled={props.isLastCondition}
						w={"100%"}
						miw={120}
						value={props.condition.nextOperator}
						onChange={(value) => {
							props.onChange({
								...props.condition,
								nextOperator: (value || "and") as ICAdvancedFilterOperator,
							});
						}}
						label={props.index === 0 && "AND/OR"}
						data={nextOperators.map((item) => ({ label: item.toUpperCase(), value: item }))}
					/>
				</Grid.Col>
			</Grid>
		</Flex>
	);
}
