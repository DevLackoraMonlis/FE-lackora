"use client";
import ICAppManagerPage from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerPage";
import { AppRoutes } from "@/shared/constants/app-routes";
import activeAppsStore from "@/shared/stores/activeAppsStore";
import { Box } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

export default function AppModule() {
	const router = useRouter();
	const params = useParams();

	const appName = (params.appName as string) || "";
	const appModuleName = (params.appModuleName as string) || "";

	const store = useStore(
		activeAppsStore,
		useShallow((state) => ({
			apps: state.apps,
		})),
	);

	const appModules = store.apps.find((item) => item.name === appName.replaceAll("%20", " "));

	return (
		<Box style={{ position: "relative" }}>
			<ICAppManagerPage
				loading={false}
				appName={appName.replaceAll("%20", " ")}
				//todo modules type
				userAppModules={(appModules?.modules as string[]) || []}
				appModuleName={appModuleName.replaceAll("%20", " ")}
				userAvailableApps={store.apps.map((item) => item.name as string) || []}
				onRedirectToAppStorePage={() => {
					router.push(AppRoutes.appStore);
				}}
			/>
		</Box>
	);
}
