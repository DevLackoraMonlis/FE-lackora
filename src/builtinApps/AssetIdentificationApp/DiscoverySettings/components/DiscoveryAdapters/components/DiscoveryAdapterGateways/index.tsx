import { ActionIcon, Badge, Card, Flex, Text } from "@mantine/core";
import { IconListDetails, IconPencil, IconPlugConnected, IconX } from "@tabler/icons-react";

import DiscoveryAdaptersForm from "./components/DiscoveryAdaptersForm";

const DiscoveryAdapterGateways = ({ is_used = true }) => {
  return (
    <>
      <Flex gap="xs">
        <Card
          style={({ colors: { gray }, spacing, other }) => ({
            padding: `${spacing.xs} ${spacing.sm}`,
            width: "100%",
            background: other.darkMode ? gray[7] : gray[1],
          })}
        >
          <Flex align="center" justify="space-between">
            <Text fw="bold" fz="sm">
              192.168.1.1 - Connection Name
            </Text>
            <Flex gap="2xs">
              <Badge
                variant="light"
                color={is_used ? "green" : "red"}
                styles={({ spacing }) => ({ root: { padding: spacing.sm } })}
              >
                <Text p="2xs" tt="capitalize">
                  {is_used ? "Connected" : "Disconnected"}
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
                // onClick={() => form.removeListItem("gateways", index)}
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
      </Flex>
      <DiscoveryAdaptersForm />
    </>
  );
};

export default DiscoveryAdapterGateways;
