export type AdaptersFilters = Record<string, unknown> & {
	search?: string | null;
};

export type DeleteDependencyAdapters = {
	disabledDeletion: boolean;
	message: string;
	status: boolean;
	total: number;
	results?: unknown;
};
