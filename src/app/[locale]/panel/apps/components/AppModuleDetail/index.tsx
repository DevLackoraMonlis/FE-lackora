"use client";

import { useListActivePlugins } from "@/http/generated/plugin-management";
import ICAppManagerDetailPage from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerDetailPage";
import { AppRoutes } from "@/shared/constants/app-routes";
import { Box, LoadingOverlay } from "@mantine/core";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function AppModuleDetail() {
	const router = useRouter();
	const pathname = usePathname();
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
		(item) => item.name === appName.replace("%20", " "),
	);

	return (
		<Box style={{ position: "relative" }}>
			<LoadingOverlay
				visible={
					getUserPluginsQuery.isLoading || getUserPluginsQuery.isFetching
				}
			/>
			<ICAppManagerDetailPage
				loading={
					getUserPluginsQuery.isFetching || getUserPluginsQuery.isLoading
				}
				pluginName={appName.replace("%20", " ")}
				userAppModules={(appModules?.modules as string[]) || []}
				moduleName={appModuleName}
				userApps={
					getUserPluginsQuery.data?.data?.plugins?.map((item) => item.name) ||
					[]
				}
				onRedirectToPluginPage={() => {
					router.push(AppRoutes.appStore);
				}}
			/>
		</Box>
	);
}
