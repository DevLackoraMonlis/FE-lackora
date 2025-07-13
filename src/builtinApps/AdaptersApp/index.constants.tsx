import { IconCancel, IconCheck, IconInfoCircle } from "@tabler/icons-react";

import { AdapterUploadedStatus } from "./index.enum";

export const ADAPTER_UPLOADED_STATUS = {
	[AdapterUploadedStatus.Ready]: {
		badgeText: AdapterUploadedStatus.Ready,
		icon: IconCheck,
		color: "green",
		disabled: false,
		buttonText: "Import",
		alertTitle: "",
		alertDescription: "",
	},
	[AdapterUploadedStatus.Upgrade]: {
		badgeText: AdapterUploadedStatus.Upgrade,
		icon: IconInfoCircle,
		color: "blue",
		disabled: false,
		buttonText: "Upgrade",
		alertTitle: "Adapter already exists. No changes made!",
		alertDescription:
			"The uploaded adapter is identical to the current version and does not require import. If you still want to re-import, please remove the existing adapter first.",
	},
	[AdapterUploadedStatus.Exists]: {
		badgeText: AdapterUploadedStatus.Exists,
		icon: IconInfoCircle,
		color: "yellow",
		disabled: true,
		buttonText: "Import",
		alertTitle: "Adapter already exists. No changes made!",
		alertDescription:
			"The uploaded adapter is identical to the current version and does not require import. If you still want to re-import, please remove the existing adapter first.",
	},
	[AdapterUploadedStatus.Downgrade]: {
		badgeText: AdapterUploadedStatus.Downgrade,
		icon: IconCancel,
		color: "red",
		disabled: true,
		buttonText: "Import",
		alertTitle: "Downgrade not allowed!",
		alertDescription:
			"The uploaded adapter version is older than the currently installed version. Downgrading is not allowed to ensure system stability. Please upload a newer version.",
	},
	[AdapterUploadedStatus.None]: {
		badgeText: AdapterUploadedStatus.None,
		icon: "",
		color: "",
		disabled: true,
		buttonText: "",
		alertTitle: "",
		alertDescription: "",
	},
	[AdapterUploadedStatus.Loading]: {
		badgeText: AdapterUploadedStatus.Loading,
		icon: "",
		color: "",
		disabled: true,
		buttonText: "",
		alertTitle: "",
		alertDescription: "",
	},
	[AdapterUploadedStatus.Validating]: {
		badgeText: AdapterUploadedStatus.Validating,
		icon: "",
		color: "",
		disabled: true,
		buttonText: "",
		alertTitle: "",
		alertDescription: "",
	},
};

export const ADAPTER_UPLOADED_DESCRIPTION = {
	[AdapterUploadedStatus.Upgrade]: [
		"Upload a new version of the adapter. We’ll check the version of the uploaded file:",
		"If it’s newer → we’ll update the current adapter",
		"If it’s the same → nothing changes",
		"If it’s older → update won’t be allowed",
	],
};
