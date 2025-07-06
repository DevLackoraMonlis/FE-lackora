import type {
	CreateConnectionChangeTypeFn,
	CreateConnectionType,
} from "@/builtinApps/ObjectsApp/Connections/index.types";
import { Box, Button, Flex, LoadingOverlay, Text } from "@mantine/core";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
	type: CreateConnectionType;
	onChangeType: CreateConnectionChangeTypeFn;
	loading: boolean;
	isEditMode: boolean;
}>;

export default function ConnectionCreateFormChangeTypeWrapper(props: Props) {
	return (
		<Flex direction={"column"} p={"md"} bg={"white"} pos={"relative"}>
			<LoadingOverlay visible={props.loading} />
			{!props.isEditMode && (
				<Flex align={"center"}>
					<Text fz={"md"} fw={"bold"}>{`${props.type} Connection`}</Text>
					<Button onClick={() => props.onChangeType(props.type)} variant={"transparent"}>
						Change
					</Button>
				</Flex>
			)}
			<Box bg={"gray.1"}>{props.children}</Box>
		</Flex>
	);
}
