import { Flex, Text } from "@mantine/core";

export default function ICLoginSlogan() {
	return (
		<Flex w={"100%"} h={"100%"} justify={"center"} align={"flex-end"} pb={100}>
			<Flex gap={"xs"} direction={"column"} w={"50%"} justify={"flex-start"} align={"flex-start"}>
				<Text c={"white"} fz={"3xl"} fw={"bolder"}>
					Lackora
				</Text>
				<Text
					style={{
						wordSpacing: "10px",
					}}
					w={"80%"}
					fz={"2xl"}
					c={"primary.3"}
					fw={"bolder"}
				>
					Find trusted salons, book fast, and feel confidently beautiful.
				</Text>
				<Text fz={"md"} fw={"bold"} c={"white"}>
					Discover salons, compare options, reserve instantly, and shine confidently today.
				</Text>
			</Flex>
		</Flex>
	);
}
