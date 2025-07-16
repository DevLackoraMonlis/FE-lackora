import type { AssetIdentificationAppConfigProps } from "@/builtinApps/AssetIdentificationApp/AssetIdentificationAppConfig";
import ICMonoMarketContext from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarketProvider/ICMonoMarketContext";
import { type FC, useContext } from "react";

export const useMonoMarketConfig = (params: {
	appName: string;
}) => {
	const { apps } = useContext(ICMonoMarketContext);

	let AppConfig: FC<AssetIdentificationAppConfigProps> | null = null;

	const app = apps.find((app) => app.name === params.appName);

	if (app?.config) {
		AppConfig = app.config as FC<AssetIdentificationAppConfigProps>;
	}

	return {
		AppConfig,
	};
};
