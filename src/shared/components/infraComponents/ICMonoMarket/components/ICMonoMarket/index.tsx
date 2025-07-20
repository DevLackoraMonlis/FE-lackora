"use client";

import BCSideFilter, { type BCSideFilterItem } from "@/shared/components/baseComponents/BCSideFilter";
import MonoMarketActivationNonConfigAppModal from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/components/MonoMarketActivationNonConfigAppModal";
import MonoMarketActivationWithConfigAppModal from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/components/MonoMarketActivationWithConfigAppModal";
import MonoMarketAppDetailsModal from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/components/MonoMarketAppDetailsModal";
import MonoMarketCard from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/components/MonoMarketCard";
import {
	MonoAppProductTypeEnum,
	MonoAppStatusTypeEnum,
} from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.enum";
import type { MonoMarketCardProps } from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.types";
import { useStableData } from "@/shared/hooks/useStableData";
import { Flex, Grid, Pagination, ScrollArea } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { useState } from "react";

type SelectAppType = Omit<
	MonoMarketCardProps,
	"onActiveOnly" | "onActiveWithConfig" | "onShowMore" | "isProcessing"
>;

export default function ICMonoMarket() {
	const { height } = useViewportSize();
	const [_filters, setFilters] = useState<Record<string, unknown>>();
	const [openedActiveOnlyModal, activeOnlyHandlers] = useDisclosure(false);
	const [openedActiveWithConfigModal, activeWithConfigHandlers] = useDisclosure(false);
	const [openedAppDetailsModal, appDetailsModalHandlers] = useDisclosure(false);
	const [selectedApp, setSelectedApp] = useState<SelectAppType | undefined>(undefined);

	const stableFilters = useStableData<Record<string, unknown>[]>([]);
	const dynamicFilters = (stableFilters?.map((filter) => ({
		items: filter.items,
		label: filter.label,
		name: filter.param,
		type: "CheckedList",
	})) || []) as BCSideFilterItem[];

	const apps: SelectAppType[] = [
		{
			isConfigured: false,
			description: "provides secure, encrypted remote access to Cisco",
			hasConfig: false,
			hasRequiredSupportLicense: true,
			status: MonoAppStatusTypeEnum.ACTIVATED,
			label: "Asset Identification",
			name: "asset_identification2",
			owner: "MonoSuite",
			productType: MonoAppProductTypeEnum.PROFESSIONAL,
			supportLicenseExpireDate: "2026-10-10",
			version: "1.0.0",
			businessValue: ["tst", "stats"],
			configurationRequired: ["tst", "stats"],
			keyCapabilities: ["tst", "stats"],
		},
		{
			isConfigured: false,
			description: "provides secure, encrypted remote access to Cisco",
			hasConfig: true,
			hasRequiredSupportLicense: true,
			status: MonoAppStatusTypeEnum.ACTIVATED,
			label: "Asset Identification",
			name: "asset_identification",
			owner: "MonoSuite",
			productType: MonoAppProductTypeEnum.PROFESSIONAL,
			supportLicenseExpireDate: "2026-10-10",
			version: "1.0.0",
			businessValue: ["tst", "stats"],
			configurationRequired: ["tst", "stats"],
			keyCapabilities: ["tst", "stats"],
		},
		{
			isConfigured: true,
			description: "provides secure, encrypted remote access to Cisco",
			hasConfig: true,
			hasRequiredSupportLicense: false,
			status: MonoAppStatusTypeEnum.ACTIVATED,
			label: "Adapters2",
			name: "adapter_management4",
			owner: "MonoSuite",
			productType: MonoAppProductTypeEnum.STANDARD,
			supportLicenseExpireDate: "2026-10-10",
			version: "1.1.1",
			businessValue: ["tst", "stats"],
			configurationRequired: ["tst", "stats"],
			keyCapabilities: ["tst", "stats"],
		},
		{
			isConfigured: false,
			description: "provides secure, encrypted remote access to Cisco",
			hasConfig: true,
			hasRequiredSupportLicense: true,
			status: MonoAppStatusTypeEnum.INACTIVE,
			label: "File Activity Monitoring",
			name: "adapter_management3",
			owner: "MonoSuite",
			productType: MonoAppProductTypeEnum.PROFESSIONAL,
			supportLicenseExpireDate: "2024-10-10",
			version: "1.1.1",
			businessValue: ["tst", "stats"],
			configurationRequired: ["tst", "stats"],
			keyCapabilities: ["tst", "stats"],
		},
		{
			isConfigured: false,
			description: "provides secure, encrypted remote access to Cisco",
			hasConfig: true,
			hasRequiredSupportLicense: true,
			status: MonoAppStatusTypeEnum.INACTIVE,
			label: "Anomaly Detection Engine",
			name: "adapter_management2",
			owner: "Elastic",
			productType: MonoAppProductTypeEnum.PROFESSIONAL,
			supportLicenseExpireDate: "2024-10-10",
			version: "1.1.1",
			businessValue: ["tst", "stats"],
			configurationRequired: ["tst", "stats"],
			keyCapabilities: ["tst", "stats"],
		},
		{
			isConfigured: true,
			description: "provides secure, encrypted remote access to Cisco",
			hasConfig: true,
			hasRequiredSupportLicense: true,
			status: MonoAppStatusTypeEnum.EXPIRED,
			label: "Alert Enrichment Service",
			name: "adapter_management",
			owner: "Splunk",
			productType: MonoAppProductTypeEnum.ENTERPRISE,
			supportLicenseExpireDate: "2024-10-10",
			version: "1.1.1",
			businessValue: ["tst", "stats"],
			configurationRequired: ["tst", "stats"],
			keyCapabilities: ["tst", "stats"],
		},
	];

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
				/>
			)}

			<MonoMarketActivationNonConfigAppModal
				opened={openedActiveOnlyModal}
				onClose={() => {
					setSelectedApp(undefined);
					activeOnlyHandlers.close();
				}}
				appName={selectedApp?.name || ""}
				loading={false}
				onActivate={() => {
					console.log("active app");
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
					filterItems={[
						...dynamicFilters,
						{ name: "support_required", type: "Switch", label: "MonoSupport Required", order: 2 },
					]}
					searchPlaceholder={"Search by adapter Name"}
				/>
			</Grid.Col>
			<Grid.Col span={9}>
				<ScrollArea h={height - 160}>
					<Grid overflow={"hidden"}>
						{apps.map((app) => (
							<Grid.Col key={app.name} span={{ lg: 4, "2xl": 3 }}>
								<MonoMarketCard
									{...app}
									onActiveOnly={() => onActiveOnly(app)}
									onActiveWithConfig={() => onActiveWithConfig(app)}
									onShowMore={() => onShowMore(app)}
								/>
							</Grid.Col>
						))}
					</Grid>
				</ScrollArea>
				<Flex justify={"center"} align={"center"}>
					<Pagination total={100} />
				</Flex>
			</Grid.Col>
		</Grid>
	);
}
