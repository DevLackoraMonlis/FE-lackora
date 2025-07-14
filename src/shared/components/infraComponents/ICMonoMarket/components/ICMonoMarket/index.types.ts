import type {
	MonoAppProductTypeEnum,
	MonoAppStatusTypeEnum,
} from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.enum";

export type MonoMarketCardProps = {
	name: string;
	label: string;
	productType: MonoAppProductTypeEnum;
	owner: string;
	version: string;
	description: string;
	hasRequiredSupportLicense: boolean;
	hasConfig: boolean;
	isConfigured: boolean;
	supportLicenseExpireDate: string;
	status: MonoAppStatusTypeEnum;
	onActiveOnly: VoidFunction;
	onActiveWithConfig: VoidFunction;
};
