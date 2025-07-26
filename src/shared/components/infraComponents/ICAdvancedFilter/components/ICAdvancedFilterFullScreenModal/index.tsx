import BCModal from "@/shared/components/baseComponents/BCModal";
import type { ModalDefaultProps } from "@/shared/types/index.types";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<ModalDefaultProps>;

export default function ICAdvancedFilterFullScreenModal(props: Props) {
	return (
		<BCModal withCloseButton fullScreen opened={props.opened} onClose={props.onClose}>
			{props.children}
		</BCModal>
	);
}
