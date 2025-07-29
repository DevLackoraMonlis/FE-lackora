import { IC_ADVANCED_FILTER_BLANK_TEXT } from "@/shared/components/infraComponents/ICAdvancedFilter/index.constants";
import { Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { ReactElement, ReactNode } from "react";

export type ICAdvancedFilterGridRowProps = {
	cellRenderValue: ReactNode;
	cellMenu: (visibleParent: boolean, onClose: VoidFunction) => ReactElement | undefined;
	withPaddingLeft?: boolean;
};

export default function ICAdvancedFilterGridRow(props: ICAdvancedFilterGridRowProps) {
	const [opened, handlers] = useDisclosure(false);

	return (
		<Flex
			pl={props.withPaddingLeft ? "xs" : 0}
			justify={"space-between"}
			align={"center"}
			onMouseEnter={handlers.open}
			onMouseLeave={handlers.close}
			pos={"relative"}
			w={"100%"}
			fz={"xs"}
			h={"100%"}
		>
			{props.cellRenderValue || IC_ADVANCED_FILTER_BLANK_TEXT}

			<Flex align={"center"} pos={"absolute"} right={0} top={1}>
				{opened ? props.cellMenu(opened, handlers.close) : null}
			</Flex>
		</Flex>
	);
}
