import BCNavLink from "@/shared/components/baseComponents/BCNavLink";
import ICPanelSidebarPopoverMenu from "@/shared/components/infraComponents/ICPanelSidebar/components/ICPanelSidebarPopoverMenu";
import {
	SIDE_PANEL_APP_ICON,
	SIDE_PANEL_APP_MODULE_ICON,
} from "@/shared/components/infraComponents/ICPanelSidebar/index.constants";
import type { ICPanelSidebarPopoverMenuGroupProps } from "@/shared/components/infraComponents/ICPanelSidebar/index.types";
import { AppRoutes } from "@/shared/constants/app-routes";
import activeAppsStore from "@/shared/stores/activeAppsStore";
import { ActionIcon, Divider, Flex, ScrollArea } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import {
	IconArrowLeft,
	IconArrowRight,
	IconChevronRight,
	IconSettings,
} from "@tabler/icons-react";
import type { ReactNode } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";
import classes from "./index.module.css";

type SideMenuItem = {
	label: string;
	href: string;
	icon: ReactNode;
	menuGroupProps?: Omit<ICPanelSidebarPopoverMenuGroupProps, "target">;
};

type Props = {
	opened: boolean;
	onToggle: VoidFunction;
};

const generateMenuItem = (params: {
	items: SideMenuItem[];
	opened: boolean;
}) => {
	return params.items.map((link) => {
		const navLink = (
			<BCNavLink
				leftSection={link.icon}
				rightSection={
					params.opened &&
					link.menuGroupProps && <IconChevronRight color={"white"} size={16} />
				}
				key={link.label}
				label={params.opened ? link.label : ""}
				href={link.href}
			/>
		);

		if (link.menuGroupProps) {
			return (
				<ICPanelSidebarPopoverMenu
					withoutOffset={!params.opened}
					key={link.label}
					target={navLink}
					title={link.menuGroupProps.title}
					dynamicMenuGroup={link.menuGroupProps.dynamicMenuGroup}
					staticMenuGroup={link.menuGroupProps.staticMenuGroup}
				/>
			);
		}
		return navLink;
	});
};

function generatePopoverMenuGroup(params: {
	title: string;
	name: string;
	modules: string[];
}): Omit<ICPanelSidebarPopoverMenuGroupProps, "target"> {
	return {
		title: params.title,
		dynamicMenuGroup: params.modules.map((item) => ({
			href: AppRoutes.appModulePage(params.name, item),
			icon: SIDE_PANEL_APP_MODULE_ICON[item],
			label: item,
		})),
	};
}

export default function ICPanelSidebar(props: Props) {
	const { height } = useViewportSize();

	const store = useStore(
		activeAppsStore,
		useShallow((state) => ({
			apps: state.apps,
		})),
	);

	const topMenuItems = generateMenuItem({
		items:
			store.apps
				.filter((item) => item.priority)
				.sort()
				.map((item) => ({
					href: AppRoutes.appLandingPage(item.name),
					icon: SIDE_PANEL_APP_ICON[item.name],
					label: item.display_name,
					menuGroupProps:
						item.placement !== "sidebar"
							? generatePopoverMenuGroup({
									modules: item.modules,
									name: item.name,
									title: item.display_name,
								})
							: undefined,
				})) || [],
		opened: props.opened,
	});

	const applicationMenuItems = generateMenuItem({
		items:
			store.apps
				.filter((item) => !item.priority && item.placement === "application")
				.map((item) => ({
					href: AppRoutes.appLandingPage(item.name),
					icon: SIDE_PANEL_APP_ICON[item.name],
					label: item.display_name,
					menuGroupProps:
						item.placement !== "sidebar"
							? generatePopoverMenuGroup({
									modules: item.modules,
									name: item.name,
									title: item.display_name,
								})
							: undefined,
				})) || [],
		opened: props.opened,
	});

	const sidebarMenuItems = generateMenuItem({
		items:
			store.apps
				.filter((item) => !item.priority && item.placement === "sidebar")
				.map((item) => ({
					href: AppRoutes.appLandingPage(item.name),
					icon: SIDE_PANEL_APP_ICON[item.name],
					label: item.display_name,
					menuGroupProps:
						item.placement !== "sidebar"
							? generatePopoverMenuGroup({
									modules: item.modules,
									name: item.name,
									title: item.display_name,
								})
							: undefined,
				})) || [],
		opened: props.opened,
	});

	return (
		<nav
			className={`${classes.navbar} ${props.opened ? classes.openedNavbar : classes.closedNavbar}`}
		>
			<Flex h={"100%"} pb={"md"} direction={"column"} justify={"space-between"}>
				<ScrollArea h={height - 48}>
					<Flex direction={"column"} gap={"sm"}>
						{topMenuItems}
						<Divider color={"var(--mantine-color-gray-7)"} />
						{applicationMenuItems}
						<Divider color={"var(--mantine-color-gray-7)"} />
						{sidebarMenuItems}
						<Divider color={"var(--mantine-color-gray-7)"} />
						<ICPanelSidebarPopoverMenu
							withoutOffset={!props.opened}
							target={
								<BCNavLink
									leftSection={<IconSettings color={"white"} />}
									rightSection={
										props.opened && (
											<IconChevronRight color={"white"} size={16} />
										)
									}
									key={"management-center"}
									label={props.opened && "Management Center"}
								/>
							}
							title={"Management Center"}
							dynamicMenuGroup={store.apps
								.filter((item) => item.placement === "management_center")
								.sort((a, b) => b.priority - a.priority)
								.map((item) => ({
									href: AppRoutes.appLandingPage(item.name),
									icon: SIDE_PANEL_APP_ICON[item.name],
									label: item.display_name,
									childrenItems: item.modules.map((subItem) => ({
										href: AppRoutes.appModulePage(item.name, subItem),
										label: subItem,
										icon: SIDE_PANEL_APP_MODULE_ICON[subItem],
									})),
								}))}
						/>
					</Flex>
				</ScrollArea>
				<Flex justify={"flex-end"} align={"center"} pr={"sm"}>
					<ActionIcon
						size={24}
						onClick={props.onToggle}
						p={0}
						className={classes.collapseBtn}
						variant={"transparent"}
					>
						{props.opened ? <IconArrowLeft /> : <IconArrowRight />}
					</ActionIcon>
				</Flex>
			</Flex>
		</nav>
	);
}
