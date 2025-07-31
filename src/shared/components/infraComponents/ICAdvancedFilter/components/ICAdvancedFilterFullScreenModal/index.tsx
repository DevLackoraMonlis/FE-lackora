import BCModal from "@/shared/components/baseComponents/BCModal";
import type { ModalDefaultProps } from "@/shared/types/index.types";
import type { PropsWithChildren } from "react";

type Props<_T> = PropsWithChildren<ModalDefaultProps> & { title: string };

export default function ICAdvancedFilterFullScreenModal<T>(props: Props<T>) {
	return (
		<BCModal title={props.title} withCloseButton fullScreen opened={props.opened} onClose={props.onClose}>
			{props.children}
		</BCModal>
	);
}
