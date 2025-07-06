import { Card, Flex, Text } from "@mantine/core";
import type { FileWithPath } from "@mantine/dropzone";
import { useRef, useState } from "react";

import BCDropzone from "@/shared/components/baseComponents/BCDropzone";
import BCModal from "@/shared/components/baseComponents/BCModal";

import { UploadStatusReadyToImport } from "./components/UploadStatus";

type Props = {
	onClose: VoidFunction;
};

export default function ImportAdapter({ onClose }: Props) {
	const [disabledImport, setDisabledImport] = useState(true);
	const fileRef = useRef<FileWithPath[] | null>(null);
	const onApply = () => {
		setDisabledImport(false);
	};

	return (
		<>
			<Flex pb="3xl" direction="column" gap="md" px="md">
				<Card bg="gray.1">
					<BCDropzone
						title="Adapter"
						accept={[".adp"]}
						maxSize={30}
						onDrop={(files) => {
							fileRef.current = files;
						}}
					/>
				</Card>
				<Text>Uploaded Adapter</Text>
				<UploadStatusReadyToImport />
			</Flex>
			<BCModal.Footer disabled={disabledImport} onApply={onApply} onCancel={onClose} applyLabel="Import" />
		</>
	);
}
