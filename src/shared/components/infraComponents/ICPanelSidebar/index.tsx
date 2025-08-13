import BCNavLink from "@/shared/components/baseComponents/BCNavLink";
import ICPanelSidebarIconWrapper from "@/shared/components/infraComponents/ICPanelSidebar/components/ICPanelSidebarIconWrapper";
import ICPanelSidebarPopoverMenu from "@/shared/components/infraComponents/ICPanelSidebar/components/ICPanelSidebarPopoverMenu";
import {
	getSidePanelAppIcon,
	getSidePanelAppModuleIcon,
} from "@/shared/components/infraComponents/ICPanelSidebar/index.helper";
import type { ICPanelSidebarPopoverMenuGroupProps } from "@/shared/components/infraComponents/ICPanelSidebar/index.types";
import { AppRoutes } from "@/shared/constants/routes";
import activeAppsStore from "@/shared/stores/activeAppsStore";
import { ActionIcon, Divider, Flex, ScrollArea, Tooltip, useMantineTheme } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconArrowLeft, IconArrowRight, IconChevronRight, IconSettings } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
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
	onMouseEnter: (href: string) => void;
	onMouseLeave: (href: string) => void;
	showTooltip?: boolean;
}) => {
	const pathname = usePathname();
	return params.items.map((link) => {
		const navLink = (
			<BCNavLink
				data-testid={`BCNavLink-${link.label}`}
				onMouseLeave={() => params.onMouseLeave(link.href)}
				onMouseEnter={() => params.onMouseEnter(link.href)}
				leftSection={link.icon}
				rightSection={params.opened && link.menuGroupProps && <IconChevronRight color={"white"} size={16} />}
				key={link.label}
				label={params.opened ? link.label : ""}
				href={pathname === link.href ? "#" : link.href}
			/>
		);

		if (link.menuGroupProps) {
			return (
				<ICPanelSidebarPopoverMenu
					redirectOnTitleClick={link.menuGroupProps.redirectOnTitleClick}
					withoutOffset={!params.opened}
					key={link.label}
					target={navLink}
					title={link.menuGroupProps.title}
					dynamicMenuGroup={link.menuGroupProps.dynamicMenuGroup}
					staticMenuGroup={link.menuGroupProps.staticMenuGroup}
				/>
			);
		}

		if (params.showTooltip && !params.opened) {
			return (
				<Tooltip key={link.label} position={"right-start"} label={link.label}>
					{navLink}
				</Tooltip>
			);
		}
		return navLink;
	});
};

function generatePopoverMenuGroup(params: {
	title: string;
	name: string;
	modules: string[];
	redirectOnTitleClick: boolean;
}): Omit<ICPanelSidebarPopoverMenuGroupProps, "target"> {
	return {
		title: params.title,
		redirectOnTitleClick: params.redirectOnTitleClick,
		dynamicMenuGroup: params.modules.map((item) => ({
			href: AppRoutes.appModulePage(params.name, item),
			icon: <ICPanelSidebarIconWrapper>{getSidePanelAppModuleIcon(12, item)}</ICPanelSidebarIconWrapper>,
			label: item,
		})),
	};
}

