"use client";

import { useMonoApp } from "@/shared/components/infraComponents/ICMonoMarket/index.hooks";
import ICPageWrapper from "../../../ICPageWrapper";

export default function ICMonoAppLandingPage() {
	const { app, showRestrictAccessApp, restrictAccessElement } = useMonoApp();

	if (showRestrictAccessApp) {
		return restrictAccessElement;
	}

	if (app?.landing) {
		const LandingPlugin = app.landing;
		return (
			<ICPageWrapper title={app.headerTitle}>
				<LandingPlugin />
			</ICPageWrapper>
		);
	}

	return null;
}
