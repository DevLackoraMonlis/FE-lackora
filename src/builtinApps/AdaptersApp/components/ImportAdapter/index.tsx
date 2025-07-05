import { Flex } from "@mantine/core";

import BCDropzone from "@/shared/components/baseComponents/BCDropzone";
import BCModal from "@/shared/components/baseComponents/BCModal";

type Props = {
	onClose: VoidFunction;
};

export default function ImportAdapter({ onClose }: Props) {
	const onApply = () => {};
	return (
		<BCModal size="40%" centered title="Import/Update Adapters" onClose={onClose} opened>
			<Flex h="300px" w="100%">
				<BCDropzone />
			</Flex>
			<BCModal.Footer onApply={onApply} onCancel={onClose} applyLabel="Import" />
		</BCModal>
	);
}
