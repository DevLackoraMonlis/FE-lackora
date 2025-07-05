export enum CreateConnectionSSHAuthenticationType {
	USER_PASSWORD = "User/Password",
	PUBLIC_PRIVATE_KEY = "Public/Private key",
}

export enum CreateConnectionSNMPVersionType {
	SNMP_V_2_C = "SNMP v2c",
	SNMP_V_3 = "SNMP v3",
}

export enum CreateConnectionHTTPProtocolType {
	HTTP = "HTTP",
	HTTPS = "HTTPS",
}

export enum CreateConnectionSNMPSecurityLdLevelType {
	NO_SECURITY = "No Security",
	AUTHENTICATION_ONLY = "Authentication Only",
	AUTHENTICATION_PRIVACY = "Authentication and Privacy",
}

export enum CreateConnectionSNMPAuthenticationProtocolType {
	MD5 = "MD5",
	SHA = "SHA",
}
export enum CreateConnectionSNMPPrivacyProtocolType {
	AES = "AES",
	DES = "DES",
}
