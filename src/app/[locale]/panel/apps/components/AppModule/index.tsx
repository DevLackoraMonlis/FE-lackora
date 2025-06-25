"use client";

import { useListActivePlugins } from "@/http/generated/plugin-management";
import ICAppManagerPluginPage from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerPluginPage";
import { AppRoutes } from "@/shared/constants/app-routes";
import { Box, LoadingOverlay } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";

export default function AppModule() {
	const router = useRouter();
	const params = useParams();

	const appName = (params.appName as string) || "";
	const appModuleName = (params.appModuleName as string) || "";

	const getUserPluginsQuery = useListActivePlugins({
		query: {
			queryKey: ["get-user-apps"],
			refetchOnMount: true,
		},
	});

	const appModules = getUserPluginsQuery.data?.data?.plugins?.find(
		(item) => item.name === appName.replaceAll("%20", " "),
	);

	return (
		<Box style={{ position: "relative" }}>
			<LoadingOverlay
				visible={
					getUserPluginsQuery.isLoading || getUserPluginsQuery.isFetching
				}
			/>
			<ICAppManagerPluginPage
				loading={
					getUserPluginsQuery.isLoading || getUserPluginsQuery.isFetching
				}
				appName={appName.replaceAll("%20", " ")}
				//todo modules type
				userAppModules={(appModules?.modules as string[]) || []}
				appModuleName={appModuleName.replaceAll("%20", " ")}
				userAvailableApps={
					getUserPluginsQuery.data?.data?.plugins?.map((item) => item.name) ||
					[]
				}
				onRedirectToAppStorePage={() => {
					router.push(AppRoutes.appStore);
				}}
			/>
		</Box>
	);
}
