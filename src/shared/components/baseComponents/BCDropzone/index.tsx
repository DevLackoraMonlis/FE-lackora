import { Button, Card, Flex, Highlight, Text } from "@mantine/core";
import { Dropzone, type DropzoneProps, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload } from "@tabler/icons-react";
import { useRef } from "react";

type AcceptKeys = keyof typeof MIME_TYPES;

type Props = DropzoneProps & {
	title: string;
	accept: string[] | Array<AcceptKeys>;
	maxSize: number;
};

export default function BCDropzone({ title, maxSize, accept, ...dropzoneProps }: Props) {
	const openRef = useRef<VoidFunction>(null);

	const acceptFiles = accept.join(", ") || "";
	const acceptSize = `${maxSize}mb`;
	return (
		<Card>
			<Flex direction="column" gap="sm" justify="center" align="center">
				<Dropzone
					openRef={openRef}
					w="100%"
					h="100%"
					accept={accept.map((item) => MIME_TYPES[item as AcceptKeys] || item)}
					maxSize={maxSize * 1000 * 1000} // bytes
					{...dropzoneProps}
				>
					<Flex direction="column" gap="xs" justify="center" align="center">
						<IconCloudUpload size={50} />
						<Text fz="h4" fw="bold">{`Upload ${title}`}</Text>
						<Highlight
							c="dimmed"
							w="80%"
							ta="center"
							highlight={[acceptFiles || "", acceptSize]}
						>{`Drag'n'drop file here to upload. We can accept only ${acceptFiles} file that is less than ${maxSize}mb in size.`}</Highlight>
					</Flex>
				</Dropzone>
				<Button mt="-25px" w="250px" onClick={() => openRef.current?.()} style={{ pointerEvents: "all" }}>
					Select File
				</Button>
			</Flex>
		</Card>
	);
}
