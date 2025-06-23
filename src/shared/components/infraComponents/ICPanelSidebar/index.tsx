import BCNavLink from "@/shared/components/baseComponents/BCNavLink";
import ICPanelSidebarPopoverMenu from "@/shared/components/infraComponents/ICPanelSidebar/components/ICPanelSidebarPopoverMenu";
import type { ICPanelSidebarPopoverMenuProps } from "@/shared/components/infraComponents/ICPanelSidebar/index.types";
import { ActionIcon, Divider, Flex, ScrollArea } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import {
	IconArrowLeft,
	IconArrowRight,
	IconBox,
	IconChartHistogram,
	IconChevronRight,
	IconDashboard,
	IconNetwork,
	IconReport,
	IconSettings,
	IconShield,
} from "@tabler/icons-react";
import type { ReactNode } from "react";
import classes from "./index.module.css";

type SideMenuItem = {
	label: string;
	href: string;
	icon: ReactNode;
	menuGroup?: Omit<ICPanelSidebarPopoverMenuProps, "target">;
};

const topMenuData: SideMenuItem[] = [
	{
		label: "Dashboard",
		href: "",
		icon: <IconChartHistogram color={"white"} />,
	},
	{
		label: "Report",
		href: "",
		icon: <IconReport color={"white"} />,
		menuGroup: {
			title: "Management Center",
			staticMenuGroup: [
				{
					href: "#",
					label: "Users",
				},
				{
					href: "#",
					label: "Groups",
				},
				{
					href: "#",
					label: "Roles",
				},
			],
			dynamicMenuGroup: [
				{
					label: "Connections",
					href: "#",
				},
				{
					label: "Licensing",
					href: "#",
				},
			],
		},
	},
];
const applicationMenuData: SideMenuItem[] = [
	{
		label: "Asset Management",
		href: "",
		icon: <IconBox color={"blue"} />,
		menuGroup: {
			title: "Management Center",
			dynamicMenuGroup: [
				{
					label: "Assets",
					href: "#",
				},
				{
					label: "Another Module",
					href: "#",
				},
				{
					label: "Another Module2",
					href: "#",
				},
			],
		},
	},
	{
		label: "Vulnerability Management",
		href: "",
		icon: <IconShield color={"blue"} />,
	},
	{
		label: "Network Management",
		href: "",
		icon: <IconNetwork color={"yellow"} />,
	},
];

const sideMenuData: SideMenuItem[] = [
	{
		label: "Policies",
		href: "",
		icon: <IconDashboard color={"white"} />,
	},
	{
		label: "Reports",
		href: "",
		icon: <IconDashboard color={"white"} />,
	},
];

const managementMenuData: SideMenuItem["menuGroup"] = {
	title: "Management Center",
	staticMenuGroup: [
		{
			href: "#",
			label: "Users",
		},
		{
			href: "#",
			label: "Groups",
		},
		{
			href: "#",
			label: "Roles",
		},
	],
	dynamicMenuGroup: [
		{
			label: "Connections",
			href: "#",
		},
		{
			label: "Licensing",
			href: "#",
		},
	],
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
					link.menuGroup && <IconChevronRight color={"white"} size={16} />
				}
				key={link.label}
				label={params.opened ? link.label : ""}
				href={link.href}
			/>
		);

		if (link.menuGroup) {
			return (
				<ICPanelSidebarPopoverMenu
					withoutOffset={!params.opened}
					key={link.label}
					target={navLink}
					title={link.menuGroup.title}
					dynamicMenuGroup={link.menuGroup.dynamicMenuGroup}
					staticMenuGroup={link.menuGroup.staticMenuGroup}
				/>
			);
		}
		return navLink;
	});
};

export default function ICPanelSidebar(props: Props) {
	const { height } = useViewportSize();
	const topMenuItems = generateMenuItem({
		items: topMenuData,
		opened: props.opened,
	});
	const applicationMenuItems = generateMenuItem({
		items: applicationMenuData,
		opened: props.opened,
	});
	const sidebarMenuItems = generateMenuItem({
		items: sideMenuData,
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

						{managementMenuData && (
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
								title={managementMenuData.title}
								dynamicMenuGroup={managementMenuData.dynamicMenuGroup}
								staticMenuGroup={managementMenuData.staticMenuGroup}
							/>
						)}
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
