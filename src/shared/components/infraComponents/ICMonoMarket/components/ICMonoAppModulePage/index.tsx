"use client";

import { useMonoApp } from "@/shared/components/infraComponents/ICMonoMarket/index.hooks";
import ICPageWrapper from "../../../ICPageWrapper";

export default function ICMonoAppModulePage() {
	const { app, module, showRestrictAccessModule, showRestrictAccessApp, restrictAccessElement } =
		useMonoApp();

	if (showRestrictAccessApp || showRestrictAccessModule) {
		return restrictAccessElement;
	}

	if (module?.page) {
		const ModulePage = module.page;
		if (module.headerType === "basic") {
			return (
				<ICPageWrapper title={module.name}>
					<ModulePage />
				</ICPageWrapper>
			);
		}
		return <ModulePage appName={app?.name} moduleName={module.name} />;
	}

	return null;
}
