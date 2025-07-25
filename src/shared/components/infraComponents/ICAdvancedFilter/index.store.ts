import { getDefaultICAdvancedStore } from "@/shared/components/infraComponents/ICAdvancedFilter/index.helper";
import type { ICAdvancedFilterStoreType } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { createStore } from "zustand";

export function createDynamicICAdvancedStore(defaultVariables?: ICAdvancedFilterStoreType["variables"]) {
	return createStore<ICAdvancedFilterStoreType>((set) =>
		getDefaultICAdvancedStore({ set, defaultVariables }),
	);
}
