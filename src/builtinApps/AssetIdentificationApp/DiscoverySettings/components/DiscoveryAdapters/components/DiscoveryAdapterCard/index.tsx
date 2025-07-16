import { ActionIcon, Badge, Card, Flex, LoadingOverlay, Text } from "@mantine/core";
import { IconPencil, IconPlugConnected, IconX, IconZoomReset } from "@tabler/icons-react";
import { isObject } from "lodash";
import { useState } from "react";

import type {
	BCDynamicConfigRq,
	BCDynamicFieldRs,
} from "@/shared/components/baseComponents/BCDynamicField/index.types";
import BCPopoverConfirm from "@/shared/components/baseComponents/BCPopoverConfirm";

import type { ConfigurationRs, DiscoveryAdapterConfigurationRs } from "../../../../index.types";
import DiscoveryAdaptersEditGateway from "../DiscoveryAdaptersEdit";

type Props = DiscoveryAdapterConfigurationRs & {
	handleDeleteAdapterConfigurations: (id: string) => void;
	handleDiscoverySettingTestConnection: (adapterId: string, id: string) => void;
	handleDiscoverySettingQuickDiscovery: (adapter: ConfigurationRs) => void;
	handleEditAdapterConfigurations: (id: string, configs: BCDynamicConfigRq[], callback: VoidFunction) => void;
	fields: BCDynamicFieldRs[];
	disabled: boolean;
	loading?: boolean;
	testLoading?: boolean;
};

const DiscoveryAdapterCard = ({
	id,
	adapterId,
	configs,
	isActive,
	testLoading = false,
	loading = false,
	disabled = false,
	...props
}: Props) => {
	const [editMode, setEditMode] = useState(false);

	if (editMode) {
		return (
			<DiscoveryAdaptersEditGateway
				{...{ id, configs, isActive, adapterId, loading, ...props }}
				onCancel={() => setEditMode(false)}
			/>
		);
	}

	const configurationIP = configs?.find(({ key }) => key === "ip")?.value;
	return (
		<Card bg="gray.1" w="100%" padding="xs">
			<LoadingOverlay visible={loading} />
			<Flex align="center" justify="space-between">
				<Text fw="bold" fz="sm">
					{configs?.map(({ value }) => (isObject(value) ? value?.label : ""))?.join(" - ")}
				</Text>
				<Flex gap="2xs">
					<Badge variant="light" color={isActive ? "green" : "red"} p="sm">
						<Text p="2xs" tt="capitalize">
							{isActive ? "Connected" : "Disconnected"}
						</Text>
					</Badge>
					<ActionIcon
						disabled={disabled}
						onClick={() => {
							props.handleDiscoverySettingQuickDiscovery({
								configurationIP: `${isObject(configurationIP) ? configurationIP?.label : ""}`,
								configurationId: id,
								adapterId,
							});
						}}
						title="Quick Discover"
						variant="subtle"
						c="gray.8"
					>
						<IconZoomReset size={20} />
					</ActionIcon>
					<ActionIcon
						disabled={disabled}
						loading={testLoading}
						onClick={() => props.handleDiscoverySettingTestConnection(adapterId, id)}
						title="Test Connection"
						variant="subtle"
						c="gray.8"
					>
						<IconPlugConnected size={20} />
					</ActionIcon>
					<ActionIcon
						disabled={disabled}
						onClick={() => setEditMode((perValue) => !perValue)}
						title="Edit"
						variant="subtle"
						c="gray.8"
					>
						<IconPencil size={20} />
					</ActionIcon>
					<BCPopoverConfirm
						loading={loading}
						onConfirm={() => props.handleDeleteAdapterConfigurations(id)}
						confirmBtnColor="red"
						confirmBtnText="Delete"
						message="Are you sure to delete record ?"
						renderProps={(onToggle) => (
							<ActionIcon disabled={disabled} onClick={onToggle} title="Delete" variant="subtle" c="gray.8">
								<IconX size={20} />
							</ActionIcon>
						)}
					/>
				</Flex>
			</Flex>
		</Card>
	);
};

export default DiscoveryAdapterCard;
