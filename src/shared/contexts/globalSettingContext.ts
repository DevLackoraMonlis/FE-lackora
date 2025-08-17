"use client";

import { createContext } from "react";

export type GlobalTheme = "green" | "pink";

export type GlobalSetting = {
	theme: GlobalTheme;
	setTheme?: (value: GlobalTheme) => void;
};

const GlobalSettingContext = createContext<GlobalSetting>({
	theme: "green",
});

export default GlobalSettingContext;
