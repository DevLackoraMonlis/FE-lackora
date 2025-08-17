"use client";

import GlobalSettingContext, { type GlobalTheme } from "@/shared/contexts/globalSettingContext";
import { type PropsWithChildren, useCallback, useEffect } from "react";
import { useState } from "react";

export default function ContextProvider(props: PropsWithChildren) {
	const [theme, setTheme] = useState<GlobalTheme>("green");

	const handleSetTheme = useCallback((newTheme: GlobalTheme) => {
		setTheme(newTheme);
		window.localStorage.setItem("global-theme", newTheme);
	}, []);

	useEffect(() => {
		const defaultTheme = window.localStorage.getItem("global-theme");
		console.log(defaultTheme, "deg");
		if (defaultTheme) {
			setTheme(defaultTheme as GlobalTheme);
		}
	}, []);

	return (
		<GlobalSettingContext.Provider value={{ theme, setTheme: handleSetTheme }}>
			{props.children}
		</GlobalSettingContext.Provider>
	);
}
