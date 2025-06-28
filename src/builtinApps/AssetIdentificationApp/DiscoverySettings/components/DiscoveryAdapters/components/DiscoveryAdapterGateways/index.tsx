import { Flex, LoadingOverlay } from "@mantine/core";

import {
  useDeleteDiscoverySettingConfiguration,
  useEditDiscoverySettingConfiguration,
  useGetDiscoverySettingConfigurations,
} from "@/http/generated/asset-identification-discovery-settings";
import type { EachAdapterConfiguration } from "@/http/generated/models";

import { ADAPTER_CONFIGURATIONS_QUERY_KEY } from "../../../../index.constants";

import DiscoveryAdapterCard from "./components/DiscoveryAdapterCard";
import DiscoveryAdaptersAddGateway from "./components/DiscoveryAdaptersAddGateway";

type Props = {
  adapterId: string;
};

const DiscoveryAdapterGateways = ({ adapterId }: Props) => {
  const adapterConfigurations = useGetDiscoverySettingConfigurations(adapterId, {
    query: { enabled: !!adapterId, queryKey: [ADAPTER_CONFIGURATIONS_QUERY_KEY] },
  });

  const deleteAdapterConfigurations = useDeleteDiscoverySettingConfiguration();
  const handleDeleteAdapterConfigurations = (configuration_id: string) => {
    deleteAdapterConfigurations.mutate(
      { adapterId, data: { configuration_id } },
      { onSuccess: () => adapterConfigurations.refetch() }
    );
  };

  const editAdapterConfigurations = useEditDiscoverySettingConfiguration();
  const handleEditAdapterConfigurations = (
    configuration_id: string,
    configs: EachAdapterConfiguration["config"]
  ) => {
    editAdapterConfigurations.mutate(
      { adapterId, data: { configs, configuration_id } },
      { onSuccess: () => adapterConfigurations.refetch() }
    );
  };

  return (
    <>
      <Flex gap="xs" direction="column" pos="relative" mih="50px">
        <LoadingOverlay visible={adapterConfigurations.isFetching} />
        {adapterConfigurations?.data?.data?.results?.map((item) => (
          <DiscoveryAdapterCard
            key={item.id}
            loading={deleteAdapterConfigurations.isPending || editAdapterConfigurations.isPending}
            handleDeleteAdapterConfigurations={() => handleDeleteAdapterConfigurations(item.id)}
            handleEditAdapterConfigurations={(newConfigs) =>
              handleEditAdapterConfigurations(item.id, newConfigs)
            }
            {...item}
          />
        ))}
      </Flex>
      <DiscoveryAdaptersAddGateway disabled={adapterConfigurations.isFetching} adapterId={adapterId} />
    </>
  );
};

export default DiscoveryAdapterGateways;
