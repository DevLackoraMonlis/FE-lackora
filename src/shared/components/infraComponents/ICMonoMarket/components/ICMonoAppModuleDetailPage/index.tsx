"use client";

import { useMonoApp } from "@/shared/components/infraComponents/ICMonoMarket/index.hooks";
import ICPageWrapper from "@/shared/components/infraComponents/ICPageWrapper";

export default function ICMonoAppModuleDetailPage() {
	const { module, showRestrictAccessApp, showRestrictAccessModule, restrictAccessElement } = useMonoApp();

	if (showRestrictAccessApp || showRestrictAccessModule) {
		return restrictAccessElement;
	}

	if (module?.detailPage) {
		const ModulePlugin = module.detailPage;

		if (module.headerType === "basic") {
			return (
				<ICPageWrapper title={module.name}>
					<ModulePlugin />
				</ICPageWrapper>
			);
		}
		return <ModulePlugin />;
	}

	return null;
}
