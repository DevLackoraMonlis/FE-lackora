import type { LabelValueType } from "@/shared/lib/general-types";
import type { ReactNode } from "react";

export type InventoryAppSideCardProps = {
	title: string;
	icon: ReactNode;
	items: LabelValueType[];
	isLoading: boolean;
	onRedirect: VoidFunction;
	name: string;
	isSelected: boolean;
};

export type InventoryAppPageWrapperProps = {
	sideItems: Omit<InventoryAppSideCardProps, "isLoading" | "isSelected">[];
	page?: ReactNode;
	isLoading: boolean;
	title?: string;
	selectedInventoryType?: string;
};
