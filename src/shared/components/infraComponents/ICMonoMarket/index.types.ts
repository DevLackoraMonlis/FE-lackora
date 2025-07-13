import type { FC, ReactNode } from "react";

export type ICMonoMarketAppModuleType = {
	name: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	page: FC<any>;
	headerType?: "basic";
	headerTitle?: ReactNode;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	detailPage?: FC<any>;
};

export type ICMonoMarketAppType = {
	name: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	config?: FC<any>;
	headerType?: "basic";
	headerTitle?: ReactNode;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	landing?: FC<any>;
	modules: ICMonoMarketAppModuleType[];
};
