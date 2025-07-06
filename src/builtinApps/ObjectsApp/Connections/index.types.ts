export type CreateConnectionTypeItem = {
	name: string;
	description: string;
	onClick: VoidFunction;
	type: CreateConnectionType;
};

export type CreateConnectionType = "SSH" | "SNMP" | "HTTP(HTTPS)";

export type CreateConnectionChangeTypeFn = (type: CreateConnectionType) => void;

export type CreateConnectionModalProps<INITIAL_FROM_VALUES> = {
	opened: boolean;
	id?: string;
	onClose: VoidFunction;
	onChangeType: CreateConnectionChangeTypeFn;
	onTestConnection: (type: CreateConnectionType) => void;
	onSuccess: VoidFunction;
	initialFormValues?: INITIAL_FROM_VALUES;
	loading: boolean;
};

export type CreateConnectionDefaultFormValues<T> = {
	name: string;
	description: string;
} & T;
