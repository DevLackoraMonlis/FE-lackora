import type { DrawerProps, MantineSize } from "@mantine/core";
import { ActionIcon, Drawer, Flex, Text } from "@mantine/core";
import { IconMaximize } from "@tabler/icons-react";
import { useState } from "react";

type Props = DrawerProps & {
	withFullScreen?: boolean;
	fullScreen?: boolean;
};

export default function BCDrawer({
	children,
	title,
	onClose,
	fullScreen,
	withFullScreen = true,
	size: drawerSize,
	...otherProps
}: Props) {
	const defaultSize = fullScreen ? "100%" : (drawerSize ?? "lg");
	const [size, setSize] = useState<MantineSize | string | number>(defaultSize);

	const handleClose = () => {
		setSize(defaultSize);
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
				!fullScreen && withFullScreen ? (
					<Flex align="center" justify="space-between">
						<Text fw="bold">{title}</Text>
						<ActionIcon
							c="black"
							variant="transparent"
							pb="2px"
							onClick={() => setSize(size === drawerSize || size === "lg" ? "100%" : defaultSize)}
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
