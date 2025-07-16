import type { AssetIdentificationAppConfigProps } from "@/builtinApps/AssetIdentificationApp/AssetIdentificationAppConfig";
import BCModal from "@/shared/components/baseComponents/BCModal";
import { getMonoAppIcon } from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.helper";
import type { MonoMarketCardProps } from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.types";
import ICMonoMarketContext from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarketProvider/ICMonoMarketContext";
import { Box, Button, Flex, Text } from "@mantine/core";
import { type FC, useContext } from "react";

type Props = {
	opened: boolean;
	onClose: VoidFunction;
	loading: boolean;
	onSaveAndActivate: VoidFunction;
} & Pick<MonoMarketCardProps, "owner" | "version" | "name">;

export default function MonoMarketActivationWithConfigAppModal(props: Props) {
	const { apps } = useContext(ICMonoMarketContext);

	let AppConfig: FC<AssetIdentificationAppConfigProps> | null = null;

	const app = apps.find((app) => app.name === props.name);

	if (app?.config) {
		AppConfig = app.config as FC<AssetIdentificationAppConfigProps>;
	}

	return (
		<BCModal size={500} title={"Setup & Activate App"} opened={props.opened} onClose={props.onClose}>
			<Box bg={"gray.1"}>
				<Flex gap={"xs"} align={"center"} p={"md"} mb={"sm"}>
					<Flex bg={"white"} justify={"center"} align={"center"} w={52} h={52}>
						{getMonoAppIcon({ size: 33, name: props.owner })}
					</Flex>
					<Flex direction={"column"}>
						<Text fw={"bold"}>{props.owner}</Text>
						<Text fz={"xs"} c={"gray.6"}>{`version ${props.version} | by ${props.owner}`}</Text>
					</Flex>
				</Flex>

				<Text fz={"sm"} fw={"bold"} px={"md"}>
					Configuration:
				</Text>
				{AppConfig ? (
					<Box px={"xl"} h={260}>
						<AppConfig
							onChange={(values) => {
								console.log(values);
							}}
						/>
					</Box>
				) : null}
			</Box>

			<BCModal.EmptyFooter>
				<Flex
					gap={"sm"}
					bg={"white"}
					className={"h-full w-full"}
					px={"sm"}
					align={"center"}
					justify={"flex-end"}
				>
					<Button loading={props.loading} onClick={props.onSaveAndActivate}>
						Save & Activate
					</Button>
					<Button variant={"default"} loading={props.loading} onClick={props.onClose}>
						Cancel
					</Button>
				</Flex>
			</BCModal.EmptyFooter>
		</BCModal>
	);
}
