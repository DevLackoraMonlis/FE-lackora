export type CreateConnectionTypeItem = {
	name: string;
	description: string;
	onClick: VoidFunction;
	type: CreateConnectionType;
};

export type CreateConnectionType = "SSH" | "SNMP" | "HTTP(HTTPS)";

export type CreateConnectionChangeTypeFn = (type: CreateConnectionType) => void;
