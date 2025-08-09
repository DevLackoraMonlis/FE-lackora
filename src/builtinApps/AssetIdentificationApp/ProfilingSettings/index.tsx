"use client";

import { Grid, Tabs } from "@mantine/core";
import { IconBuilding, IconRadar2 } from "@tabler/icons-react";

import { ProfilingSettingsTabs } from "./index.enum";

export default function AssetIdentificationProfilingSettingsPage() {
	return (
		<Tabs defaultValue={ProfilingSettingsTabs.PullBase} styles={({ headings }) => ({ tabLabel: headings })}>
			{/* TABS */}
			<Tabs.List justify="center">
				<Tabs.Tab value={ProfilingSettingsTabs.PullBase} leftSection={<IconRadar2 size={20} />}>
					{ProfilingSettingsTabs.PullBase}
				</Tabs.Tab>
				<Tabs.Tab value={ProfilingSettingsTabs.PushBase} leftSection={<IconBuilding size={20} />}>
					{ProfilingSettingsTabs.PushBase}
				</Tabs.Tab>
			</Tabs.List>
			{/* PANELS */}
			<Grid>
				<Grid.Col span={10}>
					<Tabs.Panel value={ProfilingSettingsTabs.PullBase}>
						{"<DiscoverySettingsDiscoveryAdapters />"}
					</Tabs.Panel>
					<Tabs.Panel value={ProfilingSettingsTabs.PushBase}>
						{"<DiscoverySettingsNoneCredentialAdapters />"}
					</Tabs.Panel>
				</Grid.Col>
			</Grid>
		</Tabs>
	);
}
