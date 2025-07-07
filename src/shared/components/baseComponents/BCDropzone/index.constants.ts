import { IconCloudUpload, IconX } from "@tabler/icons-react";

export const uploadErrorObject = {
	none: {
		icon: IconCloudUpload,
		color: "black",
		bgColor: "",
		title: (title: string, _maxSize: string, _acceptFiles: string) => `Upload ${title}`,
	},
	fileError: {
		icon: IconCloudUpload,
		color: "blue",
		bgColor: "blue.1",
		title: (_t: string, _maxSize: string, _acceptFiles: string) => "Drop File Here",
	},
	sizeError: {
		icon: IconX,
		color: "red",
		bgColor: "red.1",
		title: (_t: string, maxSize: string, acceptFiles: string) => `${acceptFiles} File Less Than ${maxSize}`,
	},
	acceptError: {
		icon: IconX,
		color: "red",
		bgColor: "red.1",
		title: (_t: string, _maxSize: string, acceptFiles: string) => `Only upload ${acceptFiles} File(s)`,
	},
};
