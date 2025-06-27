"use client";
import ICAppManagerLandingPage from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerLandingPage";
import { AppRoutes } from "@/shared/constants/app-routes";
import activeAppsStore from "@/shared/stores/activeAppsStore";
import { Box } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

export default function AppLanding() {
	const router = useRouter();
	const params = useParams();

	const appName = (params.appName as string) || "";

	const store = useStore(
		activeAppsStore,
		useShallow((state) => ({
			apps: state.apps,
		})),
	);

	return (
		<Box style={{ position: "relative" }}>
			<ICAppManagerLandingPage
				loading={false}
				appName={appName.replaceAll("%20", " ")}
				userAvailableApps={store.apps.map((item) => item.name as string) || []}
				onRedirectToAppStorePage={() => {
					router.push(AppRoutes.appStore);
				}}
			/>
		</Box>
	);
}
