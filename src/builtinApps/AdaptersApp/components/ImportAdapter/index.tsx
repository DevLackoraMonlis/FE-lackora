import { Card, Flex, List, Text } from "@mantine/core";
import type { FileWithPath } from "@mantine/dropzone";
import { useRef } from "react";

import BCDropzone from "@/shared/components/baseComponents/BCDropzone";
import BCModal from "@/shared/components/baseComponents/BCModal";

import { ADAPTER_UPLOADED_DESCRIPTION, ADAPTER_UPLOADED_STATUS } from "../../index.constants";
import { AdapterUploadedStatus } from "../../index.enum";
import { UploadStatusReadyToImport } from "./components/UploadStatus";

type Props = {
	onClose: VoidFunction;
	opened: boolean;
};

const status: AdapterUploadedStatus = AdapterUploadedStatus.Exists;

function ImportAdapter({ onClose }: Props) {
	const fileRef = useRef<FileWithPath[] | null>(null);
	const onApply = () => {};

	const uploadStatus = ADAPTER_UPLOADED_STATUS[status] || {};
	return (
		<>
			<Flex pb="3xl" direction="column" gap="md" px="md">
				{status === AdapterUploadedStatus.Ready && (
					<List listStyleType="none">
						{ADAPTER_UPLOADED_DESCRIPTION[status].map((text) => (
							<List.Item key={text}>{text}</List.Item>
						))}
					</List>
				)}
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
				<UploadStatusReadyToImport
					title="Cisco NXOS SSH Adapter"
					subTitle="Version 1.2.3"
					iconType="cisco"
					status={status}
				/>
			</Flex>
			<BCModal.Footer
				disabled={uploadStatus.disabled ?? true}
				applyLabel={uploadStatus.buttonText ?? "Import"}
				onApply={onApply}
				onCancel={onClose}
			/>
		</>
	);
}

export default function ImportAdapterModal({ onClose, opened }: Props) {
	return (
		<BCModal size="50%" centered title="Import/Update Adapters" onClose={onClose} opened={opened}>
			<ImportAdapter onClose={onClose} opened={opened} />
		</BCModal>
	);
}
