import { Grid } from "@mantine/core";

import type { ConfigurationRs } from "@/builtinApps/AssetIdentificationApp/DiscoverySettings/index.types";
import BCDrawer from "@/shared/components/baseComponents/BCDrawer";

import WorkflowScanHistory from "./components/WorkflowScanHistory";
import WorkflowScanHistoryList from "./components/WorkflowScanHistoryList";

type Props = Partial<ConfigurationRs> & {
	onClose: VoidFunction;
	opened: boolean;
	enabledQuery: boolean;
};

export default function WorkflowScanHistoryModal({ onClose, opened, ...configs }: Props) {
	return (
		<BCDrawer fullScreen onClose={onClose} opened={opened} title="Scan History">
			<Grid gutter="xs">
				<Grid.Col span={2.5}>
					<WorkflowScanHistoryList onClose={onClose} opened={opened} {...configs} />
				</Grid.Col>
				<Grid.Col span={9.5}>
					<WorkflowScanHistory onClose={onClose} opened={opened} {...configs} />
				</Grid.Col>
			</Grid>
		</BCDrawer>
	);
}
