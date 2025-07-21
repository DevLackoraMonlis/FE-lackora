import ICMonoAppRestrictAccess from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoAppRestrictAccess";
import ICMonoMarketContext from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarketProvider/ICMonoMarketContext";
import type {
	ICMonoMarketAppModuleType,
	ICMonoMarketAppType,
} from "@/shared/components/infraComponents/ICMonoMarket/index.types";
import { AppRoutes } from "@/shared/constants/app-routes";
import { AllApplications } from "@/shared/enums/index.enums";
import activeAppsStore from "@/shared/stores/activeAppsStore";
import { useParams, useRouter } from "next/navigation";
import { type ReactElement, useContext } from "react";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

export function useMonoApp(): {
	app?: ICMonoMarketAppType;
	module?: ICMonoMarketAppModuleType;
	showRestrictAccessModule: boolean;
	showRestrictAccessApp: boolean;
	restrictAccessElement: ReactElement;
} {
	const { apps: allApps } = useContext(ICMonoMarketContext);

	const router = useRouter();
	const params = useParams();

	const appName = ((params.appName as string) || "").replaceAll("%20", " ");
	const appModuleName = ((params.appModuleName as string) || "").replaceAll("%20", " ");

	const store = useStore(
		activeAppsStore,
		useShallow((state) => ({
			apps: state.apps,
		})),
	);

	const app = allApps.find((app) => app.name === appName);
	const userAvailableApp = store.apps.find((app) => app.name === appName);
	const module = app?.modules.find((module) => module.name === appModuleName);
	const userAvailableModule = userAvailableApp?.modules.find((module) => module === appModuleName);

	return {
		app,
		module,
		showRestrictAccessModule: !module || !userAvailableModule,
		showRestrictAccessApp: !app || !userAvailableApp,
		restrictAccessElement: (
			<ICMonoAppRestrictAccess
				onRedirectToMonoMarketPage={() =>
					router.push(AppRoutes.appLandingPage(AllApplications.MONO_MARKET.name))
				}
			/>
		),
	};
}
