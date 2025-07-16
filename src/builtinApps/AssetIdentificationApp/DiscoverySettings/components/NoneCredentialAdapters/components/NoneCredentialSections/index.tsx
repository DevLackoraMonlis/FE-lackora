import { Flex, LoadingOverlay } from "@mantine/core";

import type {
	BCDynamicConfigRq,
	BCDynamicFieldRs,
} from "@/shared/components/baseComponents/BCDynamicField/index.types";

import {
	useDeleteDiscoverySetting,
	useDiscoveryAdapterById,
	useEditDiscoverySetting,
} from "../../../../index.hooks";
import NoneCredentialAdaptersCard from "../NoneCredentialCard";
import NoneCredentialCreate from "../NoneCredentialCreate";

type Props = {
	enabled: boolean;
	adapterId: string;
	fields: BCDynamicFieldRs[];
	refetchDiscoveryAdapters: VoidFunction;
};

const NoneCredentialServices = ({ enabled, adapterId, fields, refetchDiscoveryAdapters }: Props) => {
	const { discoverySettingConfigurations } = useDiscoveryAdapterById(adapterId, enabled);

	const { deleteDiscoverySetting } = useDeleteDiscoverySetting();
	const handleDeleteAdapterConfigurations = (configuration_id: string) => {
		deleteDiscoverySetting.mutate(
			{ adapterId, data: { configuration_id } },
			{
				onSuccess: () => {
					discoverySettingConfigurations.refetch();
					refetchDiscoveryAdapters();
				},
			},
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
				<LoadingOverlay visible={discoverySettingConfigurations?.isLoading} />
				{discoverySettingConfigurations.data?.results?.map(
					({ configs, id, isActive, editable, adapterId }, idx) => (
						<NoneCredentialAdaptersCard
							key={id}
							loading={deleteDiscoverySetting.isPending || editDiscoverySetting.isPending}
							handleDeleteAdapterConfigurations={() => handleDeleteAdapterConfigurations(id)}
							handleEditAdapterConfigurations={(newConfigs, callback) =>
								handleEditAdapterConfigurations(id, newConfigs, callback)
							}
							{...{ configs, id, isActive, fields, showLabel: !idx, editable, adapterId }}
						/>
					),
				)}
			</Flex>
			<NoneCredentialCreate
				fields={fields}
				adapterId={adapterId}
				disabled={discoverySettingConfigurations.isFetching}
				refetchDiscoveryAdapters={() => {
					discoverySettingConfigurations.refetch().then(() => refetchDiscoveryAdapters());
				}}
			/>
		</>
	);
};

export default NoneCredentialServices;
