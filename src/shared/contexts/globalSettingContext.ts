"use client";

import type { MantineColorScheme } from "@mantine/core";
import { createContext } from "react";

export type GlobalTheme = "green" | "pink";

export type GlobalSetting = {
	theme: GlobalTheme;
	setTheme?: (value: GlobalTheme) => void;
	mantineTheme: MantineColorScheme;
	setMantineTheme?: (value: MantineColorScheme) => void;
};

const GlobalSettingContext = createContext<GlobalSetting>({
	theme: "green",
	mantineTheme: "light",
});

export default GlobalSettingContext;
