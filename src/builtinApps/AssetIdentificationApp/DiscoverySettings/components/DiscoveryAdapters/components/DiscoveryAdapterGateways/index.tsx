import { Flex } from "@mantine/core";

import {
	useDeleteDiscoverySetting,
	useDiscoveryAdapterById,
	useEditDiscoverySetting,
} from "../../../../index.hooks";
import type { DiscoveryAdapterApiField, DiscoveryAdapterConfiguration } from "../../../../index.types";

import DiscoveryAdapterCard from "../DiscoveryAdapterCard";
import DiscoveryAdaptersAddGateway from "../DiscoveryAdaptersCreateGateway";

type Props = {
	adapterId: string;
	fields: DiscoveryAdapterApiField[];
};

const DiscoveryAdapterGateways = ({ adapterId, ...props }: Props) => {
	const { discoverySettingConfigurations } = useDiscoveryAdapterById(adapterId);

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
				{discoverySettingConfigurations.data?.results?.map(({ configs, id, isActive }) => (
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
				adapterId={adapterId}
				disabled={discoverySettingConfigurations.isFetching}
				refetchDiscoveryAdapters={discoverySettingConfigurations.refetch}
			/>
		</>
	);
};

export default DiscoveryAdapterGateways;
