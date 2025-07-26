export type ModalDefaultProps = {
	opened: boolean;
	onClose: VoidFunction;
};

export type ValueOf<T> = T[keyof T];
