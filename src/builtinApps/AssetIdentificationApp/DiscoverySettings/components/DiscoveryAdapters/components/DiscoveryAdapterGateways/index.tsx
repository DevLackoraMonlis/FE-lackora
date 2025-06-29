import { Flex, LoadingOverlay } from "@mantine/core";

import {
  useDeleteDiscoverySettingConfiguration,
  useEditDiscoverySettingConfiguration,
  useGetDiscoverySettingConfigurations,
} from "@/http/generated/asset-identification-discovery-settings";
import type { EachAdapterConfiguration, EachDiscoverySetting } from "@/http/generated/models";

import { GET_DISCOVERY_SETTING_CONFIGURATIONS_QUERY_KEY } from "../../../../index.constants";

import DiscoveryAdapterCard from "../DiscoveryAdapterCard";
import DiscoveryAdaptersAddGateway from "../DiscoveryAdaptersAddGateway";

type Props = {
  adapterId: string;
  formFields: EachDiscoverySetting["fields"];
};

const DiscoveryAdapterGateways = ({ adapterId, formFields }: Props) => {
  const discoverySettingConfigurations = useGetDiscoverySettingConfigurations(adapterId, {
    query: { enabled: !!adapterId, queryKey: [GET_DISCOVERY_SETTING_CONFIGURATIONS_QUERY_KEY] },
  });

  const deleteDiscoverySetting = useDeleteDiscoverySettingConfiguration();
  const handleDeleteAdapterConfigurations = (configuration_id: string) => {
    deleteDiscoverySetting.mutate(
      { adapterId, data: { configuration_id } },
      { onSuccess: () => discoverySettingConfigurations.refetch() }
    );
  };

  const editDiscoverySetting = useEditDiscoverySettingConfiguration();
  const handleEditAdapterConfigurations = (
    configuration_id: string,
    configs: EachAdapterConfiguration["config"]
  ) => {
    editDiscoverySetting.mutate(
      { adapterId, data: { configs, configuration_id } },
      { onSuccess: () => discoverySettingConfigurations.refetch() }
    );
  };

  return (
    <>
      <Flex gap="xs" direction="column" pos="relative" mih="50px">
        <LoadingOverlay visible={discoverySettingConfigurations.isFetching} />
        {discoverySettingConfigurations?.data?.data?.results?.map((item) => (
          <DiscoveryAdapterCard
            key={item.id}
            loading={deleteDiscoverySetting.isPending || editDiscoverySetting.isPending}
            handleDeleteAdapterConfigurations={() => handleDeleteAdapterConfigurations(item.id)}
            handleEditAdapterConfigurations={(newConfigs) =>
              handleEditAdapterConfigurations(item.id, newConfigs)
            }
            {...item}
          />
        ))}
      </Flex>
      <DiscoveryAdaptersAddGateway
        disabled={discoverySettingConfigurations.isFetching}
        adapterId={adapterId}
        formFields={formFields}
      />
    </>
  );
};

export default DiscoveryAdapterGateways;
