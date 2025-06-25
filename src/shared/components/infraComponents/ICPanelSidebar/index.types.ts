import type { MenuProps } from "@mantine/core";
import type { ReactNode } from "react";

export type ICPanelSidebarPopoverMenuGroupItem = {
	label: string;
	href: string;
	icon?: ReactNode;
	childrenItems?: ICPanelSidebarPopoverMenuGroupItem[];
};

export type ICPanelSidebarPopoverMenuGroupProps = {
	staticMenuGroup?: ICPanelSidebarPopoverMenuGroupItem[];
	dynamicMenuGroup?: ICPanelSidebarPopoverMenuGroupItem[];
	target: ReactNode;
	title: string;
	withoutOffset?: boolean;
} & Pick<MenuProps, "position" | "arrowPosition" | "trigger">;

export type ICPanelSidebarPlacement =
	| "management-center"
	| "sidebar"
	| "applications";
