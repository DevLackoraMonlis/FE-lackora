import { ActionIcon, Badge, Card, Flex, LoadingOverlay, Text } from "@mantine/core";
import { IconPencil, IconPlugConnected, IconX } from "@tabler/icons-react";
import { isObject } from "lodash";
import { useState } from "react";

import type {
	BCDynamicConfigRq,
	BCDynamicFieldRs,
} from "@/shared/components/baseComponents/BCDynamicField/index.types";
import BCPopoverConfirm from "@/shared/components/baseComponents/BCPopoverConfirm";

import type { DiscoveryAdapterConfigurationRs } from "../../../../index.types";
import DiscoveryAdaptersEditGateway from "../DiscoveryAdaptersEdit";

type Props = DiscoveryAdapterConfigurationRs & {
	handleDeleteAdapterConfigurations: VoidFunction;
	handleEditAdapterConfigurations: (configs: BCDynamicConfigRq[]) => void;
	fields: BCDynamicFieldRs[];
	loading: boolean;
};

const DiscoveryAdapterCard = ({ id, configs, isActive, loading, ...props }: Props) => {
	const [editMode, setEditMode] = useState(false);

	if (editMode) {
		return (
			<DiscoveryAdaptersEditGateway
				{...{ id, configs, isActive, loading, ...props }}
				onCancel={() => setEditMode(false)}
			/>
		);
	}

	return (
		<Card bg="gray.1" w="100%" padding="xs">
			<LoadingOverlay visible={loading} />
			<Flex align="center" justify="space-between">
				<Text fw="bold" fz="sm">
					{configs?.map(({ value }) => (isObject(value) ? value?.label : "")).join(" - ")}
				</Text>
				<Flex gap="2xs">
					<Badge variant="light" color={isActive ? "green" : "red"} p="sm">
						<Text p="2xs" tt="capitalize">
							{isActive ? "Connected" : "Disconnected"}
						</Text>
					</Badge>
					<ActionIcon
						// onClick={() => form.removeListItem("gateways", index)}
						title="Test Connection"
						variant="subtle"
						c="gray.8"
					>
						<IconPlugConnected size={20} />
					</ActionIcon>
					{/* <ActionIcon
						onClick={() => form.removeListItem("gateways", index)}
						title="View Results"
						variant="subtle"
						c="gray.8"
					>
						<IconListDetails size={20} />
					</ActionIcon> */}
					<ActionIcon
						onClick={() => setEditMode((perValue) => !perValue)}
						title="Edit"
						variant="subtle"
						c="gray.8"
					>
						<IconPencil size={20} />
					</ActionIcon>
					<BCPopoverConfirm
						loading={loading}
						onConfirm={props.handleDeleteAdapterConfigurations}
						confirmBtnColor="red"
						confirmBtnText="Delete"
						message="Are you sure to delete record ?"
						renderProps={(onToggle) => (
							<ActionIcon onClick={onToggle} title="Delete" variant="subtle" c="gray.8">
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
