export enum CyberAssetCriticalityEnum {
	LOW = "low",
	MEDIUM = "medium",
	VERY_HIGH = "very high",
	HIGH = "high",
	CRITICAL = "critical",
}

export enum CyberAssetStatusEnum {
	PROFILED = "profiled",
	UNREACHABLE = "unreachable",
	DEFECTIVE = "defective",
	EXTERNAL = "external",
	GUEST = "guest",
	ASSOCIATED = "associated",
	NO_POLICY = "no policy",
}

export enum CyberAssetClassificationEnum {
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

export enum CyberAssetOsTypeEnum {
	LINUX = "linux",
	WINDOWS = "windows",
}

export enum CyberAssetDiscoveryTypeEnum {
	MANUAL = "manual",
	DISCOVERED = "discovered",
	BY_INVENTORY = "by inventory",
}

export enum CyberAssetStateEnum {
	MANAGEABLE = "manageable",
	UNMANAGEABLE = "unmanageable",
}
