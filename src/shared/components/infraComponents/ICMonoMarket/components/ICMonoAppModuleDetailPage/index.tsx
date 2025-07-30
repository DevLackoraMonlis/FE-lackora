"use client";

import { useMonoApp } from "@/shared/components/infraComponents/ICMonoMarket/index.hooks";
import ICPageWrapper from "@/shared/components/infraComponents/ICPageWrapper";

export default function ICMonoAppModuleDetailPage() {
	const { app, module, showRestrictAccessApp, showRestrictAccessModule, restrictAccessElement } =
		useMonoApp();

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
		return <ModuleDetailPage appName={app?.name} moduleName={module.name} />;
	}

	return null;
}
