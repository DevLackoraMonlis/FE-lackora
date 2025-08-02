import CyberAssetDetailOverviewSecurityGaugeChart from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewSecurity/CyberAssetDetailOverviewSecurityGuageChart";
import { CYBER_ASSET_CRITICALITY_COLOR } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.constants";
import { CyberAssetCriticalityEnum } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.enum";
import { getCyberAssetCriticalityBadge } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.helper";
import type {
	CyberAssetDetailOverviewApplicationSecurityStatus,
	CyberAssetDetailOverviewProps,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { Alert, Box, Button, Flex, ScrollArea, Text } from "@mantine/core";
import { IconAlertTriangle, IconInfoCircle, IconShieldX } from "@tabler/icons-react";
import take from "lodash/take";
import type { ReactNode } from "react";

type Props = {
	security: CyberAssetDetailOverviewProps["security"];
};

const RiskScoreChart = (props: { riskScore: number | null }) => {
	const getRiskScoreColor = () => {
		if (!props.riskScore) return "white";
		if (props.riskScore > 0 && props.riskScore <= 33) {
			return CYBER_ASSET_CRITICALITY_COLOR[CyberAssetCriticalityEnum.LOW];
		}
		if (props.riskScore > 33 && props.riskScore <= 66) {
			return CYBER_ASSET_CRITICALITY_COLOR[CyberAssetCriticalityEnum.MEDIUM];
		}
		return CYBER_ASSET_CRITICALITY_COLOR[CyberAssetCriticalityEnum.CRITICAL];
	};

	const riskValue = Number(((props.riskScore || 0) * 0.01).toFixed(1));

	return (
		<CyberAssetDetailOverviewSecurityGaugeChart
			items={[
				[0.33, CYBER_ASSET_CRITICALITY_COLOR[CyberAssetCriticalityEnum.LOW]],
				[0.66, CYBER_ASSET_CRITICALITY_COLOR[CyberAssetCriticalityEnum.MEDIUM]],
				[1, CYBER_ASSET_CRITICALITY_COLOR[CyberAssetCriticalityEnum.CRITICAL]],
			]}
			value={riskValue}
			chartId={"risk-score-chart"}
		>
			<Flex direction={"column"} align={"center"}>
				<Text fz={"xs"} c={"gray.8"}>
					Cyber Risk Score:
				</Text>
				<Flex align={"center"}>
					<Text fz={"xs"} fw={"bolder"} c={getRiskScoreColor()}>
						{props.riskScore}
					</Text>
					<Text fz={"xs"} fw={"bolder"} c={"gray.6"}>
						/100
					</Text>
				</Flex>
			</Flex>
		</CyberAssetDetailOverviewSecurityGaugeChart>
	);
};

const CriticalityChart = (props: {
	criticalityColorMap: Record<CyberAssetCriticalityEnum, number>;
	criticalityValueMap: Record<CyberAssetCriticalityEnum, number>;
	criticality: CyberAssetCriticalityEnum;
}) => {
	return (
		<CyberAssetDetailOverviewSecurityGaugeChart
			items={[
				[
					props.criticalityColorMap[CyberAssetCriticalityEnum.LOW],
					CYBER_ASSET_CRITICALITY_COLOR[CyberAssetCriticalityEnum.LOW],
				],
				[
					props.criticalityColorMap[CyberAssetCriticalityEnum.MEDIUM],
					CYBER_ASSET_CRITICALITY_COLOR[CyberAssetCriticalityEnum.MEDIUM],
				],
				[
					props.criticalityColorMap[CyberAssetCriticalityEnum.HIGH],
					CYBER_ASSET_CRITICALITY_COLOR[CyberAssetCriticalityEnum.HIGH],
				],
				[
					props.criticalityColorMap[CyberAssetCriticalityEnum.VERY_HIGH],
					CYBER_ASSET_CRITICALITY_COLOR[CyberAssetCriticalityEnum.VERY_HIGH],
				],
				[
					props.criticalityColorMap[CyberAssetCriticalityEnum.CRITICAL],
					CYBER_ASSET_CRITICALITY_COLOR[CyberAssetCriticalityEnum.CRITICAL],
				],
			]}
			value={props.criticalityValueMap[props.criticality]}
			chartId={"criticality-chart"}
		>
			<Flex direction={"column"} align={"center"}>
				<Text fz={"xs"} c={"gray.8"}>
					Critically:
				</Text>
				<Text
					tt={"capitalize"}
					fz={"xs"}
					fw={"bolder"}
					c={CYBER_ASSET_CRITICALITY_COLOR[CyberAssetCriticalityEnum.CRITICAL]}
				>
					{props.criticality}
				</Text>
			</Flex>
		</CyberAssetDetailOverviewSecurityGaugeChart>
	);
};

const CustomAlert = (props: {
	title: string;
	onClick: VoidFunction;
	color: string;
	description: string;
	buttonText: string;
	icon?: ReactNode;
}) => {
	return (
		<Alert
			p={"xs"}
			key={props.color}
			variant="light"
			color={props.color}
			title={
				<Text fw={"bolder"} fz={"xs"}>
					{props.title}
				</Text>
			}
			icon={props.icon || <IconAlertTriangle />}
		>
			<Flex direction={"column"}>
				<Text fz={"xs"}>{props.description}</Text>
				<Button w={"fit-content"} size={"xs"} mt={"lg"} onClick={props.onClick} variant={"default"}>
					{props.buttonText}
				</Button>
			</Flex>
		</Alert>
	);
};

export default function CyberAssetDetailOverviewSecurity(props: Props) {
	const criticalityColorMap: Record<CyberAssetCriticalityEnum, number> = {
		[CyberAssetCriticalityEnum.LOW]: 0.2,
		[CyberAssetCriticalityEnum.MEDIUM]: 0.4,
		[CyberAssetCriticalityEnum.HIGH]: 0.6,
		[CyberAssetCriticalityEnum.VERY_HIGH]: 0.8,
		[CyberAssetCriticalityEnum.CRITICAL]: 1,
	};

	const criticalityValueMap: Record<CyberAssetCriticalityEnum, number> = {
		[CyberAssetCriticalityEnum.LOW]: 0.1,
		[CyberAssetCriticalityEnum.MEDIUM]: 0.3,
		[CyberAssetCriticalityEnum.HIGH]: 0.5,
		[CyberAssetCriticalityEnum.VERY_HIGH]: 0.7,
		[CyberAssetCriticalityEnum.CRITICAL]: 1,
	};

	const alertMap: Record<CyberAssetDetailOverviewApplicationSecurityStatus, ReactNode> = {
		FAILED: (
			<CustomAlert
				title={`Failed to connect to ${props.security.appName}`}
				onClick={props.security.onFailed}
				color={"red"}
				description={"Please check your network or configuration settings"}
				buttonText={`Check ${props.security.appName} Configuration`}
			/>
		),
		"MC EXPIRED": (
			<CustomAlert
				title={`${props.security.appName} MonoCare license has expired!`}
				onClick={props.security.onMCExpired}
				color={"yellow"}
				description={"Displaying the latest available data. Please renew your support to receive fresh data"}
				buttonText={"Upgrade MonoCare License"}
			/>
		),
		UPGRADE: (
			<CustomAlert
				icon={<IconInfoCircle />}
				title={
					"Upgrade your system to access additional security features and more MonoApps for vulnerability assessment."
				}
				onClick={props.security.onUpgradeLicense}
				color={"blue"}
				description={""}
				buttonText={"Upgrade License"}
			/>
		),
		"DE ACTIVE": (
			<Flex bg={"white"} p={"xs"} gap={"xs"} direction={"column"} align={"center"} justify={"center"}>
				<Text ta={"center"}>
					<b>Want to see vulnerabilities and risk levels?</b> <br /> Assessment is not yet activated for{" "}
					<br /> this system. <br /> Please activate to start vulnerability assessment.
				</Text>
				<Button size={"xs"} onClick={props.security.onActivateVulnerabilitiesAssessment}>
					Active Vulnerabilities Assessment.
				</Button>
			</Flex>
		),
		ACTIVE: null,
	};

	const topAlerts: CyberAssetDetailOverviewApplicationSecurityStatus[] = ["FAILED", "MC EXPIRED"];

	return (
		<Flex h={600} mah={600} direction={"column"} bg={"gray.1"} gap={"xs"} w={"100%"}>
			<Flex gap={"xs"} w={"100%"}>
				{props.security.status !== "DE ACTIVE" ? (
					<RiskScoreChart riskScore={props.security.riskScore} />
				) : (
					<Flex gap={"xs"} direction={"column"} bg={"white"} w={"100%"} align={"center"} justify={"center"}>
						<IconShieldX size={40} color={"gray"} />
						<Text c={"gray.7"} ta={"center"}>
							Cyber Risk Score <br /> Unavailable!
						</Text>
					</Flex>
				)}
				<CriticalityChart
					criticality={props.security.criticality}
					criticalityColorMap={criticalityColorMap}
					criticalityValueMap={criticalityValueMap}
				/>
			</Flex>
			{topAlerts.includes(props.security.status) && alertMap[props.security.status]}

			{props.security.status !== "DE ACTIVE" ? (
				<Box bg={"white"} p={"xs"} w={"100%"} h={topAlerts.includes(props.security.status) ? 290 : "100%"}>
					<ScrollArea h={260} scrollbarSize={2} scrollbars={"y"}>
						<Flex gap={"xs"} align={"center"}>
							<Text fw={"bolder"} fz={"xl"}>
								{props.security.totalVulnerabilities}
							</Text>
							<Text c={"gray.6"}>total vulnerabilities</Text>
						</Flex>
						<Flex gap={"xs"} wrap={"wrap"}>
							{Object.entries(props.security.summary).map(([key, value]) =>
								getCyberAssetCriticalityBadge({ type: key as CyberAssetCriticalityEnum, value }),
							)}
						</Flex>
						<Text mt={"sm"} fw={500}>
							Top Vulnerabilities:
						</Text>
						<Flex direction={"column"} gap={"2xs"}>
							{take(props.security.topVulnerabilities, 4).map((item) => (
								<Flex p={"xs"} bg={"gray.1"} key={item.name} justify={"space-between"}>
									<Text fz={"xs"}>{item.name}</Text>
									{getCyberAssetCriticalityBadge({ type: item.criticality })}
								</Flex>
							))}
						</Flex>
					</ScrollArea>
					<Box mt={"xs"}>{props.security.status === "UPGRADE" && alertMap[props.security.status]}</Box>
				</Box>
			) : (
				alertMap["DE ACTIVE"]
			)}
		</Flex>
	);
}
