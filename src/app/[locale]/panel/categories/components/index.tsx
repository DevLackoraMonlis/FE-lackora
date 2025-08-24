"use client";

import { Flex, Grid, Text } from "@mantine/core";

import { useBreakpoint } from "@/shared/hooks/useBreakpoint";

import ServiceSingleCard from "./ServiceCard";

export default function Categories() {
	const { isSm } = useBreakpoint();
	return (
		<>
			<Flex direction={"column"} p={"lg"} gap={"md"}>
				<Text size="xl" fz={isSm ? "h3" : ""} fw={"bold"}>
					Categories
				</Text>
				<Grid>
					<Grid.Col span={{ md: 6, lg: 4 }}>
						<ServiceSingleCard />
					</Grid.Col>
					<Grid.Col span={{ md: 6, lg: 4 }}>
						<ServiceSingleCard />
					</Grid.Col>
					<Grid.Col span={{ md: 6, lg: 4 }}>
						<ServiceSingleCard />
					</Grid.Col>
					<Grid.Col span={{ md: 6, lg: 4 }}>
						<ServiceSingleCard />
					</Grid.Col>
				</Grid>
			</Flex>
		</>
	);
}
