import { Accordion, Button, Flex, type MantineStyleProp, Text } from "@mantine/core";
import React from "react";
import type { ReactElement } from "react";
import useAppModuleIcon from "../../hooks/useAppModuleIcon";
import type { ICAppManagerMenuProps } from "../../index.types";
import classes from "./index.module.css";

export default function ICAppManagerMenu(props: ICAppManagerMenuProps) {
	const { PLUGIN_MODULE_ICON } = useAppModuleIcon();

	return (
		<>
			{props?.appMenuItems?.map((parent) => (
				<Accordion.Item
					id={`data-test-panel-sidebar-panel-item-${parent.name}`}
					style={() => ({
						border: 0,
						marginTop: "8px",
						borderRadius: "8px 8px 0 0",
						backgroundColor: "transparent",
						...parent?.parentStyle,
					})}
					key={parent.name}
					value={parent.name}
				>
					{!parent.modules.length ? (
						<Text fz={14} style={parent?.style}>
							{parent.name}
						</Text>
					) : (
						<Accordion.Control
							style={parent?.moduleStyle}
							styles={{
								label: parent?.labelModuleStyle,
								control: {
									borderRadius: 0,
								},
							}}
							fz={14}
							onClick={parent?.parentOnClick}
						>
							{parent?.isNew ? (
								<Flex justify="space-between" align="center" pr={10}>
									{parent.name}
									<Flex w={35} h={15} bg="#8B54F7" justify="center" align="center" className={classes.newBtn}>
										<Text fw={400} c="#FAFAFA" className={classes.newText}>
											New
										</Text>
									</Flex>
								</Flex>
							) : (
								<>{parent.name}</>
							)}
						</Accordion.Control>
					)}
					{/* items */}
					{parent.modules.map((item) => {
						const icon = PLUGIN_MODULE_ICON[item?.name as string] as ReactElement;
						return (
							<Accordion.Panel
								key={item.name}
								style={item?.style}
								styles={{
									content: {
										padding: 0,
									},
								}}
								p={4}
							>
								<Flex gap={10} justify="flex-start" align="center">
									<Button
										id={`data-test-panel-sidebar-panel-item-panelItem-${item.name}`}
										leftSection={React.cloneElement(
											icon as React.ReactElement<{
												style?: React.CSSProperties | MantineStyleProp;
											}>,
											{
												style: item?.iconStyle,
											},
										)}
										fz={12}
										variant="transparent"
										style={item?.btnStyle}
										onClick={item?.moduleOnClick}
									>
										<Flex gap={10} justify="flex-start" align="center">
											{item.name}
										</Flex>
									</Button>
								</Flex>
							</Accordion.Panel>
						);
					})}
				</Accordion.Item>
			))}
		</>
	);
}
