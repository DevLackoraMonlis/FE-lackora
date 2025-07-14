import {
	getMonoAppIcon,
	getMonoMarketAppProductionButton,
} from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.helper";
import type { MonoMarketCardProps } from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.types";
import { Badge, Box, Button, Card, Flex, Text, Tooltip } from "@mantine/core";
import { IconArrowNarrowRight, IconAward, IconInfoCircle, IconLock } from "@tabler/icons-react";

export default function MonoMarketCard(props: MonoMarketCardProps) {
	const generateBottomButton = () => {
		if (props.status === "EXPIRED" && props.productType === "STANDARD") {
			return (
				<Button size={"xs"} color={"red"}>
					Renew license
				</Button>
			);
		}

		if (props.status === "INACTIVE" && props.productType !== "STANDARD") {
			return (
				<Tooltip label={"Upgrade your license to activate this app"}>
					<Button disabled size={"xs"} rightSection={<IconLock color={"black"} size={16} />}>
						Unavailable
					</Button>
				</Tooltip>
			);
		}

		if (props.status === "ACTIVATED" && props.productType !== "STANDARD") {
			if (props.isConfigured) {
				return (
					<Button variant={"outline"} size={"xs"}>
						Open
					</Button>
				);
			}
			return (
				<Button size={"xs"} rightSection={<IconArrowNarrowRight />}>
					{props.hasConfig ? "Configure & Active" : "Active App"}
				</Button>
			);
		}

		if (props.status === "ACTIVATED") {
			return (
				<Button variant={"outline"} size={"xs"}>
					Open
				</Button>
			);
		}

		return (
			<Button size={"xs"} color={"red"}>
				Renew license
			</Button>
		);
	};

	const getSupportLicenseTooltipLabel = () => {
		if (props.status === "ACTIVATED") {
			return (
				<Flex direction={"column"}>
					<Text fz={"xs"}>This app is available until</Text>
					<Text fz={"xs"}>your support license</Text>
					<Text fz={"xs"}>expires on:</Text>
					<Text fz={"xs"}>{props.supportLicenseExpireDate}</Text>
				</Flex>
			);
		}
		return (
			<Flex direction={"column"}>
				<Text fz={"xs"}>Support license expired on:</Text>
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
							{getMonoMarketAppProductionButton({ size: "small", type: props.productType })}
						</Tooltip>
					</Flex>
					{props.hasRequiredSupportLicense && (
						<Flex pos={"absolute"} right={"0"} top={25}>
							<Tooltip
								position={"top"}
								label={
									<Flex gap={"2xs"}>
										<Text fz={"xs"}>Requires</Text>
										<Text fz={"xs"} fw={"bold"}>
											Active Support License
										</Text>
									</Flex>
								}
							>
								<Button
									c={"#15AABF"}
									variant={"light"}
									leftSection={<IconAward size={14} color={"#15AABF"} />}
									size={"compact-xs"}
								>
									SUP
								</Button>
							</Tooltip>
						</Flex>
					)}

					<Flex gap={"xs"} align={"center"}>
						{getMonoAppIcon({ size: 30, name: props.owner })}
						<Text>{props.owner}</Text>
					</Flex>
				</Flex>
				<Flex gap={"2xs"} mt={"xs"} direction={"column"}>
					<Text fw={"bold"}>{props.label}</Text>
					<Text fz={"xs"}>{`version ${props.version} | by ${props.owner}`}</Text>
					<Text mt={"2xs"} fz={"xs"} c={"gray.6"} maw={"90%"} truncate={"end"}>
						{props.description}
					</Text>
					<Button
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
				<Flex p={"sm"} align={"center"} justify={"space-between"} h={52}>
					<Flex gap={"2xs"} align={"center"}>
						<Box>
							{props.status === "ACTIVATED" ? (
								<Badge size={"lg"} radius={"xs"} variant={"light"} color={"#12B886"}>
									{props.status}
								</Badge>
							) : (
								<Box />
							)}
							{props.status === "EXPIRED" ? (
								<Badge size={"lg"} radius={"xs"} variant={"light"} color={"#FA5252"}>
									{props.status}
								</Badge>
							) : (
								<Box />
							)}
						</Box>
						{props.hasRequiredSupportLicense && props.status !== "INACTIVE" && (
							<Tooltip label={getSupportLicenseTooltipLabel()}>
								<Box mt={"xs"}>
									<IconInfoCircle size={18} />
								</Box>
							</Tooltip>
						)}
					</Flex>
					{generateBottomButton()}
				</Flex>
			</Card.Section>
		</Card>
	);
}
