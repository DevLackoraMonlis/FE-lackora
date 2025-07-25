import type { BCMultiTabPageActions } from "@/shared/components/baseComponents/BCMultiTabPage/index.types";
import type { LabelValueType } from "@/shared/lib/general-types";
import { ActionIcon, Box, Button, Divider, Flex, ScrollArea, Text } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";
import { type ReactElement, type ReactNode, type RefObject, useImperativeHandle, useState } from "react";
import classes from "./index.module.css";

type Props<P> = {
	title: string;
	subTitle: ReactNode;
	staticPageTitle: string;
	ref: RefObject<BCMultiTabPageActions<P> | null>;
	mainPage: (params?: P) => ReactElement;
};

export default function BCMultiTabPage<P>(props: Props<P>) {
	const [pages, setPages] = useState<(LabelValueType & { page: ReactNode; params?: P })[]>([]);
	const [activePage, setActivePage] = useState<string>("main");

	useImperativeHandle(props.ref, () => {
		return {
			addNewPage: (pageName, params) => {
				setPages((prevState) => {
					const newPage = {
						label: pageName,
						value: `${prevState.length + 1}`,
						page: props.mainPage(params),
						params,
					};
					setActivePage(newPage.value);
					return [...prevState, newPage];
				});
			},
		};
	});

	return (
		<Flex direction={"column"} w={"100%"}>
			<Flex w="100%" pl={"xs"} gap={"xs"} align={"center"} bg={"gray.2"} h={48}>
				<Text fz={"lg"} fw={"bolder"} miw={"fit-content"}>
					{props.title}
				</Text>
				<Box miw={"fit-content"}>{props.subTitle}</Box>

				<Divider mt={12} h={26} color={"gray"} orientation={"vertical"} />
				<Button
					miw={"fit-content"}
					variant={activePage === "main" ? "filled" : "default"}
					onClick={() => setActivePage("main")}
					size={"xs"}
				>
					{props.staticPageTitle}
				</Button>

				<ScrollArea scrollbarSize={2} scrollbars={"x"} w={"100%"} pr={"sm"}>
					<Flex wrap={"nowrap"} gap={"xs"}>
						{pages.map((page) => (
							<Button
								onClick={() => setActivePage(page.value)}
								rightSection={
									<ActionIcon
										color={activePage === page.value ? "white" : "black"}
										onClick={(event) => {
											event.stopPropagation();
											setActivePage("main");
											setPages((prevState) => prevState.filter((item) => item.value !== page.value));
										}}
										variant={"transparent"}
									>
										<IconX size={16} />
									</ActionIcon>
								}
								size={"xs"}
								variant={activePage === page.value ? "filled" : "default"}
								key={page.value}
							>
								{page.label}
							</Button>
						))}
						<Button
							p={"2xs"}
							onClick={() => {
								setPages((prevState) => {
									const getLastPageTitle = prevState.filter((item) =>
										item.label.startsWith(props.staticPageTitle),
									);

									const newPage = {
										label: `${props.staticPageTitle} (${getLastPageTitle.length + 1})`,
										value: `${prevState.length + 1}`,
										page: props.mainPage(),
									};

									setActivePage(newPage.value);
									return [...prevState, newPage];
								});
							}}
							size={"xs"}
							variant={"default"}
						>
							<IconPlus size={20} />
						</Button>
					</Flex>
				</ScrollArea>
			</Flex>
			<Box bg={"white"} p={"sm"} w={"100%"}>
				<Box key={"main"} className={activePage !== "main" ? classes.hide : classes.show}>
					{props.mainPage()}
				</Box>
				{pages.map((page) => {
					return (
						<Box className={activePage !== page.value ? classes.hide : classes.show} key={page.value}>
							{page?.page}
						</Box>
					);
				})}
			</Box>
		</Flex>
	);
}
