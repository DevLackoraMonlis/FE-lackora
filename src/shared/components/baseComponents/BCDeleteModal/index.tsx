import { Badge, Button, Card, Flex, Text } from "@mantine/core";
import { IconTrashX } from "@tabler/icons-react";
import type { ReactNode } from "react";

import BCModal from "@/shared/components/baseComponents/BCModal";

type Props = {
	opened: boolean;
	onClose: VoidFunction;
	loading: boolean;
	disabled?: boolean;
	onCancel: VoidFunction;
	title: string;
	header: string;
	description: ReactNode;
	onDelete: VoidFunction;
	size?: number | string;
};

export default function BCDeleteModal(props: Props) {
	return (
		<BCModal size={props.size || 500} title={props.title} opened={props.opened} onClose={props.onClose}>
			<Flex direction="column" gap="xs" px="xs">
				<Flex gap="sm" align="center" justify="center" py="sm">
					<Badge variant="light" circle c="red" bg="red.1" size="30px">
						<Flex align="center" justify="center">
							<IconTrashX />
						</Flex>
					</Badge>
					<Text fz="lg" fw="bold">{`Delete ${props.header}`}</Text>
				</Flex>
				<Card bg="gray.1" w="100%" mx="auto" py="xs" px="lg">
					{props.description}
				</Card>
			</Flex>
			<Flex gap="sm" className="h-full w-full" p="sm" pt="lg" align="center" justify="flex-end">
				<Button color="red" loading={props.loading} onClick={props.onDelete} disabled={props.disabled}>
					Delete
				</Button>
				<Button disabled={props.loading} variant="default" onClick={props.onCancel}>
					Cancel
				</Button>
			</Flex>
		</BCModal>
	);
}
