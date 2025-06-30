import { groupBy } from "lodash";
import {
  useCreateDiscoverySettingConfiguration,
  useDeleteDiscoverySettingConfiguration,
  useEditDiscoverySettingConfiguration,
  useGetDiscoverySettings,
} from "@/http/generated/asset-identification-discovery-settings";

import type {
  DiscoveryAdapterConfiguration,
  DiscoveryAdapterFieldObjectType,
  DiscoveryAdapterFilters,
} from "./index.types";

const mockRecordData = [
  {
    id: "36b59a8c-f00c-4058-9cb2-6584fef8e0bc",
    adapter_id: "e6c0a1fc-489a-4979-b02a-506bddc525b6",
    config: [
      {
        key: "ip",
        value: "1.1.1.1",
        id: null,
        type: null,
      },
      {
        key: "connection",
        value: null,
        id: "2246da6f-ca9d-4e52-9b24-a0149ddf9314",
        type: "connection",
      },
    ],
    is_active: null,
    creator: "SYSTEM",
    created_time: "2025-06-29 17:44:55",
    updater: null,
    updated_time: null,
  },
];

export function useDiscoveryAdapters(params: DiscoveryAdapterFilters) {
  const discoveryAdapters = useGetDiscoverySettings(params, {
    query: {
      select: (res) => {
        const results = res?.data?.results?.map(({ fields, ...item }) => ({
          ...item,
          fields:
            fields.map(({ object_type, ...item }) => ({
              ...item,
              objectType: object_type as DiscoveryAdapterFieldObjectType,
            })) || [],
          configurations:
            mockRecordData.map(({ id, is_active, config }) => ({
              id,
              configs: config as unknown as DiscoveryAdapterConfiguration[],
              isActive: !!is_active,
            })) || [],
        }));
        return { ...res?.data, results };
      },
    },
  });

  return { discoveryAdapters };
}

export function useDeleteDiscoverySetting() {
  const deleteDiscoverySetting = useDeleteDiscoverySettingConfiguration();
  return deleteDiscoverySetting;
}

export function useEditDiscoverySetting() {
  const editDiscoverySetting = useEditDiscoverySettingConfiguration();
  return editDiscoverySetting;
}

export function useCreateDiscoverySetting() {
  const createDiscoverySettingConfiguration = useCreateDiscoverySettingConfiguration();
  return createDiscoverySettingConfiguration;
}
