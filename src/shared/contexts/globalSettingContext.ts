"use client";

import { createContext } from "react";

export type GlobalSetting = {
	openSidePanel: boolean;
	setOpenSidePanel?: (value: boolean) => void;
};

const GlobalSettingContext = createContext<GlobalSetting>({
	openSidePanel: false,
});

export default GlobalSettingContext;
