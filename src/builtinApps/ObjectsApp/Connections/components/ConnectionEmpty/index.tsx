import { IconGpsDisconnected } from "@/shared/icons/components";
import { Button, Flex, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

type Props = {
	onCreate: VoidFunction;
};

export default function ConnectionEmpty(props: Props) {
	return (
		<Flex gap={"md"} justify={"center"} align={"center"} direction={"column"} className={"w-full h-full"}>
			<IconGpsDisconnected width={140} height={140} />
			<Text fz={"md"}>No Connection Objects Defined!</Text>
			<Text>
				Start by creating a reusable connection profile to be used across your assets and discovery adapters.
			</Text>
			<Button onClick={props.onCreate} color={"main"} leftSection={<IconPlus />}>
				Create Connection
			</Button>
		</Flex>
	);
}
