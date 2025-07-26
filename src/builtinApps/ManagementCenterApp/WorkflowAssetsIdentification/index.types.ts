import type { ReactNode } from "react";

export type WorkflowStatus = "failed" | "completed" | "inprogress" | "idle" | "partial";

export type WorkflowStep = {
	title: string;
	status: WorkflowStatus;
	description?: string;
	assets?: string;
	timeInfo?: string;
	progress?: { value: number; label: string };
	icon: ReactNode;
	color?: string;
};

export type WorkflowAccordionProps = {
	icon: ReactNode;
	type: string;
	status: WorkflowStatus;
	title: string;
	description: { label: string; progress: boolean; value: number };
	steps: WorkflowStep[];
};

export type WorkflowHandles = {
	handleViewMatchedAssets: VoidFunction;
	handleGatewayConfiguration: VoidFunction;
};
