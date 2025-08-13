import InventoryAppSideCardItem from "@/builtinApps/InventoryApp/components/InventoryAppSideCardItem";
import type { InventoryAppPageWrapperProps } from "@/builtinApps/InventoryApp/index.types";
import { Flex, Grid, ScrollArea, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

export default function InventoryAppPageWrapper(props: InventoryAppPageWrapperProps) {
	const { height } = useViewportSize();
	return (
		<Grid gutter={0} h={"100%"} classNames={{ inner: "h-full" }}>
			<Grid.Col span={3}>
				<ScrollArea scrollbarSize={2} scrollbars={"y"} bg={"gray.2"} h={height - 50}>
					<Flex direction={"column"} h="100%" gap={"xs"} px={"lg"} py={"sm"}>
						<Flex pl={"xs"} align={"center"} bg={"gray.2"} h={48}>
							<Text fz={"lg"} fw={"bolder"}>
								{props.title}
							</Text>
						</Flex>
						{props.sideItems.map((item) => (
							<InventoryAppSideCardItem
								key={item.name}
								isSelected={props.selectedInventoryType === item.name}
								isLoading={props.isLoading}
								{...item}
							/>
						))}
					</Flex>
				</ScrollArea>
			</Grid.Col>
			<Grid.Col span={9} key={props.selectedInventoryType}>
				{props.page}
			</Grid.Col>
		</Grid>
	);
}
