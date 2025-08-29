"use client";

import { Button, Flex, Grid, ScrollArea, Text } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconComet, IconEyeHeart, IconEyeglassFilled, IconGalaxy } from "@tabler/icons-react";
import { IconBrandAirtable, IconMedicineSyrup, IconPlus } from "@tabler/icons-react";

import { useBreakpoint } from "@/shared/hooks/useBreakpoint";

import ServiceSingleCard from "./ServiceCard";
import ServiceFormModal from "./ServiceForm";

export default function Services() {
	const { height } = useViewportSize();
	const { isMd, isSm } = useBreakpoint();
	const [openedForm, handleOpenedForm] = useDisclosure();
	return (
		<>
			<ServiceFormModal opened={openedForm} onClose={handleOpenedForm.close} refetchList={() => {}} />
			{/* UI section */}
			<Flex direction={"column"} p={"lg"} gap={"md"}>
				<Flex justify={"space-between"} align={isMd ? "center" : ""} gap={"xs"}>
					<Text size="xl" fz={isSm ? "h3" : ""} fw={"bold"}>
						Services
					</Text>
					<Flex align={"center"} gap={"xs"}>
						<Button
							leftSection={<IconPlus size={15} />}
							size={isMd ? "sm" : "xs"}
							onClick={handleOpenedForm.open}
						>
							Add Service
						</Button>
					</Flex>
				</Flex>
				{/* <Flex justify={"end"}>
          <BCSearchInput
            onSubmitSearch={() => {}}
            placeholder="Search by service name or description"
            inputWidth={"300px"}
            clientSide
          />
        </Flex> */}
				<ScrollArea h={height - 130} scrollbars="y">
					<Grid pt={"xs"}>
						<Grid.Col span={{ md: 4, lg: 3 }}>
							<ServiceSingleCard
								color="#4dd158"
								title="Pedicure"
								icon={IconMedicineSyrup}
								description={"Build fully functional accessible web applications with ease "}
							/>
						</Grid.Col>
						<Grid.Col span={{ md: 3 }}>
							<ServiceSingleCard
								color="#7950f2"
								title="Eyebrows"
								icon={IconEyeHeart}
								description={"Build fully functional accessible web applications with ease "}
							/>
						</Grid.Col>
						<Grid.Col span={{ md: 3 }}>
							<ServiceSingleCard
								color="#fd7e14"
								title="Eyelashes"
								icon={IconEyeglassFilled}
								description={"Build fully functional accessible web applications with ease "}
							/>
						</Grid.Col>
						<Grid.Col span={{ md: 3 }}>
							<ServiceSingleCard
								color="#228be6"
								title="Cosmetology"
								icon={IconComet}
								description={"Build fully functional accessible web applications with ease "}
							/>
						</Grid.Col>
						<Grid.Col span={{ md: 3 }}>
							<ServiceSingleCard
								color="#fab005"
								title="Waxing"
								icon={IconGalaxy}
								description={"Build fully functional accessible web applications with ease "}
							/>
						</Grid.Col>
						<Grid.Col span={{ md: 3 }}>
							<ServiceSingleCard
								color="#12b886"
								title="Sugaring"
								icon={IconBrandAirtable}
								description={"Build fully functional accessible web applications with ease "}
							/>
						</Grid.Col>
					</Grid>
				</ScrollArea>
			</Flex>
		</>
	);
}
