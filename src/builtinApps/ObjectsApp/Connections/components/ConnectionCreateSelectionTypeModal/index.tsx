import ConnectionIconWrapper from "@/builtinApps/ObjectsApp/Connections/components/ConnectionIconWrapper";
import type { CreateConnectionTypeItem } from "@/builtinApps/ObjectsApp/Connections/index.types";
import BCModal from "@/shared/components/baseComponents/BCModal";
import { useConnectionIcon } from "@/shared/icons/hooks/useConnectionIcon";
import { Flex, NavLink, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

type Props = {
	opened: boolean;
	onClose: VoidFunction;
	items: CreateConnectionTypeItem[];
	onBeforeClick: VoidFunction;
};

export default function ConnectionCreateSelectionTypeModal(props: Props) {
	const { getConnectionIcon } = useConnectionIcon();

	return (
		<BCModal
			yOffset={200}
			title={"Select Connection Type"}
			size={600}
			opened={props.opened}
			onClose={props.onClose}
		>
			<Flex direction={"column"} w={"100%"} gap={"sm"} p={"lg"}>
				{props.items.map((item) => (
					<NavLink
						key={item.name}
						bg={"gray.2"}
						onClick={() => {
							props.onBeforeClick();
							item.onClick();
						}}
						leftSection={
							<Flex gap={"xs"}>
								<ConnectionIconWrapper>{getConnectionIcon("ssh")}</ConnectionIconWrapper>
								<Flex direction={"column"}>
									<Text fw={"bold"} fz={"md"}>
										{item.name}
									</Text>
									<Text c={"gray.5"} fz={"sm"}>
										{item.description}
									</Text>
								</Flex>
							</Flex>
						}
						rightSection={<IconChevronRight />}
					/>
				))}
			</Flex>
		</BCModal>
	);
}
