import type { MenuProps } from "@mantine/core";
import type { ReactNode } from "react";

export type ICPanelSidebarPopoverMenuGroupItem = {
	label: string;
	href: string;
	icon?: ReactNode;
};

export type ICPanelSidebarPopoverMenuProps = {
	staticMenuGroup?: ICPanelSidebarPopoverMenuGroupItem[];
	dynamicMenuGroup?: ICPanelSidebarPopoverMenuGroupItem[];
	target: ReactNode;
	title: string;
	withoutOffset?: boolean;
} & Pick<MenuProps, "position" | "arrowPosition" | "trigger">;
