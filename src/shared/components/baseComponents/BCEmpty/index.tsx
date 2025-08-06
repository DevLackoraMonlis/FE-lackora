import { Flex, LoadingOverlay, Text } from "@mantine/core";
import { IconDatabaseSearch } from "@tabler/icons-react";
import type { ReactNode } from "react";

type Props = { iconSize?: number; title?: string; description?: ReactNode };

export default function BCEmpty({ iconSize = 50, title, description = "" }: Props) {
  return (
    <LoadingOverlay
      visible
      loaderProps={{
        children: (
          <Flex justify="center" align="center" direction="column">
            <Text component="span" c="primary.5">
              <IconDatabaseSearch size={iconSize} />
            </Text>
            <Text component="span" fw="bold" fz="md">
              {title ?? "No date found!"}
            </Text>
            <Text component="span" c="dimmed">
              {description}
            </Text>
          </Flex>
        ),
      }}
      overlayProps={{ blur: 0, bg: "transparent" }}
    />
  );
}
