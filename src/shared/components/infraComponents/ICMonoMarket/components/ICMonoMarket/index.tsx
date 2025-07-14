"use client";
import type { EachConnectionFilterItems } from "@/http/generated/models";
import BCSideFilter, { type BCSideFilterItem } from "@/shared/components/baseComponents/BCSideFilter";
import MonoMarketCard from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/components/MonoMarketCard";
import {
	MonoAppProductTypeEnum,
	MonoAppStatusTypeEnum,
} from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.enum";
import type { MonoMarketCardProps } from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.types";
import { useStableData } from "@/shared/hooks/useStableData";
import { Grid, ScrollArea } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useState } from "react";

export default function ICMonoMarket() {
	const { height } = useViewportSize();
	const [_filters, setFilters] = useState<Record<string, unknown>>();

	const stableFilters = useStableData<EachConnectionFilterItems[]>([]);
	const dynamicFilters = stableFilters?.map(
		(filter) =>
			({
				items: filter.items,
				label: filter.label,
				name: filter.param,
				type: "CheckedList",
			}) satisfies BCSideFilterItem,
	);

	const apps: MonoMarketCardProps[] = [
		{
			description: "provides secure, encrypted remote access to Cisco",
			hasConfig: false,
			hasRequiredSupportLicense: true,
			status: MonoAppStatusTypeEnum.ACTIVATED,
			label: "Asset Identification",
			name: "asset_identification",
			owner: "MonoSuite",
			productType: MonoAppProductTypeEnum.PROFESSIONAL,
			supportLicenseExpireDate: "2026-10-10",
			version: "1.0.0",
		},
		{
			description: "provides secure, encrypted remote access to Cisco",
			hasConfig: false,
			hasRequiredSupportLicense: false,
			status: MonoAppStatusTypeEnum.ACTIVATED,
			label: "Adapters",
			name: "adapter_management",
			owner: "MonoSuite",
			productType: MonoAppProductTypeEnum.STANDARD,
			supportLicenseExpireDate: "2026-10-10",
			version: "1.1.1",
		},
		{
			description: "provides secure, encrypted remote access to Cisco",
			hasConfig: false,
			hasRequiredSupportLicense: true,
			status: MonoAppStatusTypeEnum.INACTIVE,
			label: "File Activity Monitoring",
			name: "adapter_management",
			owner: "MonoSuite",
			productType: MonoAppProductTypeEnum.PROFESSIONAL,
			supportLicenseExpireDate: "2024-10-10",
			version: "1.1.1",
		},
		{
			description: "provides secure, encrypted remote access to Cisco",
			hasConfig: true,
			hasRequiredSupportLicense: true,
			status: MonoAppStatusTypeEnum.INACTIVE,
			label: "Anomaly Detection Engine",
			name: "adapter_management",
			owner: "Elastic",
			productType: MonoAppProductTypeEnum.PROFESSIONAL,
			supportLicenseExpireDate: "2024-10-10",
			version: "1.1.1",
		},
		{
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
		},
	];

	return (
		<Grid p="sm" pt="lg" gutter="lg" pos={"relative"}>
			<Grid.Col span={3}>
				<BCSideFilter
					height={height - 220}
					onChange={setFilters}
					filterItems={dynamicFilters || []}
					searchPlaceholder={"Search by adapter Name"}
				/>
			</Grid.Col>
			<Grid.Col span={9}>
				<ScrollArea h={height - 100}>
					<Grid>
						{apps.map((app) => (
							<Grid.Col key={app.name} span={{ lg: 4, "2xl": 3 }}>
								<MonoMarketCard {...app} />
							</Grid.Col>
						))}
					</Grid>
				</ScrollArea>
			</Grid.Col>
		</Grid>
	);
}
