"use client";

import { Button, Flex, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import { useI18n } from "@/locales/client";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";

import UsersList from "./UsersList";

export default function Users() {
	const t = useI18n();
	const { isMd } = useBreakpoint();
	return (
		<Flex direction={"column"} p={"lg"} gap={"xs"}>
			<Flex justify={"space-between"} align={isMd ? "center" : ""} gap={"xs"}>
				<Text size="xl" fz={isMd ? "h3" : ""} fw={"bold"}>
					{t("users.title")}
				</Text>
				<Flex align={"center"} gap={"xs"}>
					<Button variant={"filled"} leftSection={<IconPlus size={15} />} size={isMd ? "sm" : "xs"}>
						{t("users.add")}
					</Button>
				</Flex>
			</Flex>
			<UsersList />
		</Flex>
	);
}
