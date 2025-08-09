import InventoryAppSideCardItem from "@/builtinApps/InventoryApp/components/InventoryAppSideCardItem";
import type { InventoryAppPageWrapperProps } from "@/builtinApps/InventoryApp/index.types";
import { Flex, Grid, Text } from "@mantine/core";

export default function InventoryAppPageWrapper(props: InventoryAppPageWrapperProps) {
	return (
		<Grid gutter={0} h={"100%"} classNames={{ inner: "h-full" }}>
			<Grid.Col span={3}>
				<Flex direction={"column"} h="100%" bg={"gray.2"} gap={"xs"} p={"sm"}>
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
			</Grid.Col>
			<Grid.Col span={9}>{props.page}</Grid.Col>
		</Grid>
	);
}
