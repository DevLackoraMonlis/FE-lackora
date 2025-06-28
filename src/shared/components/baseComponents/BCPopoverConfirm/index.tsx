import { type ReactNode, useState } from "react";
import { Button, Flex, Popover, Text } from "@mantine/core";
import type { DefaultMantineColor, PopoverProps } from "@mantine/core";

type Props = {
  message: string;
  renderProps: (handleCancel: VoidFunction, opened: boolean) => ReactNode;
  onConfirm: VoidFunction;
  popoverProps?: PopoverProps;
  confirmBtnColor?: DefaultMantineColor;
  confirmBtnText?: string;
  cancelBtnText?: string;
  loading?: boolean;
  disabled?: boolean;
};

const defaultPopoverProps = {
  position: "bottom",
  withArrow: true,
  shadow: "xl",
  transitionProps: { duration: 200, transition: "pop" },
};

const BCPopoverConfirm = ({
  renderProps,
  message,
  onConfirm,
  popoverProps = {},
  confirmBtnColor = "primary",
  confirmBtnText = "Accept",
  cancelBtnText = "Cancel",
  loading,
  disabled,
}: Props) => {
  const [opened, setOpened] = useState<boolean>(false);

  const handleToggle = () => {
    setOpened((perValue) => !perValue);
  };

  Object.assign(popoverProps, defaultPopoverProps);
  return (
    <Popover opened={opened} {...popoverProps}>
      <Popover.Target>{renderProps(handleToggle, opened)}</Popover.Target>
      <Popover.Dropdown>
        <Flex justify="center" align="center" direction="column" gap="md">
          <Text>{message}</Text>
          <Flex justify="space-between" align="center" w="100%">
            <Button type="button" onClick={handleToggle} variant="default" disabled={loading}>
              {cancelBtnText}
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              variant="outline"
              color={confirmBtnColor}
              loading={loading}
              disabled={disabled}
            >
              {confirmBtnText}
            </Button>
          </Flex>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};

export default BCPopoverConfirm;
