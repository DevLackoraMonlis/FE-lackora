import type { SessionUserType } from "@/http/httpService";
import type { MantineStyleProp } from "@mantine/core";
import type { ReactNode } from "react";

export type ICPanelHeaderProps = {
	onLogout: VoidFunction;
	sessionUser: SessionUserType;
	showChangeThemeButton: boolean;
	applicationLogo: ReactNode;
	style: MantineStyleProp;
	notification?: ReactNode;
};
