"use client";

import GlobalSettingContext, { type GlobalTheme } from "@/shared/contexts/globalSettingContext";
import type { MantineColorScheme } from "@mantine/core";
import { type PropsWithChildren, useCallback, useEffect } from "react";
import { useState } from "react";

export default function ContextProvider(props: PropsWithChildren) {
	const [theme, setTheme] = useState<GlobalTheme>("green");
	const [mantineTheme, setMantineTheme] = useState<MantineColorScheme>("light");

	const handleSetTheme = useCallback((newTheme: GlobalTheme) => {
		setTheme(newTheme);
		window.localStorage.setItem("global-theme", newTheme);
	}, []);

	const handleSetThemeIsDark = useCallback((scheme: MantineColorScheme) => {
		setMantineTheme(scheme);
		window.localStorage.setItem("mantine-theme", scheme);
	}, []);

	useEffect(() => {
		const defaultTheme = window.localStorage.getItem("global-theme");
		const mantineTheme = window.localStorage.getItem("mantine-theme");
		if (defaultTheme) {
			setTheme(defaultTheme as GlobalTheme);
		}
		if (mantineTheme) {
			setMantineTheme(mantineTheme as MantineColorScheme);
		}
	}, []);

	return (
		<GlobalSettingContext.Provider
			value={{ theme, setTheme: handleSetTheme, mantineTheme, setMantineTheme: handleSetThemeIsDark }}
		>
			{props.children}
		</GlobalSettingContext.Provider>
	);
}
