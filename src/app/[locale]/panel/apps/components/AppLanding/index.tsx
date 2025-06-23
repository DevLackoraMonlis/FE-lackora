"use client";

import { useListActivePlugins } from "@/http/generated/plugin-management";
import ICAppManagerLandingPage from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerLandingPage";
import { AppRoutes } from "@/shared/constants/app-routes";
import { Box, LoadingOverlay } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";

export default function AppLanding() {
	const router = useRouter();
	const params = useParams();

	const pluginName = (params.appName as string) || "";

	const getUserPluginsQuery = useListActivePlugins({
		query: {
			queryKey: ["get-user-apps"],
			refetchOnMount: true,
		},
	});

	return (
		<Box style={{ position: "relative" }}>
			<LoadingOverlay
				visible={
					getUserPluginsQuery.isLoading || getUserPluginsQuery.isFetching
				}
			/>
			<ICAppManagerLandingPage
				loading={
					getUserPluginsQuery.isLoading || getUserPluginsQuery.isFetching
				}
				appName={pluginName.replaceAll("%20", " ")}
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
