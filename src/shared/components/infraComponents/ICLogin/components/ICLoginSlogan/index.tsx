import { AppLogoWhiteMd } from "@/shared/icons/component/general";
import { Flex, Text, Title } from "@mantine/core";

export default function ICLoginSlogan() {
	return (
		<Flex w={"100%"} h={"100%"} justify={"center"} align={"center"}>
			<Flex
				gap={"xs"}
				direction={"column"}
				w={"70%"}
				justify={"center"}
				align={"center"}
			>
				<AppLogoWhiteMd width={215} height={132.5} />
				<Title order={2} fw={"bold"} c={"white"}>
					Gain visibility into your entire attack surface
				</Title>
				<Text fz={"md"} c={"white"}>
					Continuously discover, monitor, and secure your external assets.
				</Text>
			</Flex>
		</Flex>
	);
}
