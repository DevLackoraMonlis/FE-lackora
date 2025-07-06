import type { CreateConnectionType } from "@/builtinApps/ObjectsApp/Connections/index.types";
import { Badge, Button, Flex, Text } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useEffect } from "react";

type Props = {
	type: CreateConnectionType;
	deleteLoading: boolean;
	editIsLoading: boolean;
	id: string;
	selectedConnectionId?: string;
	selectedEditConnectionId?: string;
	setSelectedEditConnectionId: (id?: string) => void;
	setSelectedConnectionId: (id?: string) => void;
	openHttpModal: VoidFunction;
	openSnmpModal: VoidFunction;
	openSshModal: VoidFunction;
	getConnectionDataType?: CreateConnectionType;
};

export default function ConnectionListActionButtons(props: Props) {
	useEffect(() => {
		if (props.getConnectionDataType && props.selectedEditConnectionId && !props.editIsLoading) {
			const editModalMap: Record<CreateConnectionType, VoidFunction> = {
				"HTTP(HTTPS)": props.openHttpModal,
				SNMP: props.openSnmpModal,
				SSH: props.openSshModal,
			};
			if (props.getConnectionDataType === props.type) {
				editModalMap[props.type]();
			}
		}
	}, [props.getConnectionDataType, props.selectedEditConnectionId, props.editIsLoading]);

	return (
		<Flex align="center" gap="xs" px="sm">
			<Badge radius={"xs"} size={"lg"} variant="light" color={"gray"}>
				<Text p="2xs">{props.type}</Text>
			</Badge>
			<Button
				loading={props.editIsLoading && props.selectedEditConnectionId === props.id}
				onClick={(event) => {
					event.stopPropagation();
					props.setSelectedEditConnectionId(props.id);
				}}
				variant={"light"}
				leftSection={<IconPencil />}
			>
				Edit
			</Button>
			<Button
				loading={props.deleteLoading && props.selectedConnectionId === props.id}
				onClick={(event) => {
					event.stopPropagation();
					props.setSelectedConnectionId(props.id);
				}}
				variant={"light"}
				leftSection={<IconTrash />}
			>
				Delete
			</Button>
		</Flex>
	);
}