export default function ICPanelSidebar(props: Props) {
	const { height } = useViewportSize();
	const { colors } = useMantineTheme();
	const baseColor = colors.gray[4];
	const hoverColor = colors.primary[6];

	const [color, setColor] = useState(baseColor);
	const [hoveredName, setHovered] = useState("");
	const [colorManagementCenter, setColorManagementCenter] = useState(baseColor);

	const store = useStore(
		activeAppsStore,
		useShallow((state) => ({
			apps: state.apps,
		})),
	);

	const onMouseEnter = (href: string) => {
		setColor(hoverColor);
		setHovered(href);
	};
	const onMouseLeave = () => {
		setColor(baseColor);
		setHovered("");
	};

	const topMenuItems = generateMenuItem({
		items:
			store.apps
				.filter((item) => item.priority && item.placement !== "management_center")
				.sort()
				.map((item) => ({
					href: AppRoutes.appLandingPage(item.name),
					icon: getSidePanelAppIcon(
						24,
						item.name,
						hoveredName === AppRoutes.appLandingPage(item.name) ? color : undefined,
					),
					label: item.display_name,
					menuGroupProps:
						item.placement !== "sidebar"
							? generatePopoverMenuGroup({
									redirectOnTitleClick: item.has_landing,
									modules: item.modules as string[],
									name: item.name,
									title: item.display_name,
								})
							: undefined,
				})) || [],
		opened: props.opened,
		onMouseEnter,
		onMouseLeave,
		showTooltip: true,
	});

	const applicationMenuItems = generateMenuItem({
		items:
			store.apps
				.filter((item) => !item.priority && item.placement === "application")
				.map((item) => ({
					href: AppRoutes.appLandingPage(item.name),
					icon: getSidePanelAppIcon(
						24,
						item.name,
						hoveredName === AppRoutes.appLandingPage(item.name) ? color : undefined,
					),
					label: item.display_name,
					menuGroupProps:
						item.placement !== "sidebar"
							? generatePopoverMenuGroup({
									modules: item.modules as string[],
									name: item.name,
									title: item.display_name,
									redirectOnTitleClick: item.has_landing,
								})
							: undefined,
				})) || [],
		opened: props.opened,
		onMouseEnter,
		onMouseLeave,
	});

	const sidebarMenuItems = generateMenuItem({
		items:
			store.apps
				.filter((item) => !item.priority && item.placement === "sidebar")
				.map((item) => ({
					href: AppRoutes.appLandingPage(item.name),
					icon: getSidePanelAppIcon(
						24,
						item.name,
						hoveredName === AppRoutes.appLandingPage(item.name) ? color : undefined,
					),
					label: item.display_name,
					menuGroupProps:
						item.placement !== "sidebar"
							? generatePopoverMenuGroup({
									modules: item.modules as string[],
									name: item.name,
									title: item.display_name,
									redirectOnTitleClick: item.has_landing,
								})
							: undefined,
				})) || [],
		opened: props.opened,
		onMouseEnter,
		onMouseLeave,
	});

	return (
		<nav className={`${classes.navbar} ${props.opened ? classes.openedNavbar : classes.closedNavbar}`}>
			<Flex h={"100%"} pb={"md"} direction={"column"} justify={"space-between"}>
				<ScrollArea scrollbars={"y"} h={height - 48}>
					<Flex direction={"column"} justify={"center"} gap={"sm"}>
						{topMenuItems}
						{!!topMenuItems.length && <Divider color={"var(--mantine-color-gray-7)"} />}
						{applicationMenuItems}
						{!!applicationMenuItems.length && <Divider color={"var(--mantine-color-gray-7)"} />}
						{sidebarMenuItems}
						{!!sidebarMenuItems.length && <Divider color={"var(--mantine-color-gray-7)"} />}
						<ICPanelSidebarPopoverMenu
							redirectOnTitleClick={false}
							width={300}
							withoutOffset={!props.opened}
							target={
								<BCNavLink
									data-testid={"BCNavLink-Management Center"}
									onMouseEnter={() => setColorManagementCenter(hoverColor)}
									onMouseLeave={() => setColorManagementCenter(baseColor)}
									leftSection={<IconSettings color={colorManagementCenter} />}
									rightSection={props.opened && <IconChevronRight color={"white"} size={16} />}
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
									icon: (
										<ICPanelSidebarIconWrapper>
											{getSidePanelAppIcon(12, item.name, color)}
										</ICPanelSidebarIconWrapper>
									),
									label: item.display_name,
									childrenItems: item.modules.map((subItem) => ({
										href: AppRoutes.appModulePage(item.name, subItem as string),
										label: subItem as string,
									})),
								}))}
						/>
					</Flex>
				</ScrollArea>
				<Flex justify={props.opened ? "flex-end" : "center"} align={"center"}>
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
