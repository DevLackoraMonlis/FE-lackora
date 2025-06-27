import { useQueryClient } from "@tanstack/react-query";
import { Flex, LoadingOverlay } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import {
  useDeleteDiscoverySettingConfiguration,
  useGetDiscoverySettingConfigurations,
} from "@/http/generated/asset-identification-discovery-settings";

import { ADAPTER_CONFIGURATIONS_QUERY_KEY } from "../../../../index.constants";

import DiscoveryAdaptersForm from "./components/DiscoveryAdaptersForm";
import DiscoveryAdapterCard from "./components/DiscoveryAdapterCard";

type Props = {
  adapterId: string;
};
const DiscoveryAdapterGateways = ({ adapterId }: Props) => {
  const queryClient = useQueryClient();
  const adapterConfigurations = useGetDiscoverySettingConfigurations(adapterId, {
    query: { enabled: !!adapterId, queryKey: [ADAPTER_CONFIGURATIONS_QUERY_KEY] },
  });

  const deleteAdapterConfigurations = useDeleteDiscoverySettingConfiguration();
  const handleDeleteAdapterConfigurations = (configuration_id: string) => {
    deleteAdapterConfigurations.mutate(
      { adapterId, data: { configuration_id } },
      {
        onError(res) {
          notifications.show({
            title: "Failed",
            message: res?.detail?.join(", ") || "The operation failed.",
            color: "red",
            position: "top-center",
          });
        },
        onSuccess(res) {
          notifications.show({
            title: "Success",
            message: res?.data?.message || "The operation was successful.",
            color: "green",
            position: "top-center",
          });
          queryClient.refetchQueries({ queryKey: [ADAPTER_CONFIGURATIONS_QUERY_KEY] });
        },
      }
    );
  };

  return (
    <>
      <Flex gap="xs" direction="column" pos="relative">
        <LoadingOverlay visible={adapterConfigurations.isFetching} />
        {adapterConfigurations?.data?.data?.results?.map((item) => (
          <DiscoveryAdapterCard
            key={item.id}
            handleDeleteAdapterConfigurations={() => handleDeleteAdapterConfigurations(item.id)}
            {...item}
          />
        ))}
      </Flex>
      <DiscoveryAdaptersForm disabled={adapterConfigurations.isFetching} adapterId={adapterId} />
    </>
  );
};

export default DiscoveryAdapterGateways;
