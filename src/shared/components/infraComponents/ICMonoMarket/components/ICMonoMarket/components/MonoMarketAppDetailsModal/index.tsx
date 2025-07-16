import BCModal from "@/shared/components/baseComponents/BCModal";
import {
	getMonoAppIcon,
	getMonoMarketActivateConfigButton,
	getMonoMarketAppMonoCareLicenseButton,
	getMonoMarketAppProductionButton,
} from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.helper";
import type { MonoMarketCardProps } from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.types";
import type { ModalDefaultProps } from "@/shared/types/index.types";
import { Box, Flex, List, Text } from "@mantine/core";
import { FcPuzzle, FcSearch } from "react-icons/fc";
import { GiBullseye } from "react-icons/gi";
import { PiGearFineDuotone } from "react-icons/pi";

type Props = ModalDefaultProps & {
	appData: Omit<MonoMarketCardProps, "onShowMore" | "onActiveOnly" | "onActiveWithConfig">;
} & Pick<MonoMarketCardProps, "onActiveWithConfig" | "onActiveOnly">;

export default function MonoMarketAppDetailsModal(props: Props) {
	return (
		<BCModal size={700} title={"Mono App Details"} opened={props.opened} onClose={props.onClose}>
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
									onActiveOnly: props.onActiveOnly,
									onActiveWithConfig: props.onActiveWithConfig,
									productType: props.appData.productType,
									status: props.appData.status,
								})}
							</Flex>
							<Text
								fz={"xs"}
								c={"gray.8"}
							>{`version ${props.appData.version} | by ${props.appData.owner}`}</Text>
							<Flex gap={"xs"}>
								{getMonoMarketAppProductionButton({ type: props.appData.productType, size: "xLarge" })}
								{getMonoMarketAppMonoCareLicenseButton({ size: "large" })}
							</Flex>
						</Flex>
					</Flex>

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
							<List>
								{props.appData.keyCapabilities.map((item) => (
									<List.Item key={item}>{item}</List.Item>
								))}
							</List>
						</Box>
						<Flex align={"center"} mt={"xs"}>
							<GiBullseye color={"red"} size={16} />
							<Text fw={"bold"}>Business Value:</Text>
						</Flex>
						<Box bg={"white"} p={"xs"}>
							<List>
								{props.appData.businessValue.map((item) => (
									<List.Item key={item}>{item}</List.Item>
								))}
							</List>
						</Box>
						{props.appData.hasConfig && (
							<>
								<Flex align={"center"} mt={"xs"}>
									<PiGearFineDuotone size={16} />
									<Text fw={"bold"}>Configuration Required:</Text>
								</Flex>
								<Box bg={"white"} p={"xs"}>
									<List>
										{props.appData.configurationRequired.map((item) => (
											<List.Item key={item}>{item}</List.Item>
										))}
									</List>
								</Box>
							</>
						)}
					</Flex>
				</Box>
			</Box>
		</BCModal>
	);
}
