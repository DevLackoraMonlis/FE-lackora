"use client";
import { useActivateMonoApplication, useGetApplications } from "@/http/generated/application-management";
import type { ApplicationHistoryStatus, EachMetadataFilterItems } from "@/http/generated/models";
import BCSideFilter, { type BCSideFilterItem } from "@/shared/components/baseComponents/BCSideFilter";
import MonoMarketActivationNonConfigAppModal from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/components/MonoMarketActivationNonConfigAppModal";
import MonoMarketActivationWithConfigAppModal from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/components/MonoMarketActivationWithConfigAppModal";
import MonoMarketAppDetailsModal from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/components/MonoMarketAppDetailsModal";
import MonoMarketCard from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/components/MonoMarketCard";
import MonoMarketCardSkeleton from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/components/MonoMarketCardSkeleton";
import {
	GET_MONO_MARKET_ACTIVATE_QUERY_KEY,
	GET_MONO_MARKET_APPS_QUERY_KEY,
} from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.constants";
import {
	MonoAppProductTypeEnum,
	MonoAppStatusTypeEnum,
} from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.enum";
import { useMonoMarket } from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.hooks";
import type { MonoMarketCardProps } from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.types";
import { AppRoutes } from "@/shared/constants/app-routes";
import { useStableData } from "@/shared/hooks/useStableData";
import { useTablePagination } from "@/shared/hooks/useTablePagination";
import { Flex, Grid, Pagination, ScrollArea } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SelectAppType = Omit<
	MonoMarketCardProps,
	"onActiveOnly" | "onActiveWithConfig" | "onShowMore" | "isProcessing" | "onOpen" | "selectedAppId"
>;

