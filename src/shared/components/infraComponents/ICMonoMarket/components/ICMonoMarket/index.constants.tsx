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
