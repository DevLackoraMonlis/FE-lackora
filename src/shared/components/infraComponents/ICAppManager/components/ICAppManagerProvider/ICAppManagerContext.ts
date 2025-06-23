"use client";

import { createContext } from "react";
import type { ICAppManagerType } from "../../index.types";

export type GlobalSetting = {
	apps: ICAppManagerType[];
};

const ICAppManagerContext = createContext<GlobalSetting>({
	apps: [],
});

export default ICAppManagerContext;
