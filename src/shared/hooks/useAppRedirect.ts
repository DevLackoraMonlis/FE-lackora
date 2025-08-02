import { useRouter } from "next/navigation";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

import { AppRoutes } from "../constants/routes";
import activeAppsStore from "../stores/activeAppsStore";

export const useAppRedirect = () => {
	const router = useRouter();
	const store = useStore(
		activeAppsStore,
		useShallow((state) => ({
			apps: state.apps,
		})),
	);

	const onOpenApp = (appName: string) => {
		const findApp = store.apps.find((app) => app.name === appName);
		if (findApp) {
			router.push(
				findApp.has_landing
					? AppRoutes.appLandingPage(appName)
					: AppRoutes.appModulePage(appName, findApp.modules[0]),
			);
			return;
		}
		router.push(AppRoutes.appLandingPage(appName));
	};

	return { onOpenApp };
};
