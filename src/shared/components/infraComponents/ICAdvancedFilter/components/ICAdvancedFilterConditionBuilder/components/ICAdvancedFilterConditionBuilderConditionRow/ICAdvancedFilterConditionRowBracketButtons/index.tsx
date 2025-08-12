import type {
	BracketError,
	ICAdvancedFilterCondition,
	ICAdvancedFilterConditionBuilderRowProps,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Box, Button, Card, Flex, InputWrapper, ScrollArea, Tooltip } from "@mantine/core";
import { useCallback } from "react";
import classes from "./index.module.css";

export const BracketButtons = (
	props: {
		condition: ICAdvancedFilterCondition;
		type: "OpenBracket" | "CloseBracket";
		showLabel: boolean;
		error: boolean;
		bracketError?: BracketError;
	} & Pick<
		ICAdvancedFilterConditionBuilderRowProps,
		"onMinusCloseBracket" | "onMinusOpenBracket" | "onPlusCloseBracket" | "onPlusOpenBracket"
	>,
) => {
	const hasBracket =
		props.type === "OpenBracket" ? props.condition.openBracket : props.condition.closeBracket;

	const ButtonsSection = useCallback(
		() => (
			<Flex direction={"column"} bg={"white"} h={34}>
				<Button
					onClick={props.type === "OpenBracket" ? props.onPlusOpenBracket : props.onPlusCloseBracket}
					h={17}
					w={17}
					variant={"transparent"}
					p={0}
					size={"xs"}
				>
					+
				</Button>
				<Button
					onClick={props.type === "OpenBracket" ? props.onMinusOpenBracket : props.onMinusCloseBracket}
					h={17}
					w={17}
					variant={"transparent"}
					p={0}
					size={"xs"}
				>
					-
				</Button>
			</Flex>
		),
		[props.onMinusOpenBracket, props.onMinusCloseBracket, props.onPlusOpenBracket, props.onPlusCloseBracket],
	);

	const label = props.type === "OpenBracket" ? "(" : ")";

	return hasBracket ? (
		<InputWrapper
			classNames={{ label: "flex-important flex-center w-full" }}
			label={props.showLabel && label}
		>
			<Card withBorder p={0} w={"100%"} shadow={"none"}>
				<Flex
					w={"100%"}
					align={"center"}
					justify={props.type === "OpenBracket" ? "flex-start" : "flex-end"}
					gap={"2xs"}
					miw={"100%"}
					pr={props.type === "OpenBracket" ? "xs" : ""}
					pl={props.type === "CloseBracket" ? "xs" : ""}
				>
					{props.type === "OpenBracket" && <ButtonsSection />}
					<Tooltip
						label={`${props.type === "OpenBracket" ? props.condition.openBracket : props.condition.closeBracket} parenthesis. ${props.bracketError ? `${props.bracketError ? `${props.bracketError.count} error for ${props.type === "OpenBracket" ? '"("' : '")"'}` : ""}` : ""}`}
					>
						<ScrollArea scrollbars={"x"} scrollbarSize={2} w={"100%"}>
							<Flex
								className={props.error ? classes.blink : ""}
								w={"100%"}
								align={"center"}
								justify={props.type === "OpenBracket" ? "flex-end" : "flex-start"}
								gap={"2xs"}
							>
								{Array.from({
									length:
										props.type === "OpenBracket" ? props.condition.openBracket : props.condition.closeBracket,
								}).map((_i, index) => (
									<Flex
										align={"center"}
										justify={"center"}
										bg={"gray.2"}
										key={`${props.type}-p-${index}`}
										w={12}
										h={24}
									>
										{props.type === "OpenBracket" ? "(" : ")"}
									</Flex>
								))}
							</Flex>
						</ScrollArea>
					</Tooltip>
					{props.type === "CloseBracket" && <ButtonsSection />}
				</Flex>
			</Card>
		</InputWrapper>
	) : (
		<Flex direction={"column"} align={props.type === "OpenBracket" ? "flex-end" : "flex-start"}>
			{props.showLabel && (
				<Box w={32} pl={"xs"}>
					{label}
				</Box>
			)}

			<Flex w={"100%"} justify={props.type === "OpenBracket" ? "flex-end" : "flex-start"}>
				<Tooltip
					label={`Add new parenthesis. ${props.bracketError ? `${props.bracketError ? `${props.bracketError.count} error for ${props.type === "OpenBracket" ? '"("' : '")"'}` : ""}` : ""}`}
				>
					<Button
						className={props.error ? classes.blink : ""}
						onClick={props.type === "OpenBracket" ? props.onPlusOpenBracket : props.onPlusCloseBracket}
						miw={32}
						w={32}
						size={"sm"}
						px={"2xs"}
						variant={"default"}
					>
						{"{+}"}
					</Button>
				</Tooltip>
			</Flex>
		</Flex>
	);
};
