export enum AdapterUploadedStatus {
	Loading = "Loading",
	Validating = "Validating",
	Ready = "Ready to Import",
	Upgrade = "Already exists - Upgrade Version",
	Exists = "Already exists",
	Downgrade = "Cannot import – downgrade not allowed",
	Error = "Unhandled Error",
	None = "",
}
