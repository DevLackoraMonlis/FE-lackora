import { getCyberAssetNotificationIcon } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.helper";
import type { CyberAssetDetailOverviewProps } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { Flex, ScrollArea, Text } from "@mantine/core";

type Props = {
	notifications: CyberAssetDetailOverviewProps["notifications"];
	height: number;
};

export default function CyberAssetDetailOverviewNotifications(props: Props) {
	return (
		<Flex direction={"column"} gap={"2xs"} w={"100%"} p={"sm"}>
			<ScrollArea h={props.height - 805} scrollbars={"y"} scrollbarSize={2}>
				{props.notifications.map((notification) => (
					<Flex p={"xs"} gap={"xs"} key={`${notification.title}-${notification.type}`} align={"flex-start"}>
						<Flex bg={"gray.1"} p={"2xs"} justify={"center"} align={"center"}>
							{getCyberAssetNotificationIcon({ type: notification.type })}
						</Flex>
						<Flex direction={"column"}>
							<Text fw={"bold"}>{notification.title}</Text>
							<Text fz={"sm"}>{notification.description}</Text>
							<Text fz={"xs"} c={"gray.6"}>
								{`${notification.date} | source by ${notification.source}`}
							</Text>
						</Flex>
					</Flex>
				))}
			</ScrollArea>
		</Flex>
	);
}
