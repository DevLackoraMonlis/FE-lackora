import { ActionIcon, Badge, Card, Flex, Text } from "@mantine/core";
import { IconListDetails, IconPencil, IconPlugConnected, IconX } from "@tabler/icons-react";
import { useState } from "react";

import type { EachAdapterConfiguration } from "@/http/generated/models";
import BCPopoverConfirm from "@/shared/components/baseComponents/BCPopoverConfirm";

import DiscoveryAdaptersForm from "../DiscoveryAdaptersForm";

type Props = EachAdapterConfiguration & {
	handleDeleteAdapterConfigurations: VoidFunction;
	handleEditAdapterConfigurations: (configs: Record<string, unknown>) => void;
	loading: boolean;
	adapterId: string;
};

const DiscoveryAdapterCard = (props: Props) => {
	const [editMode, setEditMode] = useState(false);
	return (
		<>
			{editMode ? (
				<DiscoveryAdaptersForm
					adapterId={props.adapterId}
					loading={props.loading}
					config={props.config}
					handleEditAdapterConfigurations={props.handleEditAdapterConfigurations}
					onCancel={() => setEditMode(false)}
				/>
			) : (
				<Card bg="gray.1" w="100%" padding="xs">
					<Flex align="center" justify="space-between">
						<Text fw="bold" fz="sm">
							{`${props.config?.ip} - ${props.config?.connection}`}
						</Text>
						<Flex gap="2xs">
							<Badge variant="light" color={props.is_active ? "green" : "red"} p="sm">
								<Text p="2xs" tt="capitalize">
									{props.is_active ? "Connected" : "Disconnected"}
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
							<ActionIcon
								// onClick={() => form.removeListItem("gateways", index)}
								title="View Results"
								variant="subtle"
								c="gray.8"
							>
								<IconListDetails size={20} />
							</ActionIcon>
							<ActionIcon
								onClick={() => setEditMode((perValue) => !perValue)}
								title="Edit"
								variant="subtle"
								c="gray.8"
							>
								<IconPencil size={20} />
							</ActionIcon>
							<BCPopoverConfirm
								loading={props.loading}
								onConfirm={props.handleDeleteAdapterConfigurations}
								confirmBtnColor="red"
								confirmBtnText="Delete"
								message="Are you shure to delete gateway ?"
								renderProps={(onToggle) => (
									<ActionIcon onClick={onToggle} title="Delete" variant="subtle" c="gray.8">
										<IconX size={20} />
									</ActionIcon>
								)}
							/>
						</Flex>
					</Flex>
				</Card>
			)}
		</>
	);
};

export default DiscoveryAdapterCard;
