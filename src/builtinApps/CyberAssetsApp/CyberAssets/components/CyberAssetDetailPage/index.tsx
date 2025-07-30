"use client";

import CyberAssetDetailGeneralInfo from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailGeneralInfo";
import {
	CyberAssetClassification,
	CyberAssetDiscoveryType,
	CyberAssetOsType,
	CyberAssetState,
	CyberAssetStatus,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.enum";
import { useGetCyberAssetDetailGeneralInfo } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.hooks";
import type { ICMonoAppPagesDefaultProps } from "@/shared/components/infraComponents/ICMonoMarket/index.types";
import { AppRoutes } from "@/shared/constants/routes";
import { Button, Flex, Grid } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

type Props = ICMonoAppPagesDefaultProps;

export default function CyberAssetDetailPage(props: Props) {
	const { generalInfo } = useGetCyberAssetDetailGeneralInfo({
		data: {
			currentState: CyberAssetState.MANAGEABLE,
			currentStatus: CyberAssetStatus.PROFILED,
			discoveryType: CyberAssetDiscoveryType.DISCOVERED,
			gateway: "192.168.10.1",
			ipAddress: "192.168.10.1",
			lastLogonUser: "Mahya.sh",
			userGroup: "Product",
			lastRebootTime: "2025-03-12, 18:30",
			lastScanId: "#4300",
			lastSeen: "2025-03-12, 18:30",
			latitude: "35.5501° N",
			longitude: "35.5501° N",
			location: "Tehran Milad DC - Rack 3U",
			macAddress: "00-14-22-01-23-45",
			osFamily: "Windows Server 2019 Standard",
			osType: CyberAssetOsType.LINUX,
			osVersion: "10.0.17763",
			owner: "Saman.ha",
			vLan: "Production-VLAN (ID: 20)",
			classification: CyberAssetClassification.SERVER,
		},
	});
	return (
		<Flex direction={"column"}>
			<Flex bg={"gray.2"} p={"2xs"}>
				<Button
					size={"xs"}
					variant={"transparent"}
					leftSection={<IconArrowLeft size={12} />}
					component={Link}
					href={
						props.appName && props.moduleName ? AppRoutes.appModulePage(props.appName, props.moduleName) : "#"
					}
				>
					Back To assets
				</Button>
			</Flex>
			<Grid gutter={0}>
				<Grid.Col span={3}>
					<CyberAssetDetailGeneralInfo {...generalInfo} />
				</Grid.Col>
				<Grid.Col span={9}>Right</Grid.Col>
			</Grid>
		</Flex>
	);
}
