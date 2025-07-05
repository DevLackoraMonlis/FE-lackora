import BCModal from "@/shared/components/baseComponents/BCModal";
import { Badge, Box, Button, Flex, Text } from "@mantine/core";
import { IconTrashOff } from "@tabler/icons-react";

type Props = {
	opened: boolean;
	onClose: VoidFunction;
	loading: boolean;
	title: string;
	deleteItemName: string;
	description: string;
	onOk: VoidFunction;
};

export default function BCDeleteRestrictModal(props: Props) {
	return (
		<BCModal size={500} title={props.title} opened={props.opened} onClose={props.onClose}>
			<Flex gap={"sm"} justify={"center"} align={"center"}>
				<Badge variant={"light"} circle size={"30px"}>
					<Flex justify={"center"} align={"center"}>
						<IconTrashOff color={"gray"} />
					</Flex>
				</Badge>
				<Text fz={"lg"} fw={"bold"}>{`${props.deleteItemName} cannot be deleted`}</Text>
			</Flex>

			<Box mih={150} h={"fit-content"} bg={"gray.1"} p={"md"}>
				{props.description}
			</Box>
			<BCModal.EmptyFooter>
				<Flex gap={"sm"} className={"h-full w-full"} px={"sm"} align={"center"} justify={"flex-end"}>
					<Button loading={props.loading} onClick={props.onOk}>
						Ok
					</Button>
				</Flex>
			</BCModal.EmptyFooter>
		</BCModal>
	);
}
