"use client";

import { PluginServices } from "@/http/end-points/PluginsService";
import { useI18n } from "@/locales/client";
import ICAppManagerDetail from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerDetail";
import { AppRoutes } from "@/shared/constants/app-routes";
import GlobalSettingContext from "@/shared/contexts/globalSettingContext";
import { BRBreadcrumbs } from "@behinrahkar/br-core";
import type {
	PluginBusinessType,
	PluginManagerHistoryRs,
	PluginManagerRs,
} from "@behinrahkar/br-plugin-manager";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function AppDetail() {
	const t = useI18n();
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
		<>
			<BRBreadcrumbs
				items={[
					{
						title: "App Store",
						href: AppRoutes.appStore,
						onGoToTarget: (href) => router.push(href),
					},
					{ title: decodeURIComponent(params.appName as string) },
				]}
			/>
			<ICAppManagerDetail
				onGotoLicenseManagement={() => {
					router.push(AppRoutes.licenseManagement);
				}}
				onRequestPurchase={() => {
					handleOpenInNewTab();
				}}
				submitApi={(variables) => {
					return PluginServices.getPluginVerification({
						code: variables.activationCode,
						plugin_name: variables.name,
					});
				}}
				getPluginDetails={async (variables, config) => {
					return PluginServices.getPluginByName(variables.name, config).then(
						(response) => {
							const item = response.data;
							const data: PluginManagerRs = {
								activationCode: item.activation_token,
								active: item.status === "active",
								buildBy: item.build_by || "",
								category: item.category || "",
								description: item.description || "",
								expireDate: item.expiration_time,
								hasConfig: item.has_config,
								installingSteps:
									item.installingsteps?.map((st) => ({
										...st,
										active: st.action,
									})) || [],
								isExpiredCommercial: item.status === "expired",
								isExpiredLicenseSupport:
									item.status === "support_licensed_expired",
								isInstalled: item.status !== null,
								isInstalling: item.is_installing,
								isNew: item.is_new && item.status === null,
								name: item.name,
								resources: item.resources || "",
								summary: item.summary || "",
								type: (item.is_paid
									? "Commercial"
									: "Free") as PluginBusinessType,
							};

							return {
								...response,
								data,
							};
						},
					);
				}}
				getPluginHistory={async (variables, config) => {
					return PluginServices.getPluginHistoryByName(
						{ pluginName: variables.name, ...variables.pagination },
						config,
					).then((response) => {
						const data = response.data.results;
						const results: PluginManagerHistoryRs[] = data.map((item) => ({
							activation_token: item.activation_token || "",
							created_time: item.created_time,
							creator: item.creator || "",
							id: item.id,
							plugin_id: item.plugin_name,
							status: item.status,
							updated_time: item.updated_time,
							updater: item.updater,
							user: item.user,
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
		</>
	);
}
