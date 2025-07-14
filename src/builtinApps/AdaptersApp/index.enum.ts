export enum AdapterUploadedStatus {
	Ready = "Ready to Import",
	Upgrade = "Already exists - Upgrade Version",
	Exists = "Already exists",
	Downgrade = "Cannot import – downgrade not allowed",
	None = "",
	Validating = "Validating",
	Loading = "Loading",
}
