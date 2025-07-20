import { Badge, Button, Flex, Text } from "@mantine/core";
import { IconTrashX } from "@tabler/icons-react";

import BCModal from "@/shared/components/baseComponents/BCModal";

type Props = {
	opened: boolean;
	onClose: VoidFunction;
	loading: boolean;
	onCancel: VoidFunction;
	title: string;
	header: string;
	description: string;
	onDelete: VoidFunction;
};

export default function BCDeleteModal(props: Props) {
	return (
		<BCModal size={500} title={props.title} opened={props.opened} onClose={props.onClose}>
			<Flex gap="sm" h={50} align="center" justify="center">
				<Badge variant="light" circle c="red" bg="red.1" size="30px">
					<IconTrashX />
				</Badge>
				<Text c="red" fz="lg" fw="bold">{`Delete ${props.header}`}</Text>
			</Flex>
			<Text mih={150} px="xl" py="md" h="fit-content" bg="gray.1">
				{props.description}
			</Text>
			<BCModal.EmptyFooter>
				<Flex gap={"sm"} className={"h-full w-full"} px={"sm"} align={"center"} justify={"flex-end"}>
					<Button color={"red"} loading={props.loading} onClick={props.onDelete}>
						Delete
					</Button>
					<Button disabled={props.loading} variant={"default"} onClick={props.onCancel}>
						Cancel
					</Button>
				</Flex>
			</BCModal.EmptyFooter>
		</BCModal>
	);
}
