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

export enum CyberAssetClassification {
	SERVER = "SERVER",
	WORK_STATION = "WORK_STATION",
	IP_PRINTER = "IP_PRINTER",
	CAMERA_IP = "CAMERA_IP",
	FIREWALL = "FIREWALL",
	ROUTER = "ROUTER",
	SWITCH = "SWITCH",
	MOBILE = "MOBILE",
	ACCESS_POINT = "ACCESS_POINT",
	UPS = "UPS",
	NVR_DVR = "NVR_DVR",
	STORAGE = "STORAGE",
	PHYSICAL_HOST = "PHYSICAL_HOST",
	IOT = "IOT",
	IP_PHONE = "IP_PHONE",
}

export enum CyberAssetOsType {
	LINUX = "LINUX",
	WINDOWS = "WINDOWS",
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
