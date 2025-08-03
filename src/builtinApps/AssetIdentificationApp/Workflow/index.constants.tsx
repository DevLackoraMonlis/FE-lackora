import { IconSearch, IconStatusChange } from "@tabler/icons-react";

import { AllApplications } from "@/shared/constants/routes";
import { AssetProfiling } from "@/shared/icons/components/assets";

const {
	ASSET_IDENTIFICATION: { modules, name },
} = AllApplications;

export const DISCOVERY_SETTINGS_REDIRECT_PATH = `${name}/${modules.DISCOVERY_SETTINGS}`;
export const WORKFLOW_REDIRECT_PATH = `${name}/${modules.WORKFLOW}`;

export const WORKFLOW_REFETCH_INTERVAL = 5_000;
export const WORKFLOW_REFETCH_INTERVAL_HEADER = 5_000;

export const workflowIcons = {
	asset_discovery: <IconSearch size={30} />,
	change_detection: <IconStatusChange size={30} />,
	asset_profiling: <AssetProfiling width={30} height={30} />,
};
