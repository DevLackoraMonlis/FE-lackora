export enum CyberAssetCriticality {
	LOW = "low",
	MEDIUM = "medium",
	VERY_HIGH = "very high",
	HIGH = "high",
	CRITICAL = "Critical",
}

export enum CyberAssetStatus {
	PROFILED = "profiled",
	UNREACHABLE = "unreachable",
	DEFECTIVE = "defective",
	EXTERNAL = "external",
	GUEST = "guest",
	ASSOCIATED = "associated",
	NO_POLICY = "no policy",
}

export enum CyberAssetClassification {
	SERVER = "server",
	WORK_STATION = "work_station",
	IP_PRINTER = "IP_PRINTER",
	CAMERA_IP = "camera_ip",
	FIREWALL = "firewall",
	ROUTER = "router",
	SWITCH = "switch",
	MOBILE = "mobile",
	ACCESS_POINT = "access_point",
	UPS = "ups",
	NVR_DVR = "nvr_dvr",
	STORAGE = "storage",
	PHYSICAL_HOST = "physical_host",
	IOT = "iot",
	IP_PHONE = "ip_phone",
}

export enum CyberAssetOsType {
	LINUX = "linux",
	WINDOWS = "windows",
}

export enum CyberAssetDiscoveryType {
	MANUAL = "manual",
	DISCOVERED = "discovered",
	BY_INVENTORY = "by inventory",
}

export enum CyberAssetState {
	MANAGEABLE = "manageable",
	UNMANAGEABLE = "unmanageable",
}
