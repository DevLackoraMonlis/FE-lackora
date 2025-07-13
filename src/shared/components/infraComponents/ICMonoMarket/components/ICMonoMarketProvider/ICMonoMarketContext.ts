"use client";

import { createContext } from "react";
import type { ICMonoMarketAppType } from "../../index.types";

export type GlobalSetting = {
	apps: ICMonoMarketAppType[];
};

const ICMonoMarketContext = createContext<GlobalSetting>({
	apps: [],
});

export default ICMonoMarketContext;
