import type { DrawerProps, MantineSize } from "@mantine/core";
import { ActionIcon, Drawer, Flex, Text } from "@mantine/core";
import { IconMaximize } from "@tabler/icons-react";
import { useState } from "react";

type Props = DrawerProps & {
	withFullScreen?: boolean;
};

export default function BCDrawer({
	children,
	title,
	onClose,
	withFullScreen = true,
	size: drawerSize,
	...otherProps
}: Props) {
	const [size, setSize] = useState<MantineSize | string | number>(drawerSize ?? "lg");

	const handleClose = () => {
		setSize(drawerSize ?? "lg");
		onClose();
	};

	return (
		<Drawer
			keepMounted={false}
			offset={8}
			radius="md"
			position="right"
			size={size}
			onClose={handleClose}
			styles={{ title: { width: "100%" } }}
			title={
				withFullScreen ? (
					<Flex align="center" justify="space-between">
						<Text fw="bold">{title}</Text>
						<ActionIcon
							c="black"
							variant="transparent"
							pb="2px"
							onClick={() => setSize(size === drawerSize || size === "lg" ? "100%" : (drawerSize ?? "lg"))}
						>
							<IconMaximize size={17} />
						</ActionIcon>
					</Flex>
				) : (
					<Text fw="bold">{title}</Text>
				)
			}
			{...otherProps}
		>
			{children}
		</Drawer>
	);
}
