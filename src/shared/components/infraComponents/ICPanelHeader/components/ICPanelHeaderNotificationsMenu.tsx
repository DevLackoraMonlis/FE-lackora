import { Flex, Indicator, Menu, useMantineTheme } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";

export default function ICPanelHeaderNotificationsMenu() {
	const theme = useMantineTheme();
	return (
		<Menu zIndex={1500} width={412} radius="md" closeOnClickOutside closeOnEscape position="bottom-end">
			<Menu.Target>
				<Flex mt={6} align="center" justify="center" style={{ cursor: "pointer" }}>
					<Indicator
						fz="xs"
						label={0}
						color="red"
						radius="xl"
						inline
						className="text-[8px]"
						processing={true}
						size={14}
					>
						<IconBell style={{ color: theme.white }} />
					</Indicator>
				</Flex>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Divider />
				<Menu.Item>Menu</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
