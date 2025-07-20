import type {
	MonoAppProductTypeEnum,
	MonoAppStatusTypeEnum,
} from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.enum";

export type MonoMarketCardProps = {
	id: string;
	name: string;
	label: string;
	productType: MonoAppProductTypeEnum;
	owner: string;
	version: string;
	description: string;
	hasRequiredSupportLicense: boolean;
	configRequired: boolean;
	isConfigured: boolean;
	supportLicenseExpireDate: string;
	status: MonoAppStatusTypeEnum;
	onActiveOnly: VoidFunction;
	onActiveWithConfig: VoidFunction;
	onShowMore: VoidFunction;
	keyCapabilities: string;
	businessValue: string;
	configurationRequired: string;
	isProcessing: boolean;
	onOpen: VoidFunction;
	isAvailable: boolean;
	selectedAppId?: string;
};
