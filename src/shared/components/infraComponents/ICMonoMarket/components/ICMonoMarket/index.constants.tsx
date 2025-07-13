import { MonoAppProductTypeEnum } from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.enum";

export const MonoAppProductTypeShortName: Record<MonoAppProductTypeEnum, string> = {
	[MonoAppProductTypeEnum.ENTERPRISE]: "ENT",
	[MonoAppProductTypeEnum.PROFESSIONAL]: "PRO",
	[MonoAppProductTypeEnum.STANDARD]: "STD",
};

export const MonoAppProductColor: Record<MonoAppProductTypeEnum, string> = {
	[MonoAppProductTypeEnum.PROFESSIONAL]: "#AE3EC9",
	[MonoAppProductTypeEnum.ENTERPRISE]: "#FAB005",
	[MonoAppProductTypeEnum.STANDARD]: "#4C6EF5",
};
