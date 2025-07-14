import { Flex, LoadingOverlay } from "@mantine/core";

import type {
	BCDynamicConfigRq,
	BCDynamicFieldRs,
} from "@/shared/components/baseComponents/BCDynamicField/index.types";

import {
	useDeleteDiscoverySetting,
	useDiscoveryAdapterById,
	useEditDiscoverySetting,
	useTestDiscoverySettingConnection,
} from "../../../../index.hooks";

import DiscoveryAdapterCard from "../DiscoveryAdapterCard";
import DiscoveryAdaptersCreateGateway from "../DiscoveryAdaptersCreate";

type Props = {
	enabled: boolean;
	adapterId: string;
	fields: BCDynamicFieldRs[];
};

const DiscoveryAdapterGateways = ({ enabled, adapterId, fields }: Props) => {
	const { discoverySettingConfigurations } = useDiscoveryAdapterById(adapterId, enabled);
	const { testDiscoverySettingConnection, testLoading } = useTestDiscoverySettingConnection();

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
		configs: BCDynamicConfigRq[],
		callback: VoidFunction,
	) => {
		editDiscoverySetting.mutate(
			{ adapterId, data: { configs, configuration_id } },
			{
				onSuccess: () => {
					discoverySettingConfigurations.refetch();
					callback();
				},
			},
		);
	};

	return (
		<>
			<Flex gap="xs" direction="column" pos="relative" mih="50px">
				<LoadingOverlay visible={discoverySettingConfigurations?.isFetching} />
				{discoverySettingConfigurations.data?.results?.map(({ configs, id, isActive, editable }) => (
					<DiscoveryAdapterCard
						key={id}
						testLoading={testLoading}
						loading={deleteDiscoverySetting.isPending || editDiscoverySetting.isPending}
						handleDeleteAdapterConfigurations={() => handleDeleteAdapterConfigurations(id)}
						handleDiscoverySettingTestConnection={() => testDiscoverySettingConnection(adapterId, id)}
						handleEditAdapterConfigurations={(newConfigs, callback) =>
							handleEditAdapterConfigurations(id, newConfigs, callback)
						}
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
