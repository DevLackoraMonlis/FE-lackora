import { Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { ReactElement, ReactNode } from "react";

export type ICAdvancedFilterGridRowProps = {
	cellRenderValue: ReactNode;
	cellMenu: (visibleParent: boolean) => ReactElement;
	isFormattedCell: boolean;
};

export default function ICAdvancedFilterGridRow(props: ICAdvancedFilterGridRowProps) {
	const [opened, handlers] = useDisclosure(false);

	return (
		<Flex
			px={props.isFormattedCell ? 0 : "xs"}
			justify={"space-between"}
			align={"center"}
			onMouseEnter={handlers.open}
			onMouseLeave={handlers.close}
			pos={"relative"}
			w={"100%"}
			fz={"xs"}
		>
			{props.cellRenderValue || (
				<Text fz={"xs"} fs={"italic"} c={"gray.5"}>
					BLANK
				</Text>
			)}

			<Flex align={"center"} pos={"absolute"} right={0} top={props.isFormattedCell ? 5 : -5}>
				{opened ? props.cellMenu(opened) : null}
			</Flex>
		</Flex>
	);
}
