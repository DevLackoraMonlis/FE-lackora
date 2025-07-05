import BCModal from "@/shared/components/baseComponents/BCModal";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
	opened: boolean;
	onClose: VoidFunction;
	isEditMode: boolean;
}>;

export default function ConnectionCreateDefaultModal(props: Props) {
	return (
		<BCModal
			closeOnClickOutside={false}
			closeOnEscape={false}
			withCloseButton={false}
			size={650}
			opened={props.opened}
			onClose={props.onClose}
			title={props.isEditMode ? "Edit Connection" : "Create New Connection"}
		>
			{props.children}
		</BCModal>
	);
}
