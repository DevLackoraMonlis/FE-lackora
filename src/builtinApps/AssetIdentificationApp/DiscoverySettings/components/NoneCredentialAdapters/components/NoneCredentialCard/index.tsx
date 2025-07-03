import { Card, Flex } from "@mantine/core";
import { useState } from "react";

import type {
	DiscoveryAdapterConfiguration,
	DiscoveryAdapterConfigurationRs,
	DiscoveryAdaptersField,
} from "../../../../index.types";

import NoneCredentialEditForm from "../NoneCredentialEdit";

type Props = DiscoveryAdapterConfigurationRs & {
	handleDeleteAdapterConfigurations: VoidFunction;
	handleEditAdapterConfigurations: (configs: DiscoveryAdapterConfiguration[]) => void;
	fields: DiscoveryAdaptersField[];
	loading: boolean;
};

const NoneCredentialAdaptersCard = ({ id, configs, isActive, ...props }: Props) => {
	const [editMode, setEditMode] = useState(false);

	if (editMode) {
		return (
			<NoneCredentialEditForm {...{ id, configs, isActive, ...props }} onCancel={() => setEditMode(false)} />
		);
	}
	return (
		<Card bg="gray.1" w="100%" padding="xs">
			<Flex align="center" justify="space-between">
				show List
				{/* <Text fw="bold" fz="sm">
          {configs?.map(({ value }) => value || "").join(" - ")}
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
            </Flex>
          /> */}
			</Flex>
		</Card>
	);
};

export default NoneCredentialAdaptersCard;
