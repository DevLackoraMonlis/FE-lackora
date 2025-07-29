import BCNavLink from "@/shared/components/baseComponents/BCNavLink";
import type {
	ICPanelSidebarPopoverMenuGroupItem,
	ICPanelSidebarPopoverMenuGroupProps,
} from "@/shared/components/infraComponents/ICPanelSidebar/index.types";
import { Box, Divider, Flex, Menu, Text } from "@mantine/core";
import { IconArrowsLeftRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import classes from "./index.module.css";

export default function ICPanelSidebarPopoverMenu(props: ICPanelSidebarPopoverMenuGroupProps) {
	const router = useRouter();
	const generateMenuGroup = (groupMenu?: ICPanelSidebarPopoverMenuGroupItem[]) => {
		return groupMenu?.map((item) => {
			if (item.childrenItems?.length) {
				return (
					<BCNavLink
						p={0}
						c={"white"}
						label={
							<Text
								{...(props.redirectOnTitleClick && {
									onClick: (event) => {
										event.stopPropagation();
										event.preventDefault();
										if (props.redirectOnTitleClick) router.push(item.href);
									},
								})}
							>
								{item.label}
							</Text>
						}
						key={item.label}
						leftSection={item.icon || <IconArrowsLeftRight color={"white"} size={12} />}
					>
						{item.childrenItems.map((subMenu) => (
							<BCNavLink
								className={classes.subMenu}
								c={"white"}
								label={subMenu.label}
								key={subMenu.label}
								href={subMenu.href}
								leftSection={subMenu.icon}
							/>
						))}
					</BCNavLink>
				);
			}
			return (
				<BCNavLink
					c={"white"}
					label={item.label}
					key={item.label}
					href={item.href}
					leftSection={item.icon || <IconArrowsLeftRight color={"white"} size={12} />}
				/>
			);
		});
	};

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
			width={props.width || 250}
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
					{generateMenuGroup(props.staticMenuGroup)}
					{props.staticMenuGroup?.length && props.dynamicMenuGroup?.length && <Divider color={"gray.7"} />}
					{generateMenuGroup(props.dynamicMenuGroup)}
				</Flex>
			</Menu.Dropdown>
		</Menu>
	);
}
