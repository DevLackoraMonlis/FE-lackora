import { Card, Center, Flex, Grid, Pagination, Text } from "@mantine/core";

import BCSearchInput from "@/shared/components/baseComponents/BCSearchInput";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";

import ServiceSingleCard from "../../../ServiceCard";

export default function ActionsGrid() {
	const { isMd } = useBreakpoint();
	return (
		<Card withBorder>
			<Flex direction={"column"} gap={"xs"} px={"lg"}>
				<Card.Section withBorder>
					<Flex justify={isMd ? "space-between" : "center"} align={"center"} p={"xs"}>
						{isMd && (
							<Text fw={"bold"} fz={"lg"}>
								Services
							</Text>
						)}
						<BCSearchInput
							onSubmitSearch={() => {}}
							placeholder="Search by name or description"
							inputWidth="280px"
						/>
					</Flex>
				</Card.Section>
				<Grid pt={"xs"}>
					<Grid.Col span={{ md: 6 }}>
						<ServiceSingleCard
							color="#4dd158"
							title="Pedicure"
							imgSrc=""
							description={"Build fully functional accessible web applications with ease "}
							editable={false}
						/>
					</Grid.Col>
					<Grid.Col span={{ md: 6 }}>
						<ServiceSingleCard
							color="#7950f2"
							title="Eyebrows"
							imgSrc=""
							description={"Build fully functional accessible web applications with ease "}
							editable={false}
						/>
					</Grid.Col>
					<Grid.Col span={{ md: 6 }}>
						<ServiceSingleCard
							color="#fd7e14"
							title="Eyelashes"
							imgSrc=""
							description={"Build fully functional accessible web applications with ease "}
							editable={false}
						/>
					</Grid.Col>
					<Grid.Col span={{ md: 6 }}>
						<ServiceSingleCard
							color="#228be6"
							title="Cosmetology"
							imgSrc=""
							description={"Build fully functional accessible web applications with ease "}
							editable={false}
						/>
					</Grid.Col>
				</Grid>
				<Card.Section withBorder>
					<Center py="sm">
						<Pagination total={10} value={1} onChange={() => {}} withControls={false} />
					</Center>
				</Card.Section>
			</Flex>
		</Card>
	);
}
