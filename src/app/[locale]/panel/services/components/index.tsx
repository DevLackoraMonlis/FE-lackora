"use client";

import { Button, Flex, Grid, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import { useBreakpoint } from "@/shared/hooks/useBreakpoint";
import { useDisclosure } from "@mantine/hooks";
import ServiceSingleCard from "./ServiceCard";

export default function Services() {
	const { isMd, isSm } = useBreakpoint();
	const [openedAssignForm, handleOpenedAssignForm] = useDisclosure();
	return (
		<>
			<Flex direction={"column"} p={"lg"} gap={"sm"}>
				<Flex
					direction={isSm ? "row" : "column"}
					justify={"space-between"}
					align={isMd ? "center" : ""}
					gap={"xs"}
				>
					<Text size="xl" fz={isSm ? "h3" : ""} fw={"bold"}>
						Services
					</Text>
					<Flex align={"center"} gap={"xs"}>
						<Button
							leftSection={<IconPlus size={15} />}
							size={isMd ? "sm" : "xs"}
							onClick={handleOpenedAssignForm.open}
							disabled={openedAssignForm}
						>
							Add Service
						</Button>
					</Flex>
				</Flex>
				<Grid>
					<Grid.Col span={{ md: 4 }}>
						<ServiceSingleCard />
					</Grid.Col>
					<Grid.Col span={{ md: 4 }}>
						<ServiceSingleCard />
					</Grid.Col>
					<Grid.Col span={{ md: 4 }}>
						<ServiceSingleCard />
					</Grid.Col>
					<Grid.Col span={{ md: 4 }}>
						<ServiceSingleCard />
					</Grid.Col>
				</Grid>
			</Flex>
		</>
	);
}
