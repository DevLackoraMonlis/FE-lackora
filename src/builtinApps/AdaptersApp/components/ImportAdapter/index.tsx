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
	updateMode?: boolean;
};

function ImportAdapter({ onClose, refetchAdapters, updateMode }: Props) {
	const defaultStatus = updateMode ? AdapterUploadedStatus.Upgrade : AdapterUploadedStatus.None;
	const [status, setStatus] = useState<AdapterUploadedStatus>(defaultStatus);
	const [file, setFile] = useState<FileWithPath | null>(null);
	const [fileInfo, setFileInfo] = useState<{ subTitle: string }>({
		subTitle: "Uploading and Validating ...",
	});

	const { validateAdapterAdp } = useAdapterManagementValidateAdp((updateStatus) => setStatus(updateStatus));
	const { importAdapterAdp } = useAdapterManagementImportAdp();

	const onCancelFile = () => {
		setFile(null);
		setFileInfo({ subTitle: "" });
		setStatus(defaultStatus);
	};
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
						onCancelFile();
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

	const renderUploadComponent = (status: AdapterUploadedStatus) => {
		if (!file) return null;
		const { name: title } = file;
		const { subTitle } = fileInfo;
		switch (status) {
			case AdapterUploadedStatus.Loading:
				return <UploadStatusUploading {...{ title, subTitle, onCancelFile }} />;
			case AdapterUploadedStatus.Validating:
				return <UploadStatusValidating {...{ title, subTitle, onCancelFile }} />;
			case AdapterUploadedStatus.Downgrade:
			case AdapterUploadedStatus.Ready:
			case AdapterUploadedStatus.Exists:
			case AdapterUploadedStatus.Upgrade:
				return <UploadStatusReadyToImport {...{ title, subTitle, onCancelFile, iconType: title, status }} />;
			default:
				return null;
		}
	};
	const uploadStatus = ADAPTER_UPLOADED_STATUS[status] || {};
	return (
		<>
			<Flex pb="3xl" direction="column" gap="md" px="md">
				{(updateMode || status === AdapterUploadedStatus.Upgrade) && (
					<List listStyleType="none">
						{ADAPTER_UPLOADED_DESCRIPTION[AdapterUploadedStatus.Upgrade].map((text) => (
							<List.Item key={text}>{text}</List.Item>
						))}
					</List>
				)}
				<Card bg="gray.1">
					<BCDropzone
						disabled={!!file}
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
				disabled={uploadStatus.disabled || !file}
				loading={importAdapterAdp.isPending}
				applyLabel={updateMode ? "Upgrade" : uploadStatus.buttonText}
				onApply={onApply}
				onCancel={onClose}
			/>
		</>
	);
}

export function ImportAdapterModal({ onClose, opened, ...props }: Props) {
	return (
		<BCModal size="50%" centered title="Import Adapters" onClose={onClose} opened={opened}>
			<ImportAdapter onClose={onClose} opened={opened} {...props} />
		</BCModal>
	);
}

export function UpdateAdapterModal({ onClose, opened, ...props }: Props) {
	return (
		<BCModal size="50%" centered title="Update Adapters" onClose={onClose} opened={opened}>
			<ImportAdapter onClose={onClose} opened={opened} {...props} updateMode />
		</BCModal>
	);
}
