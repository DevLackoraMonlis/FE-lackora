import { Flex, Text } from "@mantine/core";

export default function ICLoginSlogan() {
	return (
		<Flex w={"100%"} h={"100%"} justify={"center"} align={"center"}>
			<Flex gap={"xs"} direction={"column"} w={"50%"} justify={"flex-start"} align={"flex-start"}>
				<Text c={"white"} fz={"3xl"} fw={"bold"}>
					MonoWatch
				</Text>
				<Text
					style={{
						wordSpacing: "4px",
					}}
					w={"50%"}
					fz={"2xl"}
					c={"white"}
				>
					Gain visibility into your entire attack surface
				</Text>
				<Text fz={"md"} c={"white"}>
					Continuously discover, monitor, and secure your external assets.
				</Text>
			</Flex>
		</Flex>
	);
}
