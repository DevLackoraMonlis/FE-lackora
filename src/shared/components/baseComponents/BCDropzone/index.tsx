import { Button, Card, Flex, Highlight, Text } from "@mantine/core";
import type { DropzoneProps, FileWithPath } from "@mantine/dropzone";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useRef, useState } from "react";

import { uploadErrorObject } from "./index.constants";

type UploadStatus = keyof typeof uploadErrorObject;
type AcceptKeys = keyof typeof MIME_TYPES;

type Props = DropzoneProps & {
	title: string;
	accept: string[] | Array<AcceptKeys>;
	maxSize: number;
	customAccept?: Record<string, string[]>;
};

export default function BCDropzone({
	title,
	maxSize,
	accept,
	customAccept,
	onDrop,
	...dropzoneProps
}: Props) {
	const ACCEPT_FILES = accept;
	const MAX_SIZE = maxSize * 1000 * 1000; // bytes
	const ACCEPT_FILES_DISPLAY = accept.join(", ") || "";
	const ACCEPT_SIZE_DISPLAY = `${maxSize}mb`;

	const openRef = useRef<VoidFunction>(null);
	const [uploadStatus, setUploadStatus] = useState<UploadStatus>("none");
	const handleOnDrop = (files: FileWithPath[] = []) => {
		const [file] = files;
		if (!file) {
			return setUploadStatus("fileError");
		}
		if (file.size > MAX_SIZE) {
			return setUploadStatus("sizeError");
		}
		const [_, fileAccept] = file.name.split(".");
		if (!ACCEPT_FILES.includes(fileAccept as AcceptKeys)) {
			return setUploadStatus("fileError");
		}
		return onDrop(files);
	};

	const { color, icon, bgColor, title: titleGenerator } = uploadErrorObject[uploadStatus || "none"];
	const Icon = icon;
	return (
		<Card>
			<Flex direction="column" gap="sm" justify="center" align="center">
				<Dropzone
					openRef={openRef}
					w="100%"
					h="100%"
					accept={customAccept || ACCEPT_FILES.map((item) => MIME_TYPES[item as AcceptKeys] || item)}
					maxSize={MAX_SIZE}
					onDrop={handleOnDrop}
					bg={bgColor}
					{...dropzoneProps}
				>
					<Flex direction="column" gap="xs" justify="center" align="center">
						<Icon size={50} color={color} />
						<Text fz="h4" fw="bold">
							{titleGenerator(title, ACCEPT_SIZE_DISPLAY, ACCEPT_FILES_DISPLAY)}
						</Text>
						<Highlight
							c="dimmed"
							w="80%"
							mb="xs"
							ta="center"
							highlight={[ACCEPT_FILES_DISPLAY || "", ACCEPT_SIZE_DISPLAY]}
						>{`Drag'n'drop file here to upload. We can accept only ${ACCEPT_FILES_DISPLAY} file that is less than ${ACCEPT_SIZE_DISPLAY} in size.`}</Highlight>
					</Flex>
				</Dropzone>
				<Button mt="-25px" w="250px" onClick={() => openRef.current?.()} style={{ pointerEvents: "all" }}>
					Select File
				</Button>
			</Flex>
		</Card>
	);
}
