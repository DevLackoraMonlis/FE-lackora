import { createStore } from "zustand";

import type { EachDiscoverySetting } from "@/http/generated/models";
import type {
	BCDynamicFieldObjectType,
	BCDynamicFieldProps,
} from "@/shared/components/baseComponents/BCDynamicField/index.types";

type Store = {
	formFields: { [key: string]: BCDynamicFieldProps[] };
	setFormFields: (results: EachDiscoverySetting[]) => void;
};

export const discoveryAdaptersStore = createStore<Store>((set) => ({
	formFields: {},
	setFormFields: (results: EachDiscoverySetting[]) => {
		const formFields = results?.reduce(
			(accumulator, { id, fields }) => {
				accumulator[id] = fields?.map(({ key, label, required, object_type, options, paginate, type }) => ({
					key,
					label,
					required,
					options,
					paginate,
					type,
					objectType: object_type as BCDynamicFieldObjectType,
				}));
				return accumulator;
			},
			{} as Record<string, BCDynamicFieldProps[]>,
		);

		set({ formFields });
	},
}));
