import type { FC, ReactNode } from "react";

export type ICMonoMarketAppModuleType = {
	name: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	page: FC<any>;
	headerType?: "basic";
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	detailPage?: FC<any>;
};

export type ICMonoMarketAppType = {
	name: string;
	config?: FC<{ onChange: (values: unknown) => void }>;
	headerType?: "basic";
	headerTitle?: ReactNode;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	landing?: FC<any>;
	modules: ICMonoMarketAppModuleType[];
};

export type ICMonoAppPagesDefaultProps<T = null> = T extends Record<string, unknown>
	? {
			appName?: string;
			moduleName?: string;
		} & T
	: {
			appName?: string;
			moduleName?: string;
		};
