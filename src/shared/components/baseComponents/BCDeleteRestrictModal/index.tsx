import { Badge, Button, Card, Flex, Text } from "@mantine/core";
import { IconTrashOff } from "@tabler/icons-react";
import type { ReactNode } from "react";

import BCModal from "@/shared/components/baseComponents/BCModal";

type Props = {
	opened: boolean;
	onClose: VoidFunction;
	loading: boolean;
	title: string;
	deleteItemName: string;
	description: ReactNode;
	onOk: VoidFunction;
	size?: number | string;
};

export default function BCDeleteRestrictModal(props: Props) {
	return (
		<BCModal size={props.size || 500} title={props.title} opened={props.opened} onClose={props.onClose}>
			<Flex direction="column" gap="xs" px="xs">
				<Flex gap="sm" align="center" justify="center" pt="sm">
					<Badge variant="light" circle c="gray" bg="gray.1" size="35px">
						<Flex align="center" justify="center">
							<IconTrashOff />
						</Flex>
					</Badge>
					<Text fz="lg" fw="bold">{`${props.deleteItemName} cannot be deleted`}</Text>
				</Flex>
				<Card bg="gray.1" w="100%" mx="auto" py="xs" px="lg">
					{props.description}
				</Card>
			</Flex>
			<Flex gap="sm" className="h-full w-full" p="sm" pt="lg" align="center" justify="flex-end">
				<Button loading={props.loading} onClick={props.onOk}>
					Ok
				</Button>
			</Flex>
		</BCModal>
	);
}
