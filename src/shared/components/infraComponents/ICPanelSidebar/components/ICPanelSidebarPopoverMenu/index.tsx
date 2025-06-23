import BCNavLink from "@/shared/components/baseComponents/BCNavLink";
import type { ICPanelSidebarPopoverMenuProps } from "@/shared/components/infraComponents/ICPanelSidebar/index.types";
import { Box, Divider, Flex, Menu, Text } from "@mantine/core";
import { IconArrowsLeftRight } from "@tabler/icons-react";
import classes from "./index.module.css";

export default function ICPanelSidebarPopoverMenu(
	props: ICPanelSidebarPopoverMenuProps,
) {
	return (
		<Menu
			trigger={props.trigger || "hover"}
			radius={"sm"}
			offset={props.withoutOffset ? 0 : 15}
			arrowSize={10}
			closeOnClickOutside
			closeOnEscape
			classNames={{
				dropdown: classes.dropdown,
			}}
			width={200}
			position={props.position || "right-start"}
			withArrow
			arrowOffset={10}
			arrowPosition={props.arrowPosition || "side"}
		>
			<Menu.Target>
				<Box>{props.target}</Box>
			</Menu.Target>
			<Menu.Dropdown px={"xs"}>
				<Text p={"xs"} size="xs" c={"gray.6"}>
					{props.title}
				</Text>
				<Flex direction={"column"}>
					{props.staticMenuGroup?.map((item) => (
						<BCNavLink
							c={"white"}
							label={item.label}
							key={item.label}
							href={item.href}
							leftSection={
								item.icon || <IconArrowsLeftRight color={"white"} size={12} />
							}
						>
							<BCNavLink
								c={"white"}
								label={item.label}
								key={item.label}
								href={item.href}
								leftSection={
									item.icon || <IconArrowsLeftRight color={"white"} size={12} />
								}
							/>
							<BCNavLink
								c={"white"}
								label={item.label}
								key={item.label}
								href={item.href}
								leftSection={
									item.icon || <IconArrowsLeftRight color={"white"} size={12} />
								}
							/>
						</BCNavLink>
					))}
					{props.staticMenuGroup?.length && props.dynamicMenuGroup?.length && (
						<Divider color={"gray.7"} />
					)}
					{props.dynamicMenuGroup?.map((item) => (
						<BCNavLink
							label={item.label}
							key={item.label}
							href={item.href}
							leftSection={
								item.icon || <IconArrowsLeftRight color={"white"} size={12} />
							}
						/>
					))}
				</Flex>
			</Menu.Dropdown>
		</Menu>
	);
}
