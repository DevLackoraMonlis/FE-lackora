import type { EachActiveApplications } from "@/http/generated/models";
import { createStore } from "zustand";

export type ActiveAppsStoreType = {
	apps: EachActiveApplications[];
	setApps: (envs: EachActiveApplications[]) => void;
};

const activeAppsStore = createStore<ActiveAppsStoreType>((set) => ({
	apps: [],
	setApps: (apps) => set({ apps }),
}));

export default activeAppsStore;
