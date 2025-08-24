"use client";

import { Button, Flex, Grid, ScrollArea, Text } from "@mantine/core";
import { IconComet, IconEyeHeart, IconEyeglassFilled, IconGalaxy } from "@tabler/icons-react";
import { IconBrandAirtable, IconMedicineSyrup, IconPlus } from "@tabler/icons-react";

import { useBreakpoint } from "@/shared/hooks/useBreakpoint";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import ServiceSingleCard from "./ServiceCard";

export default function Services() {
	const { height } = useViewportSize();
	const { isMd, isSm } = useBreakpoint();
	const [openedAssignForm, handleOpenedAssignForm] = useDisclosure();
	return (
		<>
			<Flex direction={"column"} p={"lg"} gap={"md"}>
				<Flex justify={"space-between"} align={isMd ? "center" : ""} gap={"xs"}>
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
				<ScrollArea h={height - 130} scrollbars="y">
					<Grid pt={"2xs"}>
						<Grid.Col span={{ md: 4, lg: 3 }}>
							<ServiceSingleCard
								c="orange"
								title="Pedicure"
								icon={IconMedicineSyrup}
								description={"Build fully functional accessible web applications with ease "}
							/>
						</Grid.Col>
						<Grid.Col span={{ md: 3 }}>
							<ServiceSingleCard
								c="pink"
								title="Eyebrows"
								icon={IconEyeHeart}
								description={"Build fully functional accessible web applications with ease "}
							/>
						</Grid.Col>
						<Grid.Col span={{ md: 3 }}>
							<ServiceSingleCard
								c="blue"
								title="Eyelashes"
								icon={IconEyeglassFilled}
								description={"Build fully functional accessible web applications with ease "}
							/>
						</Grid.Col>
						<Grid.Col span={{ md: 3 }}>
							<ServiceSingleCard
								c="green"
								title="Cosmetology"
								icon={IconComet}
								description={"Build fully functional accessible web applications with ease "}
							/>
						</Grid.Col>
						<Grid.Col span={{ md: 3 }}>
							<ServiceSingleCard
								c="grape"
								title="Sugaring"
								icon={IconBrandAirtable}
								description={"Build fully functional accessible web applications with ease "}
							/>
						</Grid.Col>
						<Grid.Col span={{ md: 3 }}>
							<ServiceSingleCard
								c="lime"
								title="Waxing"
								icon={IconGalaxy}
								description={"Build fully functional accessible web applications with ease "}
							/>
						</Grid.Col>
					</Grid>
				</ScrollArea>
			</Flex>
		</>
	);
}
