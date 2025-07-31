import type {
	CyberAssetClassification,
	CyberAssetCriticality,
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

export type CyberAssetDetailOverviewCpu = {
	cores: number;
	processors: number;
};

export type CyberAssetDetailOverviewNetworkOpen = "HTTP" | "HTTPS";

export type CyberAssetDetailOverviewNetworkOpenPort = {
	name: string;
	type: CyberAssetDetailOverviewNetworkOpen;
};

export type CyberAssetDetailOverviewNetworkType = "STATIC" | "DHCP";

export type CyberAssetDetailOverviewNetwork = {
	ip: string;
	type: CyberAssetDetailOverviewNetworkType;
	openPorts: CyberAssetDetailOverviewNetworkOpenPort[];
};

export type CyberAssetDetailOverviewChangeType = "MODIFY" | "DELETE" | "ADD";

export type CyberAssetDetailOverviewChange = {
	total: number;
	summary: Record<CyberAssetDetailOverviewChangeType, number>;
};

export type CyberAssetDetailOverviewTopServiceStatus = "RUNNING" | "STOPPED";

export type CyberAssetDetailOverviewTopService = {
	name: string;
	status: CyberAssetDetailOverviewTopServiceStatus;
};

export type CyberAssetDetailOverviewServiceStartType = "Automatic" | "Manual" | "Disabled";

export type CyberAssetDetailOverviewServiceStart = {
	total: number;
	type: CyberAssetDetailOverviewServiceStartType;
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
	criticality: CyberAssetCriticality;
	totalVulnerabilities: number;
	summary: Record<CyberAssetCriticality, number>;
	topVulnerabilities: {
		name: string;
		criticality: CyberAssetCriticality;
	}[];
	onActivateVulnerabilitiesAssessment: VoidFunction;
	onFailed: VoidFunction;
	onMCExpired: VoidFunction;
	onUpgradeLicense: VoidFunction;
	status: CyberAssetDetailOverviewApplicationSecurityStatus;
	appName: string;
};

export type CyberAssetDetailOverviewAvailabilityAndActivityTimelineType = "Online" | "Offline" | "Unmanaged";

export type CyberAssetDetailOverviewAvailabilityAndActivityTimeline = {
	description: string;
	type: CyberAssetDetailOverviewAvailabilityAndActivityTimelineType;
};

export type CyberAssetDetailOverviewAvailabilityAndActivityActivity = {
	title: string;
	time: string;
	description: string;
};

export type CyberAssetDetailOverviewAvailabilityAndActivity = {
	timeline: CyberAssetDetailOverviewAvailabilityAndActivityTimeline[];
	activity: CyberAssetDetailOverviewAvailabilityAndActivityActivity[];
};

export type CyberAssetDetailOverviewNotificationType = "AVAILABILITY" | "FAILED" | "PATCH" | "CONFLICT";

export type CyberAssetDetailOverviewNotification = {
	title: string;
	description: string;
	date: string;
	source: string;
	type: CyberAssetDetailOverviewNotificationType;
};

export type CyberAssetDetailOverviewProps = {
	configurationItemsCount: number;
	osName: string;
	osType: CyberAssetOsType;
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
