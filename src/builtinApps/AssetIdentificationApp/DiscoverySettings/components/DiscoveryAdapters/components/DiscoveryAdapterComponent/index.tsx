import { Flex, LoadingOverlay, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

import type {
	BCDynamicConfigRq,
	BCDynamicFieldRs,
} from "@/shared/components/baseComponents/BCDynamicField/index.types";

import {
	useDiscoveryAdapterById,
	useEditDiscoverySetting,
	useTestDiscoverySettingConnection,
} from "../../../../index.hooks";
import type { ConfigurationRs } from "../../../../index.types";

import BCSearchInput from "@/shared/components/baseComponents/BCSearchInput";
import { DeleteDiscoveryAdapterModal } from "../DeleteDiscoveryAdapter";
import DiscoveryAdapterCard from "../DiscoveryAdapterCard";
import DiscoveryAdaptersCreateGateway from "../DiscoveryAdaptersCreate";
import DiscoveryIPsDrawerModal from "../DiscoveryIPs";
import { DiscoveryQuickModal } from "../DiscoveryQuick";

type Props = {
	enabled: boolean;
	adapterId: string;
	fields: BCDynamicFieldRs[];
	refetchDiscoveryAdapters: VoidFunction;
};

const DiscoveryAdapterGateways = ({ enabled, adapterId, fields, refetchDiscoveryAdapters }: Props) => {
	const [selectedId, setSelectedId] = useState("");
	const [selectedRecord, setSelectedRecord] = useState<ConfigurationRs>();
	const [openedDiscoveryIPs, handlersDiscoveryIPs] = useDisclosure(false);
	const [openedDiscoveryQuick, handlersDiscoveryQuick] = useDisclosure(false);
	const [openedDelete, handlersDelete] = useDisclosure(false);

	const [search, setSearch] = useState<string>("");
	const discoverySettingConfigurations = useDiscoveryAdapterById(adapterId, enabled, search);
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
	const onCloseDiscoveryQuickModal = () => {
		handlersDiscoveryQuick.close();
		setTimeout(discoverySettingConfigurations.refetch, 200);
	};

	const { testConnection, testLoading } = useTestDiscoverySettingConnection();
	const handleDiscoverySettingTestConnection = (adapterId: string, configuration_id: string) => {
		setSelectedId(configuration_id);
		const callback = () => discoverySettingConfigurations.refetch().then(refetchDiscoveryAdapters);
		testConnection(adapterId, configuration_id, callback);
	};

	const handleDeleteAdapterConfigurations = (adapter: ConfigurationRs) => {
		setSelectedId(adapter.configurationId);
		setSelectedRecord(adapter);
		handlersDelete.open();
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

	return (
		<>
			<DeleteDiscoveryAdapterModal
				opened={openedDelete}
				onClose={handlersDelete.close}
				{...(selectedRecord || {})}
				refetchDiscoveryAdapters={() => {
					discoverySettingConfigurations.refetch().then(refetchDiscoveryAdapters);
				}}
			/>
			<DiscoveryIPsDrawerModal
				opened={openedDiscoveryIPs}
				onClose={handlersDiscoveryIPs.close}
				{...(selectedRecord || {})}
			/>
			<DiscoveryQuickModal
				opened={openedDiscoveryQuick}
				onClose={onCloseDiscoveryQuickModal}
				{...(selectedRecord || {})}
			/>
			{/* UI section */}
			<Flex align="center" justify="space-between">
				<Text py="xs" c="gray.6">
					Added Configurations
				</Text>
				{!!discoverySettingConfigurations.data?.results?.length && (
					<BCSearchInput clientSide onSubmitSearch={setSearch} placeholder="Search by Name and IP" />
				)}
			</Flex>
			<Flex
				pt="xs"
				gap="xs"
				direction="column"
				pos="relative"
				mih={discoverySettingConfigurations?.isFetching ? "50px" : ""}
			>
				<LoadingOverlay visible={discoverySettingConfigurations?.isFetching} />
				{discoverySettingConfigurations.data?.results?.map((item) => (
					<DiscoveryAdapterCard
						handleDeleteAdapterConfigurations={handleDeleteAdapterConfigurations}
						handleDiscoverySettingTestConnection={handleDiscoverySettingTestConnection}
						handleDiscoverySettingQuickDiscovery={handleDiscoverySettingQuickDiscovery}
						handleDiscoverySettingDiscoveryIPs={handleDiscoverySettingDiscoveryIPs}
						handleEditAdapterConfigurations={handleEditAdapterConfigurations}
						key={item.id}
						{...{
							fields,
							disabled: testLoading || editDiscoverySetting.isPending,
							...(item.id === selectedId && {
								testLoading,
								loading: editDiscoverySetting.isPending,
							}),
							...item,
						}}
					/>
				))}
			</Flex>
			<DiscoveryAdaptersCreateGateway
				fields={fields}
				adapterId={adapterId}
				disabled={discoverySettingConfigurations.isFetching}
				refetchDiscoveryAdapters={() => {
					discoverySettingConfigurations.refetch().then(refetchDiscoveryAdapters);
				}}
			/>
		</>
	);
};

export default DiscoveryAdapterGateways;
