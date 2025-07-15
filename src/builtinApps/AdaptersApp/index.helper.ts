import { AdapterUploadedStatus } from "./index.enum";

type AdapterValidationResponse = {
	status: boolean;
	message: string;
	type?:
		| "exists"
		| "adapter_json_invalid"
		| "upgrade"
		| "ready"
		| "installed"
		| "icon_not_found"
		| "multiple_icon"
		| "old_version"
		| null;
};

export function handleGetStatusFromResponse<T extends AdapterValidationResponse>(data?: T) {
	const { type, message = "", status: apiStatus = false } = data || {};

	let status: AdapterUploadedStatus;
	let subTitle: string;

	switch (type) {
		case "ready":
			status = AdapterUploadedStatus.Ready;
			subTitle = message;
			break;

		case "exists":
			status = AdapterUploadedStatus.Exists;
			subTitle = message;
			break;

		case "upgrade":
			status = AdapterUploadedStatus.Upgrade;
			subTitle = message;
			break;

		case "old_version":
			status = AdapterUploadedStatus.Downgrade;
			subTitle = message;
			break;

		case "adapter_json_invalid":
			status = AdapterUploadedStatus.Invalid;
			subTitle = message;
			break;

		default:
			status = AdapterUploadedStatus.Error;
			subTitle = message || AdapterUploadedStatus.Error;
			break;
	}

	return { status, subTitle, apiStatus };
}
