import { IconTicTac } from "@tabler/icons-react";
import type { ReactNode } from "react";

const useAppModuleIcon = () => {
	const PLUGIN_MODULE_ICON: Record<string, ReactNode> = {
		test: <IconTicTac />,
	};
	return { PLUGIN_MODULE_ICON };
};

export default useAppModuleIcon;
