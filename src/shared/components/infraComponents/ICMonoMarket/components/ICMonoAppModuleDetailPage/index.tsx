"use client";

import { useMonoApp } from "@/shared/components/infraComponents/ICMonoMarket/index.hooks";
import ICPageWrapper from "@/shared/components/infraComponents/ICPageWrapper";

export default function ICMonoAppModuleDetailPage() {
	const {
		app,
		module,
		showRestrictAccessApp,
		showRestrictAccessModule,
		restrictAccessElement,
		appModuleDetailId,
	} = useMonoApp();

	if (showRestrictAccessApp || showRestrictAccessModule) {
		return restrictAccessElement;
	}

	if (module?.detailPage) {
		const ModuleDetailPage = module.detailPage;

		if (module.headerType === "basic") {
			return (
				<ICPageWrapper title={module.name}>
					<ModuleDetailPage />
				</ICPageWrapper>
			);
		}
		return <ModuleDetailPage id={appModuleDetailId} appName={app?.name} moduleName={module.name} />;
	}

	return null;
}
