"use client";

import { Button, Flex, Text } from "@mantine/core";

import { useI18n } from "@/locales/client";

import { IconPlus } from "@tabler/icons-react";
import UsersList from "./UsersList";

export default function Users() {
	const t = useI18n();
	return (
		<Flex direction={"column"} p={"lg"} gap={"xs"}>
			<Flex justify={"space-between"} align={"center"}>
				<Text fz={"h3"} fw={"bold"}>
					{t("users.title")}
				</Text>
				<Flex align={"center"} gap={"xs"}>
					<Button variant={"filled"} leftSection={<IconPlus size={15} />}>
						{t("users.add")}
					</Button>
					<Button variant={"outline"}>Button</Button>
				</Flex>
			</Flex>
			<UsersList />
		</Flex>
	);
}
