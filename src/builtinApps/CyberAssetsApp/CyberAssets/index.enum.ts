export enum CyberAssetCriticality {
	LOW = "LOW",
	MEDIUM = "MEDIUM",
	VERY_HIGH = "VERY HIGH",
	HIGH = "HIGH",
}

export enum CyberAssetStatus {
	PROFILED = "PROFILED",
	UNREACHABLE = "UNREACHABLE",
	DEFECTIVE = "DEFECTIVE",
	EXTERNAL = "EXTERNAL",
	GUEST = "GUEST",
	ASSOCIATED = "ASSOCIATED",
	NO_POLICY = "NO POLICY",
}

export enum CyberAssetDiscoveryType {
	MANUAL = "Manual",
	DISCOVERED = "Discovered",
	BY_INVENTORY = "By Inventory",
}

export enum CyberAssetState {
	MANAGEABLE = "MANAGEABLE",
	UNMANAGEABLE = "UNMANAGEABLE",
}
