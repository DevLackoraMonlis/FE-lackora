import { ActionIcon, Badge, Card, Flex, Highlight, LoadingOverlay, Text } from "@mantine/core";
import { IconPencil, IconPlugConnected, IconX, IconZoomReset } from "@tabler/icons-react";
import { isObject } from "lodash";
import { useState } from "react";

import type {
	BCDynamicConfigRq,
	BCDynamicFieldRs,
} from "@/shared/components/baseComponents/BCDynamicField/index.types";

import type { ConfigurationRs, DiscoveryAdapterConfigurationRs } from "../../../../index.types";
import DiscoveryAdaptersEditGateway from "../DiscoveryAdaptersEdit";

const highlightNumbers = Array(10)
	.fill(null)
	.map((_, num) => num.toString());

type Props = DiscoveryAdapterConfigurationRs & {
	handleEditAdapterConfigurations: (id: string, configs: BCDynamicConfigRq[], callback: VoidFunction) => void;
	handleDiscoverySettingTestConnection: (adapterId: string, id: string) => void;
	handleDeleteAdapterConfigurations: (configurationData: ConfigurationRs) => void;
	handleDiscoverySettingQuickDiscovery: (configurationData: ConfigurationRs) => void;
	handleDiscoverySettingDiscoveryIPs: (configurationData: ConfigurationRs) => void;
	fields: BCDynamicFieldRs[];
	disabled: boolean;
	loading?: boolean;
	testLoading?: boolean;
};

const DiscoveryAdapterCard = (props: Props) => {
	const [editMode, setEditMode] = useState(false);
	if (editMode) {
		return <DiscoveryAdaptersEditGateway {...{ onCancel: () => setEditMode(false), ...props }} />;
	}

	const configurationIP = props.configs?.find(({ key }) => key === "ip")?.value;
	const adapterName = props.configs?.find(({ key }) => key === "connection")?.value;
	const configurationData = {
		configurationIP: `${isObject(configurationIP) ? configurationIP?.label : ""}`,
		configurationId: props.id,
		adapterName: `${isObject(adapterName) ? adapterName?.label : ""}`,
		adapterId: props.adapterId,
		lastExecutionId: props.lastExecutionId,
	};
	return (
		<Card bg="gray.1" w="100%" padding="xs">
			<LoadingOverlay visible={props.loading} />
			<Flex align="center" justify="space-between">
				<Text fw="bold" fz="sm">
					{props.configs?.map(({ value }) => (isObject(value) ? value?.label : ""))?.join(" - ")}
				</Text>
				<Flex gap="2xs">
					<Flex align="center" gap="2xs">
						<Badge
							w="170px"
							variant="light"
							color="gray"
							tt="capitalize"
							p="sm"
							onClick={() => props.handleDiscoverySettingDiscoveryIPs(configurationData)}
						>
							<Highlight
								className="cursor-pointer"
								highlight={highlightNumbers}
								style={{ textTransform: "capitalize" }}
							>
								{props.lastExecution}
							</Highlight>
						</Badge>
						<Badge w="130px" variant="light" color={props.isActive ? "green" : "red"} p="sm">
							<Text p="2xs" tt="capitalize">
								{props.isActive ? "Connected" : "Disconnected"}
							</Text>
						</Badge>
					</Flex>
					<ActionIcon
						disabled={props.disabled}
						onClick={() => props.handleDiscoverySettingQuickDiscovery(configurationData)}
						title="Quick Discover"
						variant="subtle"
						c="gray.8"
					>
						<IconZoomReset size={20} />
					</ActionIcon>
					<ActionIcon
						disabled={props.disabled}
						loading={props.testLoading}
						onClick={() => props.handleDiscoverySettingTestConnection(props.adapterId, props.id)}
						title="Test Connection"
						variant="subtle"
						c="gray.8"
					>
						<IconPlugConnected size={20} />
					</ActionIcon>
					<ActionIcon
						disabled={props.disabled}
						onClick={() => setEditMode((perValue) => !perValue)}
						title="Edit"
						variant="subtle"
						c="gray.8"
					>
						<IconPencil size={20} />
					</ActionIcon>
					<ActionIcon
						disabled={props.disabled}
						onClick={() => props.handleDeleteAdapterConfigurations(configurationData)}
						title="Delete"
						variant="subtle"
						c="gray.8"
					>
						<IconX size={20} />
					</ActionIcon>
				</Flex>
			</Flex>
		</Card>
	);
};

export default DiscoveryAdapterCard;
