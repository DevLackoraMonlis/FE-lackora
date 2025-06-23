import type { SessionEnvs } from "@/http/end-points/GeneralService.types";
import { createStore } from "zustand";

export type PanelEnvStoreType = {
	envs: SessionEnvs;
	setEnvs: (envs: SessionEnvs) => void;
};

const envStore = createStore<PanelEnvStoreType>((set) => ({
	envs: { baseUrl: "", wsUrl: "", hostUrl: "" },
	setEnvs: (envs) => set({ envs }),
}));

export default envStore;
