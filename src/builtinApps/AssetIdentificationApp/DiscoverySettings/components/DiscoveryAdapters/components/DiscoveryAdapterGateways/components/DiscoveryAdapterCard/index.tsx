import { ActionIcon, Badge, Card, Flex, Text } from "@mantine/core";
import { IconListDetails, IconPencil, IconPlugConnected, IconX } from "@tabler/icons-react";

import type { EachAdapterConfiguration } from "@/http/generated/models";

type Props = EachAdapterConfiguration & {
  handleDeleteAdapterConfigurations: VoidFunction;
};
const DiscoveryAdapterCard = (props: Props) => {
  return (
    <Card
      style={({ colors: { gray }, spacing, other }) => ({
        padding: `${spacing.xs} ${spacing.sm}`,
        width: "100%",
        background: other.darkMode ? gray[7] : gray[1],
      })}
    >
      <Flex align="center" justify="space-between">
        <Text fw="bold" fz="sm">
          {`${props.config?.ip} - ${props.config?.connection}`}
        </Text>
        <Flex gap="2xs">
          <Badge
            variant="light"
            color={props.is_active ? "green" : "red"}
            styles={({ spacing }) => ({ root: { padding: spacing.sm } })}
          >
            <Text p="2xs" tt="capitalize">
              {props.is_active ? "Connected" : "Disconnected"}
            </Text>
          </Badge>
          <ActionIcon
            // onClick={() => form.removeListItem("gateways", index)}
            title="Test Connection"
            className="cursor-pointer"
            variant="subtle"
            styles={({ white, colors: { gray }, other: { darkMode } }) => ({
              icon: { color: darkMode ? white : gray[8] },
            })}
          >
            <IconPlugConnected size={20} />
          </ActionIcon>
          <ActionIcon
            // onClick={() => form.removeListItem("gateways", index)}
            title="View Results"
            className="cursor-pointer"
            variant="subtle"
            styles={({ white, colors: { gray }, other: { darkMode } }) => ({
              icon: { color: darkMode ? white : gray[8] },
            })}
          >
            <IconListDetails size={20} />
          </ActionIcon>
          <ActionIcon
            // onClick={() => form.removeListItem("gateways", index)}
            title="Edit"
            className="cursor-pointer"
            variant="subtle"
            styles={({ white, colors: { gray }, other: { darkMode } }) => ({
              icon: { color: darkMode ? white : gray[8] },
            })}
          >
            <IconPencil size={20} />
          </ActionIcon>
          <ActionIcon
            onClick={props.handleDeleteAdapterConfigurations}
            title="Delete"
            className="cursor-pointer"
            variant="subtle"
            styles={({ white, colors: { gray }, other: { darkMode } }) => ({
              icon: { color: darkMode ? white : gray[8] },
            })}
          >
            <IconX size={20} />
          </ActionIcon>
        </Flex>
      </Flex>
    </Card>
  );
};

export default DiscoveryAdapterCard;
