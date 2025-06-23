"use client";
import { useEffect } from "react";
import type { PropsWithChildren } from "react";
import { useState } from "react";
import type { ICAppManagerType } from "../../index.types";
import ICAppManagerContext from "./ICAppManagerContext";

export default function ICAppManagerProvider(
	props: PropsWithChildren<{ plugins: ICAppManagerType[] }>,
) {
	const [plugins, registerPlugins] = useState<ICAppManagerType[]>(
		props.plugins,
	);

	useEffect(() => {
		if (props.plugins.length) {
			registerPlugins(props.plugins);
		}
	}, [props.plugins]);

	return (
		<ICAppManagerContext.Provider value={{ apps: plugins }}>
			{props.children}
		</ICAppManagerContext.Provider>
	);
}
