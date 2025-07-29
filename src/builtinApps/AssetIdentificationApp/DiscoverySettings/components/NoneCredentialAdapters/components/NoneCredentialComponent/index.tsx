import { Flex, LoadingOverlay } from "@mantine/core";

import type {
	BCDynamicConfigRq,
	BCDynamicFieldRs,
} from "@/shared/components/baseComponents/BCDynamicField/index.types";

import {
	useDeleteNoneCredential,
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
	const discoverySettingConfigurations = useDiscoveryAdapterById(adapterId, enabled);

	const { deleteDiscoverySetting } = useDeleteNoneCredential();
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
			<Flex
				gap="xs"
				direction="column"
				pos="relative"
				mih={discoverySettingConfigurations?.isFetching ? "50px" : ""}
			>
				<LoadingOverlay visible={discoverySettingConfigurations?.isLoading} />
				{discoverySettingConfigurations.data?.results?.map((item, idx) => (
					<NoneCredentialAdaptersCard
						handleDeleteAdapterConfigurations={() => handleDeleteAdapterConfigurations(item.id)}
						handleEditAdapterConfigurations={(newConfigs, callback) =>
							handleEditAdapterConfigurations(item.id, newConfigs, callback)
						}
						key={item.id}
						showLabel={!idx}
						fields={fields}
						loading={deleteDiscoverySetting.isPending || editDiscoverySetting.isPending}
						{...item}
					/>
				))}
			</Flex>
			<NoneCredentialCreate
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

export default NoneCredentialServices;
