import type {
	CreateConnectionChangeTypeFn,
	CreateConnectionType,
} from "@/builtinApps/ObjectsApp/Connections/components/index.types";
import { Box, Button, Flex, Text } from "@mantine/core";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
	type: CreateConnectionType;
	onChangeType: CreateConnectionChangeTypeFn;
}>;

export default function ConnectionCreateFormChangeTypeWrapper(props: Props) {
	return (
		<Flex direction={"column"} p={"sm"} bg={"white"}>
			<Flex align={"center"}>
				<Text fz={"md"} fw={"bold"}>{`${props.type} Connection`}</Text>
				<Button onClick={() => props.onChangeType(props.type)} variant={"transparent"}>
					Change
				</Button>
			</Flex>
			<Box bg={"gray.1"}>{props.children}</Box>
		</Flex>
	);
}
