"use client";

import GlobalSettingContext from "@/shared/contexts/globalSettingContext";
import useMantineBaseTheme from "@/shared/hooks/useMantineBaseTheme";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { type PropsWithChildren, useContext } from "react";
import nonce from "../../../../nonce";

export default function MantineBaseProvider(props: PropsWithChildren) {
	const { theme } = useContext(GlobalSettingContext);
	const { mantineBaseTheme } = useMantineBaseTheme(theme);

	console.log(theme, mantineBaseTheme);

	return (
		<MantineProvider
			getStyleNonce={() => nonce.nonce}
			defaultColorScheme={"light"}
			withCssVariables
			theme={mantineBaseTheme}
		>
			<Notifications position="top-right" zIndex={Number.MAX_SAFE_INTEGER} />
			{props.children}
		</MantineProvider>
	);
}
