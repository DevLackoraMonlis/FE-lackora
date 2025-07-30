"use client";

import CyberAssetDetailGeneralInfo from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailGeneralInfo";
import { useGetCyberAssetDetailGeneralInfo } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.hooks";
import type { ICMonoAppPagesDefaultProps } from "@/shared/components/infraComponents/ICMonoMarket/index.types";
import { AppRoutes } from "@/shared/constants/routes";
import { Button, Flex, Grid } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

type Props = ICMonoAppPagesDefaultProps;

export default function CyberAssetDetailPage(props: Props) {
	const { generalInfo } = useGetCyberAssetDetailGeneralInfo();
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
