import { Flex, Loader } from "@mantine/core";

export default function Loading() {
	return (
		<Flex
			styles={{
				root: {
					width: "100%",
					height: "100%",
				},
			}}
			align={"center"}
			justify={"center"}
		>
			<Loader size={100} />
		</Flex>
	);
}
