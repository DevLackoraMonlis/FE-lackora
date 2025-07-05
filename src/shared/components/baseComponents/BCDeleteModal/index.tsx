import BCModal from "@/shared/components/baseComponents/BCModal";
import { Badge, Box, Button, Flex, Text } from "@mantine/core";
import { IconTrashX } from "@tabler/icons-react";

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
			<Flex gap={"sm"} h={50} align={"center"} justify={"center"}>
				<Badge variant={"light"} circle size={"30px"}>
					<Flex justify={"center"} align={"center"}>
						<IconTrashX color={"red"} />
					</Flex>
				</Badge>
				<Text fz={"lg"} fw={"bold"}>{`Delete ${props.header}`}</Text>
			</Flex>

			<Box mih={150} h={"fit-content"} bg={"gray.1"} p={"md"}>
				{props.description}
			</Box>
			<BCModal.EmptyFooter>
				<Flex gap={"sm"} className={"h-full w-full"} px={"sm"} align={"center"} justify={"flex-end"}>
					<Button color={"red"} loading={props.loading} onClick={props.onDelete}>
						Delete
					</Button>
					<Button loading={props.loading} variant={"default"} onClick={props.onCancel}>
						Cancel
					</Button>
				</Flex>
			</BCModal.EmptyFooter>
		</BCModal>
	);
}
