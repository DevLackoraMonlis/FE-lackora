"use client";

import { Grid, Tabs } from "@mantine/core";
import { IconRadar2, IconBuilding } from "@tabler/icons-react";

import { DiscoverySettingsTabs } from "./index.enum";

import DiscoverySettingsDiscoveryAdapters from "./components/DiscoveryAdapters";
import DiscoverySettingsNoneCredentialAdapters from "./components/NoneCredentialAdapters";

export default function AssetIdentificationDiscoverySettingsPage() {
  return (
    <Tabs
      keepMounted={false}
      defaultValue={DiscoverySettingsTabs.DiscoveryAdapters}
      styles={({ headings }) => ({ tabLabel: headings })}
    >
      {/* TABS */}
      <Tabs.List justify="center">
        <Tabs.Tab value={DiscoverySettingsTabs.DiscoveryAdapters} leftSection={<IconRadar2 size={20} />}>
          {DiscoverySettingsTabs.DiscoveryAdapters}
        </Tabs.Tab>
        <Tabs.Tab
          value={DiscoverySettingsTabs.NoneCredentialAdapters}
          leftSection={<IconBuilding size={20} />}
        >
          {DiscoverySettingsTabs.NoneCredentialAdapters}
        </Tabs.Tab>
      </Tabs.List>
      {/* PANELS */}
      <Grid>
        <Grid.Col span={{ xs: 12, lg: 10 }}>
          <Tabs.Panel value={DiscoverySettingsTabs.DiscoveryAdapters}>
            <DiscoverySettingsDiscoveryAdapters />
          </Tabs.Panel>
          <Tabs.Panel value={DiscoverySettingsTabs.NoneCredentialAdapters}>
            <DiscoverySettingsNoneCredentialAdapters />
          </Tabs.Panel>
        </Grid.Col>
      </Grid>
    </Tabs>
  );
}
