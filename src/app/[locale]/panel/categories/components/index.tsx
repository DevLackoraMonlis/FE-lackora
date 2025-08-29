"use client";

import { Flex, Grid, Text } from "@mantine/core";

import { useBreakpoint } from "@/shared/hooks/useBreakpoint";

import { useDisclosure } from "@mantine/hooks";
import ServiceSingleCard from "./ServiceCard";
import ServiceCheckboxModal from "./ServiceCheckboxModal";

export default function Categories() {
	const { isSm } = useBreakpoint();
	const [openedServices, handleOpenedServices] = useDisclosure();

	const handleOpenedService = (_categoryId: string) => {
		handleOpenedServices.open();
	};
	return (
		<>
			<ServiceCheckboxModal opened={openedServices} onClose={handleOpenedServices.close} />
			<Flex direction={"column"} p={"lg"} gap={"md"}>
				<Text size="xl" fz={isSm ? "h3" : ""} fw={"bold"}>
					Categories
				</Text>
				<Grid>
					<Grid.Col span={{ md: 6, lg: 4, "2xl": 3 }}>
						<ServiceSingleCard handleOpenedService={handleOpenedService} />
					</Grid.Col>
					<Grid.Col span={{ md: 6, lg: 4, "2xl": 3 }}>
						<ServiceSingleCard handleOpenedService={handleOpenedService} />
					</Grid.Col>
					<Grid.Col span={{ md: 6, lg: 4, "2xl": 3 }}>
						<ServiceSingleCard handleOpenedService={handleOpenedService} />
					</Grid.Col>
					<Grid.Col span={{ md: 6, lg: 4, "2xl": 3 }}>
						<ServiceSingleCard handleOpenedService={handleOpenedService} />
					</Grid.Col>
				</Grid>
			</Flex>
		</>
	);
}
