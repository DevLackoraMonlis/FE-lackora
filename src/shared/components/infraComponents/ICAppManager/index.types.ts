import type { CSSProperties, MantineStyleProp } from "@mantine/core";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { FC, ReactElement } from "react";

export type ICAppManagerInfo = {
	name: string;
	description?: string;
};
export type ICAppManagerInstallingStep = {
	name: string;
	active: boolean;
};

export type ICAppManagerAxiosApiFn<Request, Response> = (
	variables: Request,
	config?: AxiosRequestConfig,
) => Promise<AxiosResponse<Response>>;

export type ICAppManagerCardProps = ICAppManagerInfo & {
	expireDate: string;
	active: boolean;
	isExpiredLicenseSupport: boolean;
	isExpiredCommercial: boolean;
	type: ICAppManagerBusinessTypeEnum;
	hasConfig: boolean;
	isNew: boolean; // is false if installed
	isInstalled: boolean; // status != null
	isInstalling: boolean;
	onConfig?: (ConfigComponent: ReactElement) => void;
	installingSteps: ICAppManagerInstallingStep[];
	onShowNotification: (pluginName: string, moduleName: string[]) => void;
	onClick: (pluginName: string) => void;
};

// show active and valid until : 5 May 2024
/// active = true
/// expireDate
/// hide button ---> and show free or commercial text

// if active === false
/// if isExpiredLicenseSupport = true
/// show support license expired
/// button ---> open alert support license

//if active =false
/// if isExpiredCommercial = true
/// show expired
/// button ---> open activate modal

// if active === false
/// if isInstalled === false
/// show free or commercial text
/// button ---> open activate modal

// only and only if isInstalling === true
// show progress and use installingSteps
// divide 100 / installingSteps.length
// current progress (installingSteps[0].active == true)count;

export type ICAppManagerActivateProps = Pick<ICAppManagerInfo, "name"> & {
	opened: boolean;
	onClose: () => void;
	submitApi: ICAppManagerProps["submitActivateAppApi"];
	onSuccess: () => void;
	onRequestPurchase?: ICAppManagerProps["onRequestPurchase"];
};

export type ICAppManagerRestrictProps = {
	appName: string;
	onRedirectToAppStorePage: () => void;
};

export type ICAppManagerModuleType = {
	name: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	page: FC<any>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	detailPage?: FC<any>;
};

export type ICAppManagerType = {
	name: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	config?: FC<any>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	landing?: FC<any>;
	modules: ICAppManagerModuleType[];
};

export type ICAppManagerPricingType = ICAppManagerBusinessTypeEnum;

export type ICAppManagerRqFilterType = "All" | "Featured" | "MyApps";
export type ICAppManagerRqSortByType = "Name" | "Newest" | "Oldest";

export type ICAppManagerRq = {
	search?: string;
	filter: ICAppManagerRqFilterType;
	pricing: ICAppManagerPricingType;
	sortBy: ICAppManagerRqSortByType;
	page: number;
	pageSize: number;
};

export type ICAppManagerRs = Omit<
	ICAppManagerCardProps,
	"onConfig" | "onClick" | "onShowNotification"
> & {
	buildBy: string;
	category: string;
	resources: string;
	summary: string;
	activationCode: string;
	module?: string[];
};

export type ICAppManagerDetailRq = {
	name: string;
};

export type ICAppManagerPaginationRs = PaginationRs<ICAppManagerRs> & {
	info: Record<ICAppManagerRqFilterType, number>;
};

export type ModulePermissionRs = {
	create: boolean;
	read: boolean;
	edit: boolean;
	delete: boolean;
	[key: string]: boolean;
};

export type ICAppManagerActivationRs = {
	message?: string;
	activation_code?: string;
	activation_time?: string;
};

export type ICAppManagerProps = {
	onGotoLicenseManagement: () => void;
	showSupportLicenseError: boolean;
	onRequestPurchase?: (pluginName: string) => void;
	submitActivateAppApi: ICAppManagerAxiosApiFn<
		{ name: string; activationCode: string },
		ICAppManagerActivationRs
	>;
	// checkSupportLicenseApi: PluginAxiosApiFn<undefined, { expireDate: string }>;
	getAppsApi: ICAppManagerAxiosApiFn<ICAppManagerRq, ICAppManagerPaginationRs>;
	getAppApi: ICAppManagerAxiosApiFn<ICAppManagerDetailRq, ICAppManagerRs>;
	// getAllPluginsPayload: PluginManagerRq;
	onClick: ICAppManagerCardProps["onClick"];
	onShowNotification: ICAppManagerCardProps["onShowNotification"];
	permissions?: ModulePermissionRs;
};

export type PaginationRs<T> = {
	results: T[];
	total: number;
};

export type OrderType = "asc" | "desc";

export type PaginationRq = {
	page: number;
	limit: number;
	sort?: string;
	order?: OrderType;
	search?: string;
};

export type ICAppManagerHistoryRs = {
	id: string;
	user: string;
	createdTime: string;
	activationToken: string;
	appId?: string;
	status: string;
	updatedTime?: string | null;
	creator?: string | null;
	updater?: string | null;
};

export type ICAppManagerHistoryRq = {
	name: string;
	pagination: PaginationRq;
};

export type ICAppManagerDetailsProps = {
	getAppDetails: ICAppManagerProps["getAppApi"];
	getAppHistory: ICAppManagerAxiosApiFn<
		ICAppManagerHistoryRq,
		PaginationRs<ICAppManagerHistoryRs>
	>;
	name: string;
} & Pick<
	ICAppManagerProps,
	"onRequestPurchase" | "submitActivateAppApi" | "onGotoLicenseManagement"
>;

export type ICAppManagerIconType = "test";

export type ICAppManagerMenuTypeRs = {
	name: string;
	isNew: boolean;
	parentStyle?: MantineStyleProp;
	style?: MantineStyleProp;
	moduleStyle?: MantineStyleProp;
	labelModuleStyle?: CSSProperties;
	parentOnClick: () => void;
	modules: {
		name: string;
		style?: MantineStyleProp;
		btnStyle?: MantineStyleProp;
		iconStyle?: MantineStyleProp;
		moduleOnClick: () => void;
	}[];
};

export type ICAppManagerMenuProps = {
	appMenuItems: ICAppManagerMenuTypeRs[];
};

export type ICAppManagerAlertProps = {
	opened: boolean;
	onClose: () => void;
	onGotoLicenseManagement: () => void;
};

export enum ICAppManagerBusinessTypeEnum {
	COMMERCIAL = "Commercial",
	FREE = "Free",
	ALL = "All",
}
