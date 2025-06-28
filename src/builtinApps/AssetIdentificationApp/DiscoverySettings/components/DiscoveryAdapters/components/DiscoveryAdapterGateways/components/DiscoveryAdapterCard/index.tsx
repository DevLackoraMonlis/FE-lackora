import { useState } from "react";
import { ActionIcon, Badge, Card, Flex, Text } from "@mantine/core";
import { IconListDetails, IconPencil, IconPlugConnected, IconX } from "@tabler/icons-react";

import type { EachAdapterConfiguration } from "@/http/generated/models";

import BCPopoverConfirm from "@/shared/components/baseComponents/BCPopoverConfirm";

import DiscoveryAdaptersForm from "../DiscoveryAdaptersForm";

type Props = EachAdapterConfiguration & {
  handleDeleteAdapterConfigurations: VoidFunction;
  handleEditAdapterConfigurations: (configs: EachAdapterConfiguration["config"]) => void;
  loading: boolean;
};

const DiscoveryAdapterCard = (props: Props) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      {editMode ? (
        <DiscoveryAdaptersForm
          loading={props.loading}
          config={props.config}
          handleEditAdapterConfigurations={props.handleEditAdapterConfigurations}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <Card
          style={({ colors: { gray }, spacing }) => ({
            padding: `${spacing.xs} ${spacing.sm}`,
            width: "100%",
            background: gray[1],
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
                styles={({ colors: { gray } }) => ({
                  icon: { color: gray[8] },
                })}
              >
                <IconPlugConnected size={20} />
              </ActionIcon>
              <ActionIcon
                // onClick={() => form.removeListItem("gateways", index)}
                title="View Results"
                className="cursor-pointer"
                variant="subtle"
                styles={({ colors: { gray } }) => ({
                  icon: { color: gray[8] },
                })}
              >
                <IconListDetails size={20} />
              </ActionIcon>
              <ActionIcon
                onClick={() => setEditMode((perValue) => !perValue)}
                title="Edit"
                className="cursor-pointer"
                variant="subtle"
                styles={({ colors: { gray } }) => ({
                  icon: { color: gray[8] },
                })}
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
                  <ActionIcon
                    onClick={onToggle}
                    title="Delete"
                    className="cursor-pointer"
                    variant="subtle"
                    styles={({ colors: { gray } }) => ({
                      icon: { color: gray[8] },
                    })}
                  >
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