export default function ICMonoMarket() {
	const { height } = useViewportSize();
	const router = useRouter();
	const [filters, setFilters] = useState<Record<string, unknown>>();
	const [openedActiveOnlyModal, activeOnlyHandlers] = useDisclosure(false);
	const [openedActiveWithConfigModal, activeWithConfigHandlers] = useDisclosure(false);
	const [openedAppDetailsModal, appDetailsModalHandlers] = useDisclosure(false);
	const [selectedApp, setSelectedApp] = useState<SelectAppType | undefined>(undefined);

	const { tablePagination, setTotalRecords } = useTablePagination();

	const { appStatusMap, filterOrderMap, filterRenderItemMap, productTypeMap } = useMonoMarket();

	const getMonoMarketAppsQuery = useGetApplications(
		{ limit: tablePagination.recordsPerPage, page: tablePagination.page, ...filters },
		{
			query: {
				queryKey: [GET_MONO_MARKET_APPS_QUERY_KEY, filters],
				select: (response) => {
					const results: SelectAppType[] = response.data.results.map((app) => {
						const item: SelectAppType = {
							isAvailable: !!app.is_available,
							configurationRequired: app.configuration_requirements || "",
							businessValue: app.business_value || "",
							productType: app.type ? productTypeMap[app.type] : MonoAppProductTypeEnum.STANDARD,
							status: app.status
								? appStatusMap[app.status as Exclude<ApplicationHistoryStatus, "expired">]
								: MonoAppStatusTypeEnum.INACTIVE,
							isConfigured: !!app.configuration?.length,
							configRequired: app.is_configurable,
							label: app.display_name,
							name: app.name,
							version: app.version,
							owner: app.vendor,
							hasRequiredSupportLicense: !!app.support_license,
							supportLicenseExpireDate: app.support_license_expiration_time || "",
							description: app.description || "",
							keyCapabilities: app.key_capabilities || "",
							id: app.id,
						};

						return item;
					});

					return {
						...response,
						data: {
							...response.data,
							results,
						},
					};
				},
			},
		},
	);

	const activateAppQuery = useActivateMonoApplication(selectedApp?.id || "", {
		query: {
			enabled: false,
			queryKey: [GET_MONO_MARKET_ACTIVATE_QUERY_KEY, selectedApp?.id],
		},
	});

	const stableFilters = useStableData<EachMetadataFilterItems[]>(
		getMonoMarketAppsQuery.data?.data.metadata.filters,
	);

	const dynamicFilters =
		stableFilters?.map(
			(filter) =>
				({
					items: filter.items.map((item) => ({
						...item,
						renderLabel: filterRenderItemMap[filter.param],
					})),
					label: filter.label,
					name: filter.param,
					type: filter.type === "multiselect" ? "CheckedList" : "Switch",
					order: filterOrderMap[filter.param],
				}) satisfies BCSideFilterItem,
		) || [];

	const onActiveOnly = (app: SelectAppType) => {
		setSelectedApp(app);
		activeOnlyHandlers.open();
	};
	const onActiveWithConfig = (app: SelectAppType) => {
		setSelectedApp(app);
		activeWithConfigHandlers.open();
	};

	const onShowMore = (app: SelectAppType) => {
		setSelectedApp(app);
		appDetailsModalHandlers.open();
	};

	const onOpenApp = (appName: string) => {
		router.push(AppRoutes.appLandingPage(appName));
	};

	useEffect(() => {
		if (getMonoMarketAppsQuery.data?.data.total) {
			setTotalRecords(getMonoMarketAppsQuery.data.data.total);
		}
	}, [getMonoMarketAppsQuery.data?.data.total]);

	return (
		<Grid p="sm" pt="lg" gutter="lg" pos={"relative"}>
			{selectedApp && (
				<MonoMarketAppDetailsModal
					{...(selectedApp && { appData: selectedApp })}
					onActiveOnly={() => onActiveOnly(selectedApp)}
					onActiveWithConfig={() => onActiveWithConfig(selectedApp)}
					opened={openedAppDetailsModal}
					onClose={() => {
						appDetailsModalHandlers.close();
						setSelectedApp(undefined);
					}}
					onOpen={() => onOpenApp(selectedApp.name)}
				/>
			)}

			<MonoMarketActivationNonConfigAppModal
				opened={openedActiveOnlyModal}
				onClose={() => {
					setSelectedApp(undefined);
					activeOnlyHandlers.close();
				}}
				appName={selectedApp?.label || ""}
				loading={activateAppQuery.isFetching}
				onActivate={() => {
					activeOnlyHandlers.close();
					activateAppQuery.refetch().then(() => {
						void getMonoMarketAppsQuery.refetch();
						notifications.show({
							title: "App Activated Successfully",
							message: "You’ve activated “File Activity Monitoring” Mono App",
							color: "green",
							withBorder: true,
							icon: <IconCheck />,
							onClose: () => {
								router.refresh();
							},
						});
					});
				}}
			/>
			<MonoMarketActivationWithConfigAppModal
				version={selectedApp?.version || ""}
				opened={openedActiveWithConfigModal}
				onClose={() => {
					setSelectedApp(undefined);
					activeWithConfigHandlers.close();
				}}
				name={selectedApp?.name || ""}
				owner={selectedApp?.owner || ""}
				loading={false}
				onSaveAndActivate={() => {
					console.log("active with config app");
				}}
			/>
			<Grid.Col span={3}>
				<BCSideFilter
					height={height - 225}
					onChange={setFilters}
					filterItems={dynamicFilters}
					searchPlaceholder={"Search by adapter Name"}
				/>
			</Grid.Col>
			<Grid.Col span={9}>
				<ScrollArea h={height - 160}>
					<Grid overflow={"hidden"}>
						{getMonoMarketAppsQuery.data?.data.results.map((app) => (
							<Grid.Col key={app.name} span={{ lg: 4, "2xl": 3 }}>
								<MonoMarketCard
									{...app}
									onActiveOnly={() => onActiveOnly(app)}
									onActiveWithConfig={() => onActiveWithConfig(app)}
									onShowMore={() => onShowMore(app)}
									onOpen={() => onOpenApp(app.name)}
									isProcessing={
										activateAppQuery.isFetching || app.status === MonoAppStatusTypeEnum.INSTALLING
									}
									selectedAppId={selectedApp?.id}
								/>
							</Grid.Col>
						))}
						{getMonoMarketAppsQuery.isFetching && <MonoMarketCardSkeleton />}
					</Grid>
				</ScrollArea>
				<Flex justify={"center"} align={"center"}>
					<Pagination
						total={Math.ceil(tablePagination.totalRecords / tablePagination.recordsPerPage)}
						onChange={tablePagination.onPageChange}
					/>
				</Flex>
			</Grid.Col>
		</Grid>
	);
}
