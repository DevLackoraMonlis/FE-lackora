import type { DrawerProps, MantineSize } from "@mantine/core";
import { ActionIcon, CloseButton, Drawer, Flex, Text } from "@mantine/core";
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
			data-testid="BCDrawer"
			keepMounted={false}
			offset={8}
			radius="md"
			position="right"
			size={size}
			withCloseButton={false}
			onClose={handleClose}
			styles={{ title: { width: "100%" } }}
			title={
				!fullScreen && withFullScreen ? (
					<Flex align="center" justify="space-between" px="2xs">
						<Text fz="md" data-testid="BCDrawer-title">
							{title}
						</Text>
						<Flex gap="2xs" align="center">
							<ActionIcon
								autoFocus={false}
								c="black"
								variant="transparent"
								pb="2px"
								onClick={() => setSize(size === drawerSize || size === "lg" ? "100%" : defaultSize)}
							>
								<IconMaximize size={17} />
							</ActionIcon>
							<CloseButton onClick={handleClose} data-testid="BCDrawer-close" />
						</Flex>
					</Flex>
				) : (
					<Flex align="center" justify="space-between" px="2xs">
						<Text fz="md" data-testid="BCDrawer-title">
							{title}
						</Text>
						<CloseButton onClick={handleClose} data-testid="BCDrawer-close" />
					</Flex>
				)
			}
			{...otherProps}
		>
			{children}
		</Drawer>
	);
}
