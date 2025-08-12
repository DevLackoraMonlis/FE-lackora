"use client";

import { Tabs } from "@mantine/core";

import ProfilingPullBase from "./components/ProfilingPullBase";
import ProfilingPushBase from "./components/ProfilingPushBase";
import { ProfilingInventoryRules, ProfilingSettingsTabs } from "./index.enum";

export default function AssetIdentificationProfilingSettingsPage() {
	return (
		<Tabs defaultValue={ProfilingSettingsTabs.PullBase} styles={({ headings }) => ({ tabLabel: headings })}>
			{/* TABS */}
			<Tabs.List justify="center">
				<Tabs.Tab value={ProfilingSettingsTabs.PullBase}>{ProfilingSettingsTabs.PullBase}</Tabs.Tab>
				<Tabs.Tab value={ProfilingSettingsTabs.PushBase}>{ProfilingSettingsTabs.PushBase}</Tabs.Tab>
			</Tabs.List>
			{/* PANELS */}
			<Tabs.Panel value={ProfilingSettingsTabs.PullBase}>
				<ProfilingPullBase type={ProfilingInventoryRules[ProfilingSettingsTabs.PullBase]} />
			</Tabs.Panel>
			<Tabs.Panel value={ProfilingSettingsTabs.PushBase}>
				<ProfilingPushBase type={ProfilingInventoryRules[ProfilingSettingsTabs.PushBase]} />
			</Tabs.Panel>
		</Tabs>
	);
}
