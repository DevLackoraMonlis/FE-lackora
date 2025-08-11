import type { PolicyEmail } from "@/shared/icons/components/policy";
import type { BCDynamicConfigRs } from "../BCDynamicField/index.types";

export type TriggerActionIcons = typeof PolicyEmail;

export type TriggerActionFormList = Record<string, unknown> & {
	fields?: BCDynamicConfigRs[];
	key?: string;
	actionId?: string;
};

export type TriggerActionForm = Record<string, TriggerActionFormList[]>;
