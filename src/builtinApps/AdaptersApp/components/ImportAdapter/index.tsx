import { Card, Flex, List, Text } from "@mantine/core";
import type { FileWithPath } from "@mantine/dropzone";
import { useEffect, useState } from "react";

import BCDropzone from "@/shared/components/baseComponents/BCDropzone";
import BCModal from "@/shared/components/baseComponents/BCModal";

import { ADAPTER_UPLOADED_DESCRIPTION, ADAPTER_UPLOADED_STATUS } from "../../index.constants";
import { AdapterUploadedStatus } from "../../index.enum";
import { useAdapterManagementImportAdp, useAdapterManagementValidateAdp } from "../../index.hooks";
import {
	UploadStatusReadyToImport,
	UploadStatusUploading,
	UploadStatusValidating,
} from "./components/UploadStatus";

type Props = {
	onClose: VoidFunction;
	opened: boolean;
	refetchAdapters: VoidFunction;
};

function ImportAdapter({ onClose, refetchAdapters }: Props) {
	const [status, setStatus] = useState<AdapterUploadedStatus>(AdapterUploadedStatus.None);
	const [file, setFile] = useState<FileWithPath | null>(null);
	const [fileInfo, setFileInfo] = useState<{ subTitle: string }>({
		subTitle: "Uploading and Validating ...",
	});

	const { validateAdapterAdp } = useAdapterManagementValidateAdp((updateStatus) => setStatus(updateStatus));
	const { importAdapterAdp } = useAdapterManagementImportAdp();

	const onApply = () => {
		if (file) {
			const data = { file };
			importAdapterAdp.mutate(
				{ data },
				{
					onError(response) {
						setStatus(AdapterUploadedStatus.Exists);
						setFileInfo({ subTitle: response.detail?.join(", ") || "" });
					},
					onSuccess() {
						refetchAdapters();
						setStatus(AdapterUploadedStatus.None);
						setFile(null);
						setFileInfo({ subTitle: "" });
						onClose();
					},
				},
			);
		}
	};
	useEffect(() => {
		if (file) {
			const data = { file };
			validateAdapterAdp.mutate(
				{ data },
				{
					onError(response) {
						setStatus(AdapterUploadedStatus.Downgrade);
						setFileInfo({ subTitle: response.detail?.join(", ") || "" });
					},
					onSuccess(response) {
						setStatus(AdapterUploadedStatus.Ready);
						setFileInfo({ subTitle: response.data?.message || "" });
					},
				},
			);
		}
	}, [file]);

	const uploadStatus = ADAPTER_UPLOADED_STATUS[status] || {};
	const renderUploadComponent = (status: AdapterUploadedStatus) => {
		if (!file) return null;
		const { name: title } = file;
		const { subTitle } = fileInfo;
		switch (status) {
			case AdapterUploadedStatus.Loading:
				return <UploadStatusUploading {...{ title, subTitle }} />;
			case AdapterUploadedStatus.Validating:
				return <UploadStatusValidating {...{ title, subTitle }} />;
			case AdapterUploadedStatus.Downgrade:
			case AdapterUploadedStatus.Ready:
			case AdapterUploadedStatus.Exists:
			case AdapterUploadedStatus.Upgrade:
				return <UploadStatusReadyToImport {...{ title, subTitle, iconType: title, status }} />;
			default:
				return null;
		}
	};
	return (
		<>
			<Flex pb="3xl" direction="column" gap="md" px="md">
				{status === AdapterUploadedStatus.Upgrade && (
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
						customAccept={{
							"application/x-adapter-file": ["audio/adpcm"],
						}}
						maxSize={30}
						onDrop={(files) => setFile(files?.[0])}
					/>
				</Card>
				<Text>Uploaded Adapter</Text>
				{renderUploadComponent(status)}
			</Flex>
			<BCModal.Footer
				disabled={uploadStatus.disabled ?? true}
				loading={importAdapterAdp.isPending}
				applyLabel={uploadStatus.buttonText ?? "Import"}
				onApply={onApply}
				onCancel={onClose}
			/>
		</>
	);
}

export default function ImportAdapterModal({ onClose, opened, ...props }: Props) {
	return (
		<BCModal size="50%" centered title="Import/Update Adapters" onClose={onClose} opened={opened}>
			<ImportAdapter onClose={onClose} opened={opened} {...props} />
		</BCModal>
	);
}
