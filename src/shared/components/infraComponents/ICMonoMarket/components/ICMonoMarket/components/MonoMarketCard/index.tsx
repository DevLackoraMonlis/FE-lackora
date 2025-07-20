import { MonoAppStatusTypeEnum } from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.enum";
import {
	getMonoAppIcon,
	getMonoMarketActivateConfigButton,
	getMonoMarketAppActivationStatusBadge,
	getMonoMarketAppMonoCareLicenseButton,
	getMonoMarketAppProductButton,
} from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.helper";
import type { MonoMarketCardProps } from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.types";
import { Box, Button, Card, Flex, Loader, Text, Tooltip } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export default function MonoMarketCard(props: MonoMarketCardProps) {
	const getSupportLicenseTooltipLabel = () => {
		if (props.status === "ACTIVATED") {
			return (
				<Flex direction={"column"}>
					<Text fz={"xs"}>This app is available until</Text>
					<Text fz={"xs"}>your Mono Care</Text>
					<Text fz={"xs"}>expires on:</Text>
					<Text fz={"xs"}>{props.supportLicenseExpireDate}</Text>
				</Flex>
			);
		}
		return (
			<Flex direction={"column"}>
				<Text fz={"xs"}>Mono Care expired on:</Text>
				<Text fz={"xs"}>{props.supportLicenseExpireDate}</Text>
				<Text fz={"xs"}>Renew to access this app</Text>
			</Flex>
		);
	};

	return (
		<Card withBorder shadow={"xs"}>
			<Card.Section bg={"gray.2"} p={"sm"}>
				<Flex bg={"white"} h={80} justify={"center"} align={"center"} pos={"relative"}>
					<Flex pos={"absolute"} right={"0"} top={"0"}>
						<Tooltip
							position={"top"}
							label={
								<Flex gap={"2xs"}>
									<Text fz={"xs"}>Requires a</Text>
									<Text fz={"xs"} fw={"bold"}>
										{props.productType} Product License
									</Text>
								</Flex>
							}
						>
							{getMonoMarketAppProductButton({ size: "small", type: props.productType })}
						</Tooltip>
					</Flex>
					{props.hasRequiredSupportLicense && (
						<Flex pos={"absolute"} right={"0"} top={28}>
							<Tooltip
								position={"top"}
								label={
									<Flex gap={"2xs"}>
										<Text fz={"xs"}>Requires</Text>
										<Text fz={"xs"} fw={"bold"}>
											Active Mono Care
										</Text>
									</Flex>
								}
							>
								{getMonoMarketAppMonoCareLicenseButton({ size: "small" })}
							</Tooltip>
						</Flex>
					)}

					<Flex gap={"xs"} align={"center"}>
						{getMonoAppIcon({ size: 50, name: props.owner })}
						<Text fz={"lg"} fw={"bold"}>
							{props.owner}
						</Text>
					</Flex>
				</Flex>
				<Flex gap={"2xs"} mt={"xs"} direction={"column"}>
					<Text fw={"bold"}>{props.label}</Text>
					<Text fz={"xs"}>{`version ${props.version} | by ${props.owner}`}</Text>
					<Text mt={"2xs"} fz={"xs"} c={"gray.6"} maw={"90%"} truncate={"end"}>
						{props.description}
					</Text>
					<Button
						disabled={props.isProcessing}
						onClick={props.onShowMore}
						td={"underline"}
						h={14}
						classNames={{
							inner: "p-0 justify-start",
							label: "align-start",
						}}
						p={0}
						w={80}
						size={"xs"}
						variant={"transparent"}
					>
						Show More
					</Button>
				</Flex>
			</Card.Section>
			<Card.Section bg={"white"}>
				{props.isProcessing && props.id === props.selectedAppId ? (
					<Box p={"sm"}>
						<Button radius={"lg"} w={"100%"} variant={"light"} leftSection={<Loader color="blue" />}>
							Processing...
						</Button>
					</Box>
				) : (
					<Flex p={"sm"} align={"center"} justify={"space-between"} h={52}>
						<Flex gap={"2xs"} align={"center"}>
							<Box>
								{[
									MonoAppStatusTypeEnum.ACTIVATED,
									MonoAppStatusTypeEnum.EXPIRED,
									MonoAppStatusTypeEnum.SUPPORT_LICENSE_EXPIRED,
								].includes(props.status)
									? getMonoMarketAppActivationStatusBadge(props.status, true)
									: null}
							</Box>
							{props.hasRequiredSupportLicense && props.status !== MonoAppStatusTypeEnum.INACTIVE && (
								<Tooltip label={getSupportLicenseTooltipLabel()}>
									<Box mt={"xs"}>
										<IconInfoCircle size={18} />
									</Box>
								</Tooltip>
							)}
						</Flex>
						{getMonoMarketActivateConfigButton({
							isAvailable: props.isAvailable,
							configRequired: props.configRequired,
							isConfigured: props.isConfigured,
							onActiveOnly: props.onActiveOnly,
							onActiveWithConfig: props.onActiveWithConfig,
							productType: props.productType,
							status: props.status,
							showConfigButton: false,
							onOpen: props.onOpen,
							hasSupportLicenseSupport: props.hasRequiredSupportLicense,
						})}
					</Flex>
				)}
			</Card.Section>
		</Card>
	);
}
