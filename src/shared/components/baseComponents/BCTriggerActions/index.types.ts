import type { PolicyEmail } from "@/shared/icons/components/policy";

export type TriggerActionIcons = typeof PolicyEmail;

export type TriggerActionFormList = Record<string, unknown>;

export type TriggerActionForm = { [key: string]: TriggerActionFormList[] | unknown };
