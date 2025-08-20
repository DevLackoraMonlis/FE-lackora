"use client";

import { Button, Flex, Text } from "@mantine/core";
import { IconLocationShare, IconPlus } from "@tabler/icons-react";

import { useI18n } from "@/locales/client";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";

import UsersList from "./PersonnelList";

export default function Personnel() {
	const t = useI18n();
	const { isMd, isSm } = useBreakpoint();
	return (
		<Flex direction={"column"} p={"lg"} gap={"sm"}>
			<Flex
				direction={isSm ? "row" : "column"}
				justify={"space-between"}
				align={isMd ? "center" : ""}
				gap={"xs"}
			>
				<Text size="xl" fz={isSm ? "h3" : ""} fw={"bold"}>
					{t("personnel.title")}
				</Text>
				<Flex align={"center"} gap={"xs"}>
					<Button variant={"filled"} leftSection={<IconPlus size={15} />} size={isMd ? "sm" : "xs"}>
						{t("personnel.add")}
					</Button>
					<Button variant={"outline"} leftSection={<IconLocationShare size={15} />} size={isMd ? "sm" : "xs"}>
						{t("personnel.assign")}
					</Button>
				</Flex>
			</Flex>
			<UsersList />
		</Flex>
	);
}
