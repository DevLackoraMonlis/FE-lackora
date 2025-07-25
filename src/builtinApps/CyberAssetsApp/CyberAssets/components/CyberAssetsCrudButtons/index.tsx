import { Button, Divider, Flex } from "@mantine/core";
import { IconChevronDown, IconPencil, IconTrash } from "@tabler/icons-react";

type Props = {
	onNew: VoidFunction;
	onDelete: VoidFunction;
	onEdit: VoidFunction;
};

export default function CyberAssetsCrudButtons(props: Props) {
	return (
		<Flex gap={"xs"}>
			<Button.Group>
				<Button onClick={props.onNew} color={"main"}>
					New Asset
				</Button>
				<Divider orientation={"vertical"} />
				<Button px={"xs"} color={"main"}>
					<IconChevronDown />
				</Button>
			</Button.Group>
			<Button onClick={props.onEdit} variant={"default"} leftSection={<IconPencil />}>
				Edit
			</Button>
			<Button onClick={props.onDelete} variant={"default"} leftSection={<IconTrash />}>
				Delete
			</Button>
		</Flex>
	);
}
