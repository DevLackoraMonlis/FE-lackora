import { Flex, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

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
import type { ConfigurationRs } from "../../../../index.types";

import DiscoveryAdapterCard from "../DiscoveryAdapterCard";
import DiscoveryAdaptersCreateGateway from "../DiscoveryAdaptersCreate";
import { DiscoveryIPsDrawerModal } from "../DiscoveryIPs";
import { DiscoveryQuickModal } from "../DiscoveryQuick";

type Props = {
	enabled: boolean;
	adapterId: string;
	fields: BCDynamicFieldRs[];
};

const DiscoveryAdapterGateways = ({ enabled, adapterId, fields }: Props) => {
	const [selectedId, setSelectedId] = useState("");
	const [openedDiscoveryQuick, handlersDiscoveryQuick] = useDisclosure(false);
	const [openedDiscoveryIPs, handlersDiscoveryIPs] = useDisclosure(false);

	const { discoverySettingConfigurations } = useDiscoveryAdapterById(adapterId, enabled);
	const [selectedRecord, setSelectedRecord] = useState<ConfigurationRs>();
	const handleDiscoverySettingQuickDiscovery = (adapter: ConfigurationRs) => {
		setSelectedId(adapter.configurationId);
		setSelectedRecord(adapter);
		handlersDiscoveryQuick.open();
	};
	const handleDiscoverySettingDiscoveryIPs = (adapter: ConfigurationRs) => {
		setSelectedId(adapter.configurationId);
		setSelectedRecord(adapter);
		handlersDiscoveryIPs.open();
	};

	const { testDiscoverySettingConnection, testLoading } = useTestDiscoverySettingConnection();
	const handleDiscoverySettingTestConnection = (adapterId: string, configuration_id: string) => {
		setSelectedId(configuration_id);
		testDiscoverySettingConnection(adapterId, configuration_id);
	};

	const { deleteDiscoverySetting } = useDeleteDiscoverySetting();
	const handleDeleteAdapterConfigurations = (configuration_id: string) => {
		setSelectedId(configuration_id);
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
		setSelectedId(configuration_id);
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

	const loading = deleteDiscoverySetting.isPending || editDiscoverySetting.isPending;
	return (
		<>
			<DiscoveryIPsDrawerModal
				opened={openedDiscoveryIPs}
				onClose={handlersDiscoveryIPs.close}
				{...(selectedRecord || {})}
			/>
			<DiscoveryQuickModal
				opened={openedDiscoveryQuick}
				onClose={handlersDiscoveryQuick.close}
				{...(selectedRecord || {})}
			/>
			{/* UI section */}
			<Flex gap="xs" direction="column" pos="relative" mih="50px">
				<LoadingOverlay visible={discoverySettingConfigurations?.isFetching} />
				{discoverySettingConfigurations.data?.results?.map(
					({ configs, id, isActive, editable, adapterId }) => (
						<DiscoveryAdapterCard
							handleDeleteAdapterConfigurations={handleDeleteAdapterConfigurations}
							handleDiscoverySettingTestConnection={handleDiscoverySettingTestConnection}
							handleDiscoverySettingQuickDiscovery={handleDiscoverySettingQuickDiscovery}
							handleDiscoverySettingDiscoveryIPs={handleDiscoverySettingDiscoveryIPs}
							handleEditAdapterConfigurations={handleEditAdapterConfigurations}
							key={id}
							{...{
								configs,
								id,
								isActive,
								editable,
								adapterId,
								fields,
								disabled: testLoading || loading,
								...(id === selectedId && {
									testLoading,
									loading,
								}),
							}}
						/>
					),
				)}
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
