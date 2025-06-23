"use client";

import { PluginServices } from "@/http/end-points/PluginsService";
import ICAppManagerDetailPage from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerDetailPage";
import { AppRoutes } from "@/shared/constants/app-routes";
import { Box, LoadingOverlay } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function AppModuleDetail() {
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams();

	const appName = (params.appName as string) || "";
	const appModuleName = (params.appModuleName as string) || "";

	const getUserPluginsQuery = useQuery({
		queryKey: ["get-user-app-detail", pathname],
		queryFn: ({ signal }) => PluginServices.getAvailablePlugins({ signal }),
		refetchOnMount: true,
	});

	const appModules = getUserPluginsQuery.data?.data.find(
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
				userPluginModules={appModules?.module || []}
				moduleName={appModuleName}
				userPlugins={
					getUserPluginsQuery.data?.data.map((item) => item.name) || []
				}
				onRedirectToPluginPage={() => {
					router.push(AppRoutes.appStore);
				}}
			/>
		</Box>
	);
}
