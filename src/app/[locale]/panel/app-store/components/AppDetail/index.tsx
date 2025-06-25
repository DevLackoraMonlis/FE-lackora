"use client";

import {
	getApplication,
	getApplicationHistory,
	verifyApplication,
} from "@/http/generated/application-management";
import ICAppManagerDetail from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerDetail";
import {
	ICAppManagerBusinessTypeEnum,
	type ICAppManagerHistoryRs,
	type ICAppManagerRs,
} from "@/shared/components/infraComponents/ICAppManager/index.types";
import { AppRoutes } from "@/shared/constants/app-routes";
import GlobalSettingContext from "@/shared/contexts/globalSettingContext";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function AppDetail() {
	const params = useParams();
	const pathname = usePathname();
	const appName = (params.appName as string) || "";
	const router = useRouter();

	const { setOpenSidePanel } = useContext(GlobalSettingContext);

	const handleOpenInNewTab = () => {
		window.open("https://cp-uat.behinrahkar.com/", "_blank");
	};

	// biome-ignore lint: useExhaustiveDependencies
	useEffect(() => {
		if (pathname === AppRoutes.appDetailPage(appName)) {
			setOpenSidePanel?.(false);
		}
	}, [pathname]);

	return (
		<ICAppManagerDetail
			onGotoLicenseManagement={() => {
				router.push(AppRoutes.licenseManagement);
			}}
			onRequestPurchase={() => {
				handleOpenInNewTab();
			}}
			submitApi={(variables) => {
				return verifyApplication(variables.name, {
					activation_code: variables.activationCode,
				});
			}}
			getPluginDetails={async (variables, config) => {
				return getApplication(
					variables.name,
					config?.signal as AbortSignal,
				).then((response) => {
					const item = response.data;
					const data: ICAppManagerRs = {
						//todo
						activationCode: "",
						active: item.is_active,
						buildBy: item.creator || "",
						category: item.category || "",
						description: item.description || "",
						//todo expiration_time type
						expireDate: item.expiration_time as string,
						hasConfig: item.is_configurable,
						// todo installingSteps
						installingSteps:
							item.installingsteps?.map((st) => ({
								...st,
								active: st.action,
							})) || [],
						isExpiredCommercial: item.status === "expired",
						isExpiredLicenseSupport: item.status === "support_licensed_expired",
						isInstalled: item.current_step === "installed",
						isInstalling: item.is_installing,
						isNew: item.is_new && item.status === null,
						name: item.name || "",
						resources: "",
						summary: item.summary || "",
						type:
							item.type === "Commercial"
								? ICAppManagerBusinessTypeEnum.COMMERCIAL
								: ICAppManagerBusinessTypeEnum.FREE,
					};

					return {
						...response,
						data,
					};
				});
			}}
			getPluginHistory={async (variables, config) => {
				return getApplicationHistory(
					variables.name,
					{ ...variables.pagination },
					config?.signal as AbortSignal,
				).then((response) => {
					const data = response.data.results;
					const results: ICAppManagerHistoryRs[] = data.map((item) => ({
						//todo application_id,updater,updated_time,user
						activationToken: item.application_id || "",
						createdTime: item.created_time,
						creator: item.creator || "",
						id: item.id,
						appId: item.application_id,
						status: item.status,
						user: item.creator,
					}));

					return {
						...response,
						data: {
							...response.data,
							results,
						},
					};
				});
			}}
			name={appName}
		/>
	);
}
