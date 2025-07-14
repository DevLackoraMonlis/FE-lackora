import { AdapterUploadedStatus } from "./index.enum";

export const handleGetStatusFromResponse = (subTitle: string) => {
	const status = subTitle?.includes("older")
		? AdapterUploadedStatus.Downgrade
		: subTitle?.includes("exist")
			? AdapterUploadedStatus.Exists
			: AdapterUploadedStatus.Error;

	return status;
};
