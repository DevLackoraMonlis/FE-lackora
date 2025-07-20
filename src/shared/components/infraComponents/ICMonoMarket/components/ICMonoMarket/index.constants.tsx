import { MonoAppProductTypeEnum } from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.enum";

export const MonoAppProductTypeShortName: Record<MonoAppProductTypeEnum, string> = {
	[MonoAppProductTypeEnum.ENTERPRISE]: "ES",
	[MonoAppProductTypeEnum.PROFESSIONAL]: "PS",
	[MonoAppProductTypeEnum.STANDARD]: "SS",
};

export const MonoAppProductColor: Record<MonoAppProductTypeEnum, string> = {
	[MonoAppProductTypeEnum.PROFESSIONAL]: "#AE3EC9",
	[MonoAppProductTypeEnum.ENTERPRISE]: "#FAB005",
	[MonoAppProductTypeEnum.STANDARD]: "#4C6EF5",
};

export const GET_MONO_MARKET_APPS_QUERY_KEY = "get-mono-market-apps";
export const GET_MONO_MARKET_ACTIVATE_QUERY_KEY = "get-mono-app-active";
