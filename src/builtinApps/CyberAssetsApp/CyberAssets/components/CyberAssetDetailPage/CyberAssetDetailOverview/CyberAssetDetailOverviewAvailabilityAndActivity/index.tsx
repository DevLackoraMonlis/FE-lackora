import type {
	CyberAssetDetailOverviewAvailabilityAndActivityTimelineType,
	CyberAssetDetailOverviewProps,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { Flex, ScrollArea, SegmentedControl, Text, Timeline } from "@mantine/core";
import { IconCircleFilled } from "@tabler/icons-react";
import { type ReactElement, useState } from "react";

type Props = {
	availabilityAndActivity: CyberAssetDetailOverviewProps["availabilityAndActivity"];
};

type SelectPanelType = "Availability Timeline" | "Activity Timeline";

export default function CyberAssetDetailOverviewAvailabilityAndActivity(props: Props) {
	const [panel, setPanel] = useState<SelectPanelType>("Availability Timeline");

	const availabilityColorMap: Record<CyberAssetDetailOverviewAvailabilityAndActivityTimelineType, string> = {
		Offline: "#FA5252",
		Online: "#12B886",
		Unmanaged: "#868E96",
	};

	const selectedPanel: Record<SelectPanelType, ReactElement> = {
		"Availability Timeline": (
			<Timeline bulletSize={20} lineWidth={2}>
				{props.availabilityAndActivity.timeline.map((item) => (
					<Timeline.Item
						key={`${item.description}-${item.type}`}
						bullet={<IconCircleFilled color={availabilityColorMap[item.type]} />}
						title={
							<Text fz={"sm"} fw={"bold"}>
								{item.description}
							</Text>
						}
					>
						<Text fz={"xs"}>{item.description}</Text>
					</Timeline.Item>
				))}
			</Timeline>
		),
		"Activity Timeline": (
			<Timeline bulletSize={20} lineWidth={2}>
				{props.availabilityAndActivity.activity.map((item) => (
					<Timeline.Item
						key={item.title}
						bullet={<IconCircleFilled color={"blue"} />}
						title={<Text fz={"sm"} fw={"bold"}>{`${item.title} - ${item.time}`}</Text>}
					>
						<Text fz={"xs"}>{item.description}</Text>
					</Timeline.Item>
				))}
			</Timeline>
		),
	};
	return (
		<Flex mah={600} h={600} direction={"column"} gap={"2xs"} w={"100%"} p={"sm"}>
			<SegmentedControl
				size={"xs"}
				value={panel}
				onChange={(value) => setPanel(value as SelectPanelType)}
				data={[
					{ label: "Availability Timeline", value: "Availability Timeline" },
					{ label: "Activity Timeline", value: "Activity Timeline" },
				]}
			/>
			<ScrollArea py={"2xs"} h={600} scrollbars={"y"} scrollbarSize={2}>
				{selectedPanel[panel]}
			</ScrollArea>
		</Flex>
	);
}
