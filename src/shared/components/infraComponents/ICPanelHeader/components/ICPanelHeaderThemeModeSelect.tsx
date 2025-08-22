import GlobalSettingContext from "@/shared/contexts/globalSettingContext";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSunFilled, IconTemplateFilled } from "@tabler/icons-react";
import { useContext } from "react";

export default function ICPanelHeaderThemeModeSelect() {
	const { theme, setTheme, setMantineTheme } = useContext(GlobalSettingContext);
	const { toggleColorScheme, colorScheme } = useMantineColorScheme();
	return (
		<>
			<ActionIcon
				variant="transparent"
				c="white"
				onClick={() => {
					setMantineTheme?.(colorScheme === "dark" ? "light" : "dark");
					toggleColorScheme();
				}}
			>
				{colorScheme === "dark" ? <IconSunFilled size={20} /> : <IconMoon size={20} />}
			</ActionIcon>
			<ActionIcon
				variant="transparent"
				onClick={() => {
					setTheme?.(theme === "green" ? "pink" : "green");
				}}
			>
				<IconTemplateFilled color={theme === "green" ? "pink" : "green"} size={20} />
			</ActionIcon>
		</>
	);
}
