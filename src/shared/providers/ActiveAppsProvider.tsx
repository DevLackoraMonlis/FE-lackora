"use client";

import activeAppsStore, {
	type ActiveAppsStoreType,
} from "@/shared/stores/activeAppsStore";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";

type Props = PropsWithChildren<{
	apps: ActiveAppsStoreType["apps"];
}>;

export function ActiveAppsProvider(props: Props) {
	useEffect(() => {
		activeAppsStore.getState().setApps(props.apps);
	}, [props.apps]);

	return <>{props.children}</>;
}
