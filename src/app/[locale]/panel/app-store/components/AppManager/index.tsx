"use client";

import {
	getApplication,
	getApplications,
	verifyApplication,
} from "@/http/generated/application-management";
import { useI18n } from "@/locales/client";
import ICAppManager from "@/shared/components/infraComponents/ICAppManager/components/ICAppManager";
import {
	ICAppManagerBusinessTypeEnum,
	type ICAppManagerRqFilterType,
	type ICAppManagerRs,
} from "@/shared/components/infraComponents/ICAppManager/index.types";
import { AppRoutes } from "@/shared/constants/app-routes";
import { CheckIcon, Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classes from "./index.module.css";

export default function AppManager() {
	const _t = useI18n();
	const router = useRouter();

	// const { supportData } = useLicensingDetails();

	const handleOpenInNewTab = () => {
		window.open("https://cp-uat.behinrahkar.com/", "_blank");
	};

	return (
		<>
			<ICAppManager
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
					return getApplication(
						variables.name,
						config?.signal as AbortSignal,
					).then((response) => {
						const item = response.data;
						const data: ICAppManagerRs = {
							//todo
							activationCode: "",
							active: item.status === "active",
							buildBy: item.creator || "",
							category: item.category || "",
							description: item.description || "",
							expireDate: item.expiration_time as string,
							hasConfig: item.is_configurable,
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
							name: item.name || "",
							resources: item.placement || "",
							summary: item.summary || "",
							type:
								item.type === "Commercial"
									? ICAppManagerBusinessTypeEnum.COMMERCIAL
									: ICAppManagerBusinessTypeEnum.FREE,
							module: item.modules,
						};

						return {
							...response,
							data,
						};
					});
				}}
				getAppsApi={async (variables, config) => {
					const statusMap: Record<ICAppManagerRqFilterType, string> = {
						All: "all",
						MyApps: "my_applications",
						Featured: "base",
					};

					return getApplications(
						{
							limit: 100,
							page: 1,
							sort: variables.sortBy === "Name" ? "name" : "created_time",
							search: variables.search,
							order:
								variables.sortBy === "Oldest" || variables.sortBy === "Name"
									? "asc"
									: "desc",
							...(variables.pricing !== ICAppManagerBusinessTypeEnum.ALL && {
								is_paid: variables.pricing === "Commercial",
							}),
							type: statusMap[variables.filter],
						},
						config?.signal as AbortSignal,
					).then((response) => {
						const results: ICAppManagerRs[] = response.data.results.map(
							(item) => ({
								//todo activationCode
								activationCode: "",

								active: item.is_active,
								buildBy: item.creator || "",
								category: item.category || "",
								description: item.description || "",
								expireDate: item.expiration_time || "",
								hasConfig: item.is_configurable,
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
								//todo resources
								resources: "",
								summary: item.summary || "",
								type:
									item.type === "Commercial"
										? ICAppManagerBusinessTypeEnum.COMMERCIAL
										: ICAppManagerBusinessTypeEnum.FREE,
								module: item.modules,
							}),
						);

						return {
							...response,
							data: {
								...response.data,
								results,
								info: {
									All: response.data.metadata?.application_type.all || 0,
									Featured: response.data.metadata?.application_type.base || 0,
									MyApps:
										response.data.metadata?.application_type.my_applications ||
										0,
								},
							},
						};
					});
				}}
				onGotoLicenseManagement={() => {
					router.push(AppRoutes.root);
				}}
				showSupportLicenseError={false}
				//todo
				// showSupportLicenseError={supportData?.status === "expired"}
				submitActivateAppApi={(variables) => {
					return verifyApplication(variables.name, {
						activation_code: variables.activationCode,
					});
				}}
				onClick={(pluginName) => {
					router.push(AppRoutes.appDetailPage(pluginName));
				}}
			/>
		</>
	);
}
