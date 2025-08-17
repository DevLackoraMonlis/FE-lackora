import GlobalSettingContext from "@/shared/contexts/globalSettingContext";
import { ActionIcon } from "@mantine/core";
import { IconColorFilter } from "@tabler/icons-react";
import { useContext } from "react";

export default function ICPanelHeaderThemeModeSelect() {
	const { theme, setTheme } = useContext(GlobalSettingContext);
	return (
		<ActionIcon
			variant="subtle"
			w={44}
			h={44}
			c="white"
			onClick={() => {
				setTheme?.(theme === "green" ? "pink" : "green");
			}}
		>
			{theme === "green" ? (
				<IconColorFilter color={"pink"} size={24} />
			) : (
				<IconColorFilter color={"green"} size={24} />
			)}
		</ActionIcon>
	);
}
