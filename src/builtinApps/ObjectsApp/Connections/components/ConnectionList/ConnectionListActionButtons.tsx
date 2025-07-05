import type { CreateConnectionType } from "@/builtinApps/ObjectsApp/Connections/index.types";
import { Badge, Button, Flex, Text } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";

type Props = {
	type: CreateConnectionType;
	loading: boolean;
	id: string;
	selectedConnectionId?: string;
	setSelectedEditConnectionId: (id?: string) => void;
	setSelectedConnectionId: (id?: string) => void;
	openHttpModal: VoidFunction;
	openSnmpModal: VoidFunction;
	openSshModal: VoidFunction;
};

export default function ConnectionListActionButtons(props: Props) {
	return (
		<Flex align="center" gap="xs" px="sm">
			<Badge radius={"xs"} size={"lg"} variant="light" color={"gray"}>
				<Text p="2xs">{props.type}</Text>
			</Badge>
			<Button
				loading={props.loading && props.selectedConnectionId === props.id}
				onClick={(event) => {
					event.stopPropagation();
					props.setSelectedEditConnectionId(props.id);
					const editModalMap: Record<CreateConnectionType, VoidFunction> = {
						"HTTP(HTTPS)": props.openHttpModal,
						SNMP: props.openSnmpModal,
						SSH: props.openSshModal,
					};
					editModalMap[props.type]();
				}}
				variant={"light"}
				leftSection={<IconPencil />}
			>
				Edit
			</Button>
			<Button
				loading={props.loading && props.selectedConnectionId === props.id}
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
