"use client";
import ICAppManagerDetailPage from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerDetailPage";
import { AppRoutes } from "@/shared/constants/app-routes";
import activeAppsStore from "@/shared/stores/activeAppsStore";
import { Box } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

export default function AppModuleDetail() {
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

	const appModules = store.apps.find((item) => item.name === appName.replace("%20", " "));

	return (
		<Box style={{ position: "relative" }}>
			<ICAppManagerDetailPage
				loading={false}
				appName={appName.replace("%20", " ")}
				userAppModules={appModules?.modules as string[]}
				moduleName={appModuleName}
				userApps={store.apps.map((item) => item.name)}
				onRedirectToPluginPage={() => {
					router.push(AppRoutes.appStore);
				}}
			/>
		</Box>
	);
}
