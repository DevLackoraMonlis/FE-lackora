import { Card, Flex } from "@mantine/core";

type Props = {
	name: string;
};

export default function MonoMarketCard(_props: Props) {
	return (
		<Card withBorder shadow={"xs"}>
			<Flex justify={"center"} align={"center"} pos={"relative"}>
				MONO
			</Flex>
		</Card>
	);
}
