import type {
	CyberAssetClassificationEnum,
	CyberAssetCriticalityEnum,
	CyberAssetDiscoveryTypeEnum,
	CyberAssetOsTypeEnum,
	CyberAssetStateEnum,
	CyberAssetStatusEnum,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.enum";
import type {
	ICAdvancedFilterRq,
	ICAdvancedFilterStoreType,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import type { LabelValueType } from "@/shared/lib/general-types";
import type { ReactNode } from "react";
import type { StoreApi } from "zustand/index";

export type CyberAssetsDefaultProps = { defaultFilterParams?: ICAdvancedFilterRq };

export type CyberAssetDetailGeneralInfoCardProps = {
	title: string;
	items: LabelValueType<ReactNode>[];
	icon: ReactNode;
	isLoading: boolean;
};

export type CyberAssetDetailGeneralInfoProps = {
	title: string;
	icon: ReactNode;
	subTitle: string;
	upTimeTitle: string;
	onEdit: VoidFunction;
	onCheckConnection: VoidFunction;
	items: Omit<CyberAssetDetailGeneralInfoCardProps, "isLoading">[];
	indicatorColor: "green" | "red" | "yellow";
};

export type CyberAssetDetailProps = {
	generalInfoProps: CyberAssetDetailGeneralInfoProps;
};

export type CuberAssetDetailGeneralInfoData = {
	osType: CyberAssetOsTypeEnum;
	osFamily: string;
	osVersion: string;
	discoveryType: CyberAssetDiscoveryTypeEnum;
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
	currentState: CyberAssetStateEnum;
	currentStatus: CyberAssetStatusEnum;
	classification: CyberAssetClassificationEnum;
};

export type CyberAssetDetailOverviewCpu = {
	cores: number;
	processors: number;
};

export type CyberAssetDetailOverviewNetworkOpenPort = {
	name: string;
};

export type CyberAssetDetailOverviewNetworkType = "STATIC" | "DHCP";

export type CyberAssetDetailOverviewNetwork = {
	ip: string;
	type: CyberAssetDetailOverviewNetworkType;
	openPorts: CyberAssetDetailOverviewNetworkOpenPort[];
};

export type CyberAssetDetailOverviewChangeType = "modify" | "delete" | "add";

export type CyberAssetDetailOverviewChange = {
	total: number;
	summary: Record<CyberAssetDetailOverviewChangeType, number>;
};

export type CyberAssetDetailOverviewTopServiceStatus = "RUNNING" | "STOPPED";

export type CyberAssetDetailOverviewTopService = {
	name: string;
	status: CyberAssetDetailOverviewTopServiceStatus;
};

export type CyberAssetDetailOverviewServiceStartType = "Manual" | "Auto" | "Disabled" | "Unknown";
export type CyberAssetDetailOverviewServiceStart = {
	total: number;
	type: string;
	summary: Record<CyberAssetDetailOverviewServiceStartType, number>;
};

export type CyberAssetDetailOverviewApplicationItem = {
	name: string;
	installDate: string;
};

export type CyberAssetDetailOverviewApplication = {
	total: number;
	items: CyberAssetDetailOverviewApplicationItem[];
};

export type CyberAssetDetailOverviewApplicationSecurityStatus =
	| "MC EXPIRED"
	| "FAILED"
	| "UPGRADE"
	| "ACTIVE"
	| "DE ACTIVE";

export type CyberAssetDetailOverviewApplicationSecurity = {
	riskScore: number | null;
	criticality: CyberAssetCriticalityEnum;
	totalVulnerabilities: number;
	summary?: Record<Partial<CyberAssetCriticalityEnum>, number>;
	topVulnerabilities: {
		name: string;
		criticality: CyberAssetCriticalityEnum;
	}[];
	onActivateVulnerabilitiesAssessment: VoidFunction;
	onFailed: VoidFunction;
	onMCExpired: VoidFunction;
	onUpgradeLicense: VoidFunction;
	status: CyberAssetDetailOverviewApplicationSecurityStatus;
	appName: string;
};

export type CyberAssetDetailOverviewAvailabilityAndActivityTimelineType = "Online" | "Offline" | "Unmanaged";

export type CyberAssetDetailOverviewAvailabilityTimeline = {
	description: string;
	type: CyberAssetDetailOverviewAvailabilityAndActivityTimelineType;
};

export type CyberAssetDetailOverviewActivityTimeline = {
	title: string;
	time: string;
	description: string;
};

export type CyberAssetDetailOverviewAvailabilityAndActivity = {
	availability: CyberAssetDetailOverviewAvailabilityTimeline[];
	activity: CyberAssetDetailOverviewActivityTimeline[];
};

export type CyberAssetDetailOverviewNotificationType = "AVAILABILITY" | "FAILED" | "PATCH" | "CONFLICT";

export type CyberAssetDetailOverviewNotification = {
	title: string;
	description: string;
	date: string;
	type: CyberAssetDetailOverviewNotificationType;
	sourceBy: string;
};

export type CyberAssetDetailOverviewProps = {
	configurationItemsCount: number;
	osName: string;
	osType: CyberAssetOsTypeEnum;
	cpu: CyberAssetDetailOverviewCpu;
	ram: number;
	disk: number;
	network: CyberAssetDetailOverviewNetwork;
	changes: CyberAssetDetailOverviewChange;
	topServices: CyberAssetDetailOverviewTopService[];
	serviceStartTypes: CyberAssetDetailOverviewServiceStart;
	applications: CyberAssetDetailOverviewApplication;
	security: CyberAssetDetailOverviewApplicationSecurity;
	availabilityAndActivity: CyberAssetDetailOverviewAvailabilityAndActivity;
	notifications: CyberAssetDetailOverviewNotification[];
};

export type CyberAssetDetailInventoryType = { type: LabelValueType; items: LabelValueType[] };
export type CyberAssetDetailInventoryStoreData = { type: string; store: StoreApi<ICAdvancedFilterStoreType> };

export type CyberAssetDetailInventoryProps = {
	id?: string;
};
