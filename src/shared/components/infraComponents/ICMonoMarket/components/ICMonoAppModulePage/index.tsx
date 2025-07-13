"use client";

import { useMonoApp } from "@/shared/components/infraComponents/ICMonoMarket/index.hooks";
import ICPageWrapper from "../../../ICPageWrapper";

export default function ICMonoAppModulePage() {
	const { module, showRestrictAccessModule, showRestrictAccessApp, restrictAccessElement } = useMonoApp();

	if (showRestrictAccessApp || showRestrictAccessModule) {
		return restrictAccessElement;
	}

	if (module?.page) {
		const ModulePlugin = module.page;
		return (
			<ICPageWrapper title={module.headerTitle}>
				<ModulePlugin />
			</ICPageWrapper>
		);
	}

	return null;
}
