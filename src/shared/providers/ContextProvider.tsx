"use client";

import GlobalSettingContext from "@/shared/contexts/globalSettingContext";
import type { PropsWithChildren } from "react";
import { useState } from "react";

export default function ContextProvider(props: PropsWithChildren) {
	const [openSidePanel, setOpenSidePanel] = useState<boolean>(true);

	return (
		<GlobalSettingContext.Provider value={{ openSidePanel, setOpenSidePanel }}>
			{props.children}
		</GlobalSettingContext.Provider>
	);
}
