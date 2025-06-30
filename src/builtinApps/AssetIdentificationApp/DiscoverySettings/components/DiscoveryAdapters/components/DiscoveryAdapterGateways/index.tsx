import { Flex } from "@mantine/core";

import type {
  DiscoveryAdapterApiField,
  DiscoveryAdapterConfiguration,
  DiscoveryAdapterConfigurationRs,
} from "../../../../index.types";
import { useDeleteDiscoverySetting, useEditDiscoverySetting } from "../../../../index.hooks";

import DiscoveryAdapterCard from "../DiscoveryAdapterCard";
import DiscoveryAdaptersAddGateway from "../DiscoveryAdaptersAddGateway";

type Props = {
  isFetching: boolean;
  refetchDiscoveryAdapters: VoidFunction;
  adapterId: string;
  adapterGateways: DiscoveryAdapterConfigurationRs[];
  fields: DiscoveryAdapterApiField[];
};

const DiscoveryAdapterGateways = ({ adapterId, ...props }: Props) => {
  const deleteDiscoverySetting = useDeleteDiscoverySetting();
  const handleDeleteAdapterConfigurations = (configuration_id: string) => {
    deleteDiscoverySetting.mutate(
      { adapterId, data: { configuration_id } },
      { onSuccess: () => props.refetchDiscoveryAdapters() }
    );
  };

  const editDiscoverySetting = useEditDiscoverySetting();
  const handleEditAdapterConfigurations = (
    configuration_id: string,
    configs: DiscoveryAdapterConfiguration[]
  ) => {
    editDiscoverySetting.mutate(
      { adapterId, data: { configs, configuration_id } },
      { onSuccess: () => props.refetchDiscoveryAdapters() }
    );
  };

  return (
    <>
      <Flex gap="xs" direction="column" pos="relative" mih="50px">
        {props.adapterGateways?.map(({ configs, id, isActive }) => (
          <DiscoveryAdapterCard
            loading={deleteDiscoverySetting.isPending || editDiscoverySetting.isPending}
            handleDeleteAdapterConfigurations={() => handleDeleteAdapterConfigurations(id)}
            handleEditAdapterConfigurations={(newConfigs) => handleEditAdapterConfigurations(id, newConfigs)}
            key={id}
            fields={props.fields}
            {...{ configs, id, isActive }}
          />
        ))}
      </Flex>
      <DiscoveryAdaptersAddGateway
        fields={props.fields}
        disabled={props.isFetching}
        adapterId={adapterId}
        refetchDiscoveryAdapters={props.refetchDiscoveryAdapters}
      />
    </>
  );
};

export default DiscoveryAdapterGateways;
