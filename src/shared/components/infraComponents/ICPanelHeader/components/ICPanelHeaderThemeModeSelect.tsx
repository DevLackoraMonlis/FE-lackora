import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function ICPanelHeaderThemeModeSelect() {
	const { toggleColorScheme, colorScheme } = useMantineColorScheme();
	return (
		<ActionIcon
			variant="subtle"
			w={44}
			h={44}
			c="white"
			onClick={toggleColorScheme}
		>
			{colorScheme === "dark" ? (
				<IconSun size={24} strokeWidth={1.5} />
			) : (
				<IconMoon size={24} strokeWidth={1.5} />
			)}
		</ActionIcon>
	);
}
