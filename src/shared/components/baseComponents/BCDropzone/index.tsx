import { Button, Group } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useRef } from "react";

export default function BCDropzone() {
	const openRef = useRef<() => void>(null);

	return (
		<Dropzone openRef={openRef} onDrop={() => {}} w="100%" h="100%">
			<Group justify="center">
				<Button onClick={() => openRef.current?.()} style={{ pointerEvents: "all" }}>
					Select files
				</Button>
			</Group>
		</Dropzone>
	);
}
