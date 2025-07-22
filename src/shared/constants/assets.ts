import { AssetsStatus } from "../enums/index.enums";

type AssetStatus = { label: string; color: string; c: string; bg: string };
export const ASSETS_STATUS: Record<AssetsStatus, AssetStatus> = {
	[AssetsStatus.Profiled]: {
		label: "Profiled",
		color: "green",
		c: "green",
		bg: "green.1",
	},
	[AssetsStatus.Unreachable]: {
		label: "Unreachable",
		color: "gray",
		c: "gray",
		bg: "gray.1",
	},
	[AssetsStatus.Defective]: {
		label: "Defective",
		color: "red",
		c: "red",
		bg: "red.1",
	},
	[AssetsStatus.External]: {
		label: "External",
		color: "orange",
		c: "orange",
		bg: "orange.1",
	},
	[AssetsStatus.NoPolicy]: {
		label: "No Policy",
		color: "black",
		c: "black",
		bg: "gray.2",
	},
};
