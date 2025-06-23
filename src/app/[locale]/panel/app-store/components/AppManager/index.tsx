"use client";

import { useLicensingDetails } from "@/app/[locale]/panel/management-center/system-setting/licensing/components/index.hooks";
import { useModulePermissions } from "@/hooks/useAppPermissions";
import { PluginServices } from "@/http/end-points/PluginsService";
import type { PluginStatusFilter } from "@/http/types/PluginsService.types";
import { useI18n } from "@/locales/client";
import ICAppManager from "@/shared/components/infraComponents/ICAppManager/components/ICAppManager";
import { AppRoutes } from "@/shared/constants/app-routes";
import { BRBreadcrumbs } from "@behinrahkar/br-core";
import type {
	PluginBusinessType,
	PluginManagerRqFilterType,
	PluginManagerRs,
} from "@behinrahkar/br-plugin-manager";
import { CheckIcon, Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classes from "./index.module.css";

export default function AppManager() {
	const t = useI18n();
	const router = useRouter();
	const { permissionObject } = useModulePermissions("PLUGIN_MANAGEMENT");

	const { supportData } = useLicensingDetails();

	const handleOpenInNewTab = () => {
		window.open("https://cp-uat.behinrahkar.com/", "_blank");
	};

	return (
		<>
			<BRBreadcrumbs items={[{ title: t("pluginManagement") }]} />
			<ICAppManager
				permissions={permissionObject}
				onShowNotification={(pluginName, moduleName) => {
					notifications.show({
						classNames: {
							root: classes.notificationRoot,
						},
						message: (
							<Flex>
								<p>
									The plugin has been installed successfully. You can start
									using it now!
									<Link
										href={`${AppRoutes.appModulePage(pluginName, moduleName[0])}`}
										style={{
											color: "black",
											fontWeight: "bold",
											marginLeft: "10px",
										}}
									>
										Go to {pluginName}
									</Link>
								</p>
							</Flex>
						),
						color: "green",
						title: (
							<div style={{ display: "flex", alignItems: "center" }}>
								<Flex
									mr={8}
									p={8}
									style={{ borderRadius: "50%" }}
									bg={"teal"}
									justify={"center"}
									align={"center"}
								>
									<CheckIcon size={20} style={{ color: "white" }} />
								</Flex>
								<span style={{ color: "teal", fontWeight: "bold" }}>
									Successfully installed
								</span>
							</div>
						),
						withBorder: true,
					});
				}}
				onRequestPurchase={() => handleOpenInNewTab()}
				getAppApi={async (variables, config) => {
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
								module: item.module,
							};

							return {
								...response,
								data,
							};
						},
					);
				}}
				getAppsApi={async (variables, config) => {
					const statusMap: Record<
						PluginManagerRqFilterType,
						PluginStatusFilter
					> = {
						ALL: "all",
						MY_PLUGIN: "my_plugins",
						FEATURED: "featured_plugins",
					};

					return PluginServices.getPlugins(
						{
							limit: 100,
							page: 1,
							sort: variables.sortBy === "Name" ? "name" : "created_time",
							search: variables.search,
							order:
								variables.sortBy === "Oldest" || variables.sortBy === "Name"
									? "asc"
									: "desc",
							...(variables.pricing !== "ALL" && {
								is_paid: variables.pricing === "Commercial",
							}),
							status: statusMap[variables.filter],
						},
						config,
					).then((response) => {
						const results: PluginManagerRs[] = response.data.results.map(
							(item) => ({
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
								module: item.module,
							}),
						);

						return {
							...response,
							data: {
								...response.data,
								results,
								info: {
									ALL: response.data.metadata?.plugin_type.All || 0,
									FEATURED:
										response.data.metadata?.plugin_type.featured_plugins || 0,
									MY_PLUGIN:
										response.data.metadata?.plugin_type.my_plugins || 0,
								},
							},
						};
					});
				}}
				onGotoLicenseManagement={() => {
					router.push(AppRoutes.root);
				}}
				showSupportLicenseError={supportData?.status === "expired"}
				submitActivateAppApi={(variables) => {
					return PluginServices.getPluginVerification({
						code: variables.activationCode,
						plugin_name: variables.name,
					});
				}}
				onClick={(pluginName) => {
					router.push(AppRoutes.appDetailPage(pluginName));
				}}
			/>
		</>
	);
}
