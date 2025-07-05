export type CreateConnectionTypeItem = {
	name: string;
	description: string;
	onClick: VoidFunction;
	type: CreateConnectionType;
};

export type CreateConnectionType = "SSH" | "SNMP" | "HTTP(HTTPS)";

export type CreateConnectionChangeTypeFn = (type: CreateConnectionType) => void;

export type CreateConnectionModalProps = {
	opened: boolean;
	onClose: VoidFunction;
	onChangeType: CreateConnectionChangeTypeFn;
	onTestConnection: (type: CreateConnectionType) => void;
	onSuccessCreate: VoidFunction;
};

export type CreateConnectionDefaultFormValues<T> = {
	name: string;
	description: string;
} & T;
