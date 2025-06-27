import type { GetDiscoverySettingsParams } from "@/http/generated/models";
import { useGetDiscoverySettings } from "@/http/generated/asset-identification-discovery-settings";

export const useDiscoverySettings = (params: GetDiscoverySettingsParams) => {
  const discoverySettingsUQ = useGetDiscoverySettings(params);
  return { discoverySettingsUQ };
};
