import { AssetProfiling } from "@/shared/icons/components/assets";
import { IconAlertTriangle, IconCheck, IconSearch, IconStatusChange } from "@tabler/icons-react";

export const workflowIcons = {
	asset_discovery: <IconSearch size={30} />,
	change_detection: <IconStatusChange size={30} />,
	asset_profiling: <AssetProfiling width={30} height={30} />,
	completed: <IconCheck size={15} />,
	failed: <IconAlertTriangle size={15} />,
};
