import { Card, Flex, List, Text } from "@mantine/core";
import type { FileWithPath } from "@mantine/dropzone";
import { useEffect, useState } from "react";

import type { CustomError } from "@/http/end-points/GeneralService.types";
import BCDropzone from "@/shared/components/baseComponents/BCDropzone";
import BCModal from "@/shared/components/baseComponents/BCModal";
import { getErrorMessage } from "@/shared/lib/utils";

import { ADAPTER_UPLOADED_DESCRIPTION, ADAPTER_UPLOADED_STATUS } from "../../index.constants";
import { AdapterUploadedStatus } from "../../index.enum";
import { handleGetStatusFromResponse } from "../../index.helper";
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
	const [fileInfo, setFileInfo] = useState<{ subTitle: string; iconPath: string }>({
		subTitle: "Uploading and Validating ...",
		iconPath: "",
	});

	const { validateAdapterAdp } = useAdapterManagementValidateAdp((updateStatus) => setStatus(updateStatus));
	const { importAdapterAdp } = useAdapterManagementImportAdp();

	const onCancelFile = () => {
		setFile(null);
		setFileInfo({ subTitle: "", iconPath: "" });
		setStatus(defaultStatus);
	};
	const onApply = () => {
		if (file) {
			const data = { file };
			importAdapterAdp.mutate(
				{ data },
				{
					onError(error) {
						const err = error as CustomError;
						const subTitle = getErrorMessage(err) || "";
						const { status, iconPath } = handleGetStatusFromResponse();
						setStatus(status);
						setFileInfo({ subTitle, iconPath });
					},
					onSuccess(response) {
						const data = response?.data;
						const { status, subTitle, iconPath, apiStatus } = handleGetStatusFromResponse<typeof data>(data);
						if (apiStatus) {
							refetchAdapters();
							onCancelFile();
							onClose();
						} else {
							setStatus(status);
							setFileInfo({ subTitle, iconPath });
						}
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
					onError(error) {
						const err = error as CustomError;
						const subTitle = getErrorMessage(err) || "";
						const { status } = handleGetStatusFromResponse();
						setStatus(status);
						setFileInfo({ subTitle, iconPath: "" });
					},
					onSuccess(response) {
						const data = response?.data;
						const { status, subTitle, iconPath } = handleGetStatusFromResponse<typeof data>(data);
						setStatus(status);
						setFileInfo({ subTitle, iconPath });
					},
				},
			);
		}
	}, [file]);

	const renderUploadComponent = (status: AdapterUploadedStatus) => {
		if (!file) return null;
		const { name: title } = file;
		const { subTitle, iconPath } = fileInfo;
		switch (status) {
			case AdapterUploadedStatus.Loading:
				return <UploadStatusUploading {...{ title, subTitle, onCancelFile }} />;
			case AdapterUploadedStatus.Validating:
				return <UploadStatusValidating {...{ title, subTitle, onCancelFile }} />;
			case AdapterUploadedStatus.Downgrade:
			case AdapterUploadedStatus.Ready:
			case AdapterUploadedStatus.Exists:
			case AdapterUploadedStatus.Upgrade:
				return <UploadStatusReadyToImport {...{ title, subTitle, onCancelFile, iconPath, status }} />;
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
						maxSizeMb={30}
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
