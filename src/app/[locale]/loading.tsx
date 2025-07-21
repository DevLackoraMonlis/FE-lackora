import { Flex, Loader } from "@mantine/core";

export default function Loading() {
	return (
		<Flex w={"100%"} h={"100%"} align={"center"} justify={"center"}>
			<Loader size={100} />
		</Flex>
	);
}
