import { AdapterUploadedStatus } from "./index.enum";

type AdapterValidationResponse = {
	status: boolean;
	type?: "icon_not_found" | "multiple_icon" | "old_version" | null;
	message: string;
};

export function handleGetStatusFromResponse<T extends AdapterValidationResponse>(data?: T) {
	const { type, message = "", status: apiStatus = false } = data || {};

	let apiType = type;
	if (!apiStatus) apiType = null;

	let status: AdapterUploadedStatus;
	let subTitle = "";

	switch (apiType) {
		case "icon_not_found":
			status = AdapterUploadedStatus.Ready;
			subTitle = message;
			break;

		case "multiple_icon":
			status = AdapterUploadedStatus.Exists;
			subTitle = message;
			break;

		case "old_version":
			status = AdapterUploadedStatus.Downgrade;
			subTitle = message;
			break;

		default:
			status = AdapterUploadedStatus.Error;
			subTitle = message || AdapterUploadedStatus.Error;
			break;
	}

	return { status, subTitle, apiStatus };
}
