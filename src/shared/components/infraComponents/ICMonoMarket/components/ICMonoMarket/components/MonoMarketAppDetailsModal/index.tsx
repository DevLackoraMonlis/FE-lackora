import BCModal from "@/shared/components/baseComponents/BCModal";
import {
	MonoAppProductTypeEnum,
	MonoAppStatusTypeEnum,
} from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.enum";
import {
	getMonoAppIcon,
	getMonoMarketActivateConfigButton,
	getMonoMarketAppMonoCareLicenseButton,
	getMonoMarketAppProductButton,
} from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.helper";
import type { MonoMarketCardProps } from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.types";
import type { ModalDefaultProps } from "@/shared/types/index.types";
import { Alert, Badge, Box, Flex, Text } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import * as changeCase from "change-case";
import { FcPuzzle, FcSearch } from "react-icons/fc";
import { GiBullseye } from "react-icons/gi";
import { PiGearFineDuotone } from "react-icons/pi";
import Markdown from "react-markdown";

type Props = ModalDefaultProps & {
	appData: Omit<
		MonoMarketCardProps,
		"onShowMore" | "onActiveOnly" | "onActiveWithConfig" | "onOpen" | "isProcessing"
	>;
} & Pick<MonoMarketCardProps, "onActiveWithConfig" | "onActiveOnly" | "onOpen">;

export default function MonoMarketAppDetailsModal(props: Props) {
	const getSupportLicenseBadge = () => {
		if (props.appData.hasRequiredSupportLicense) {
			if (props.appData.status === MonoAppStatusTypeEnum.ACTIVATED) {
				return (
					<Badge fz={"2xs"} radius={"xs"} variant={"light"} color={"green"} size={"lg"}>
						{`ACTIVATED - VALID UNTIL ${props.appData.supportLicenseExpireDate}`}
					</Badge>
				);
			}
			if (props.appData.status === MonoAppStatusTypeEnum.EXPIRED) {
				return (
					<Badge fz={"2xs"} radius={"xs"} variant={"light"} color={"red"} size={"lg"}>
						{`SUPPORT LICENSE EXPIRED ON ${props.appData.supportLicenseExpireDate}`}
					</Badge>
				);
			}
		}
		return null;
	};

	const getLicenseRequiredAlert = () => {
		if (props.appData.hasRequiredSupportLicense && props.appData.status === MonoAppStatusTypeEnum.EXPIRED)
			return (
				<Alert mb={"xs"} title={"[Support]License Expired:"} icon={<IconAlertTriangle />} color={"red"}>
					Your license for this App has expired. Please renew to activate.
				</Alert>
			);

		if (
			props.appData.productType !== MonoAppProductTypeEnum.STANDARD &&
			props.appData.status === MonoAppStatusTypeEnum.INACTIVE
		)
			return (
				<Alert
					mb={"xs"}
					title={`[${changeCase.pascalCase(props.appData.productType)} Security] License Required!`}
					icon={<IconAlertTriangle />}
					color={"yellow"}
				>
					{`This App requires a [${changeCase.pascalCase(props.appData.productType)} Security] license. Please upgrade your license to use this feature`}
				</Alert>
			);

		return null;
	};

	return (
		<BCModal size={650} title={"Mono App Details"} opened={props.opened} onClose={props.onClose}>
			<Box bg={"white"} p={"sm"}>
				<Box bg={"gray.1"} p={"md"}>
					<Flex gap={"xs"} mb={"sm"}>
						<Flex bg={"white"} justify={"center"} align={"center"} w={112} h={112}>
							{getMonoAppIcon({ size: 73, name: props.appData.owner })}
						</Flex>
						<Flex direction={"column"}>
							<Flex justify={"space-between"}>
								<Text fz={"lg"} fw={"bold"}>
									{props.appData.label}
								</Text>
								{getMonoMarketActivateConfigButton({
									hasConfig: props.appData.hasConfig,
									isConfigured: props.appData.isConfigured,
									onActiveOnly: () => {
										props.onActiveOnly();
										props.onClose();
									},
									onActiveWithConfig: () => {
										props.onActiveWithConfig();
										props.onClose();
									},
									productType: props.appData.productType,
									status: props.appData.status,
									showConfigButton: props.appData.hasConfig,
									onOpen: props.onOpen,
									onConfig: () => {
										props.onActiveWithConfig();
										props.onClose();
									},
								})}
							</Flex>
							<Text
								fz={"xs"}
								c={"gray.8"}
							>{`version ${props.appData.version} | by ${props.appData.owner}`}</Text>
							<Flex gap={"2xs"}>
								{getMonoMarketAppProductButton({ type: props.appData.productType, size: "xLarge" })}
								{getMonoMarketAppMonoCareLicenseButton({ size: "large" })}
							</Flex>
							<Box mt={"2xs"}>{getSupportLicenseBadge()}</Box>
						</Flex>
					</Flex>

					{getLicenseRequiredAlert()}

					<Flex direction={"column"} gap={"xs"}>
						<Flex align={"center"}>
							<FcPuzzle size={16} />
							<Text fw={"bold"}>Description:</Text>
						</Flex>
						<Box bg={"white"} p={"xs"}>
							{props.appData.description}
						</Box>
						<Flex align={"center"} mt={"xs"}>
							<FcSearch size={16} />
							<Text fw={"bold"}>Key Capabilities:</Text>
						</Flex>
						<Box bg={"white"} p={"xs"}>
							<Markdown>{props.appData.keyCapabilities}</Markdown>
						</Box>
						<Flex align={"center"} mt={"xs"}>
							<GiBullseye color={"red"} size={16} />
							<Text fw={"bold"}>Business Value:</Text>
						</Flex>
						<Box bg={"white"} p={"xs"}>
							<Markdown>{props.appData.businessValue}</Markdown>
						</Box>
						{props.appData.hasConfig && (
							<>
								<Flex align={"center"} mt={"xs"}>
									<PiGearFineDuotone size={16} />
									<Text fw={"bold"}>Configuration Required:</Text>
								</Flex>
								<Box bg={"white"} p={"xs"}>
									<Markdown>{props.appData.configurationRequired}</Markdown>
								</Box>
							</>
						)}
					</Flex>
				</Box>
			</Box>
		</BCModal>
	);
}
