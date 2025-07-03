import { Flex, LoadingOverlay } from "@mantine/core";

import {
	useDeleteDiscoverySetting,
	useDiscoveryAdapterById,
	useEditDiscoverySetting,
} from "../../../../index.hooks";
import type { DiscoveryAdapterConfiguration, DiscoveryAdaptersField } from "../../../../index.types";

import DiscoveryAdapterCard from "../DiscoveryAdapterCard";
import DiscoveryAdaptersCreateGateway from "../DiscoveryAdaptersCreate";

type Props = {
	enabled: boolean;
	adapterId: string;
	fields: DiscoveryAdaptersField[];
};

const DiscoveryAdapterGateways = ({ enabled, adapterId, fields }: Props) => {
	const { discoverySettingConfigurations } = useDiscoveryAdapterById(adapterId, enabled);

	const { deleteDiscoverySetting } = useDeleteDiscoverySetting();
	const handleDeleteAdapterConfigurations = (configuration_id: string) => {
		deleteDiscoverySetting.mutate(
			{ adapterId, data: { configuration_id } },
			{ onSuccess: () => discoverySettingConfigurations.refetch() },
		);
	};

	const { editDiscoverySetting } = useEditDiscoverySetting();
	const handleEditAdapterConfigurations = (
		configuration_id: string,
		configs: DiscoveryAdapterConfiguration[],
	) => {
		editDiscoverySetting.mutate(
			{ adapterId, data: { configs, configuration_id } },
			{ onSuccess: () => discoverySettingConfigurations.refetch() },
		);
	};

	return (
		<>
			<Flex gap="xs" direction="column" pos="relative" mih="50px">
				<LoadingOverlay visible={discoverySettingConfigurations?.isFetching} />
				{discoverySettingConfigurations.data?.results?.map(({ configs, id, isActive, editable }) => (
					<DiscoveryAdapterCard
						key={id}
						loading={deleteDiscoverySetting.isPending || editDiscoverySetting.isPending}
						handleDeleteAdapterConfigurations={() => handleDeleteAdapterConfigurations(id)}
						handleEditAdapterConfigurations={(newConfigs) => handleEditAdapterConfigurations(id, newConfigs)}
						{...{ configs, id, isActive, editable, fields }}
					/>
				))}
			</Flex>
			<DiscoveryAdaptersCreateGateway
				fields={fields}
				adapterId={adapterId}
				disabled={discoverySettingConfigurations.isFetching}
				refetchDiscoveryAdapters={discoverySettingConfigurations.refetch}
			/>
		</>
	);
};

export default DiscoveryAdapterGateways;
