import type {
	CyberAssetClassification,
	CyberAssetDiscoveryType,
	CyberAssetOsType,
	CyberAssetState,
	CyberAssetStatus,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.enum";
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

export type CuberAssetDetailGeneralInfoData = {
	osType: CyberAssetOsType;
	osFamily: string;
	osVersion: string;
	discoveryType: CyberAssetDiscoveryType;
	ipAddress: string;
	macAddress: string;
	gateway: string;
	vLan: string;
	lastLogonUser: string;
	owner: string;
	userGroup: string;
	location: string;
	latitude: string;
	longitude: string;
	lastRebootTime: string;
	lastScanId: string;
	lastSeen: string;
	currentState: CyberAssetState;
	currentStatus: CyberAssetStatus;
	classification: CyberAssetClassification;
};
