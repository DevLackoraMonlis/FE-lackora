export enum ICAdvancedGroupByFunctions {
	SUM = "SUM",
	COUNT = "COUNT",
	COUNT_DISTINCT = "COUNTDISTINCT", // COUNT (DISTINCT columnName)
	MIN = "MIN",
	MAX = "MAX",
	AVG = "AVG",
}

export enum ICAdvancedFilterCriticality {
	LOW = "LOW",
	MEDIUM = "MEDIUM",
	VERY_HIGH = "VERY HIGH",
	HIGH = "HIGH",
}

export enum ICAdvancedFilterStatus {
	PROFILED = "PROFILED",
	UNREACHABLE = "UNREACHABLE",
	DEFECTIVE = "DEFECTIVE",
	EXTERNAL = "EXTERNAL",
	GUEST = "GUEST",
	ASSOCIATED = "ASSOCIATED",
}

export enum ICAdvancedFilterDiscoveryType {
	MANUAL = "Manual",
	DISCOVERED = "Discovered",
	BY_INVENTORY = "By Inventory",
}

export enum ICAdvancedFilterState {
	MANAGEABLE = "MANAGEABLE",
	UNMANAGEABLE = "UNMANAGEABLE",
}
