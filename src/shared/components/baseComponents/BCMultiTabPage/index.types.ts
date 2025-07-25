export type BCMultiTabPageActions<PARAMS = unknown> = {
	addNewPage: (pageName: string, params: PARAMS) => void;
};
