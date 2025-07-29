import { Grid } from "@mantine/core";
import { useState } from "react";

import BCDrawer from "@/shared/components/baseComponents/BCDrawer";

import type { WorkflowScan } from "../../index.types";
import WorkflowScanHistoryList from "./components/WorkflowScanHistoryList";
import WorkflowScanHistory from "./components/WorkflowTableHistory";

type Props = {
	onClose: VoidFunction;
	opened: boolean;
};

export default function WorkflowScanHistoryModal({ onClose, opened }: Props) {
	const [selectedScan, setSelectedScan] = useState<NonNullable<WorkflowScan>>();
	return (
		<BCDrawer
			title="Scan History"
			fullScreen
			opened={opened}
			onClose={() => {
				onClose();
				setSelectedScan(undefined);
			}}
		>
			<Grid gutter="xs">
				<Grid.Col span={2.5}>
					<WorkflowScanHistoryList selectedScan={selectedScan} setSelectedScan={setSelectedScan} />
				</Grid.Col>
				<Grid.Col span={9.5} pos="relative">
					<WorkflowScanHistory selectedScan={selectedScan} />
				</Grid.Col>
			</Grid>
		</BCDrawer>
	);
}
