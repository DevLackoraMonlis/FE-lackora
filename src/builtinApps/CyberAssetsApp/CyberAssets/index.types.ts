import type { ICAdvancedFilterRq } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import type { LabelValueType } from "@/shared/lib/general-types";
import type { ReactNode } from "react";

export type CyberAssetsDefaultProps = { defaultFilterParams?: ICAdvancedFilterRq };

export type CyberAssetDetailGeneralInfoCardProps = {
	title: string;
	items: LabelValueType<ReactNode>[];
	icon: ReactNode;
};

export type CyberAssetDetailGeneralInfoProps = {
	title: string;
	icon: ReactNode;
	subTitle: string;
	upTimeTitle: string;
	onEdit: VoidFunction;
	onCheckConnection: VoidFunction;
	items: CyberAssetDetailGeneralInfoCardProps[];
	indicatorColor: "green" | "red" | "yellow";
};

export type CyberAssetDetailProps = {
	generalInfoProps: CyberAssetDetailGeneralInfoProps;
};
