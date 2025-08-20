import GlobalSettingContext from "@/shared/contexts/globalSettingContext";
import { ActionIcon } from "@mantine/core";
import { IconColorFilter } from "@tabler/icons-react";
import { useContext } from "react";

export default function ICPanelHeaderThemeModeSelect() {
	const { theme, setTheme } = useContext(GlobalSettingContext);
	// const { toggleColorScheme, colorScheme } = useMantineColorScheme();
	return (
		<>
			{/* <ActionIcon variant="subtle" c="white" onClick={toggleColorScheme}>
        {colorScheme === "dark" ? <IconSunFilled size={20} /> : <IconMoon size={20} />}
      </ActionIcon> */}
			<ActionIcon
				variant="subtle"
				onClick={() => {
					setTheme?.(theme === "green" ? "pink" : "green");
				}}
			>
				{theme === "green" ? (
					<IconColorFilter color={"pink"} size={20} />
				) : (
					<IconColorFilter color={"green"} size={20} />
				)}
			</ActionIcon>
		</>
	);
}
