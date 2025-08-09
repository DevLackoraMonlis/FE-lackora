import type {
	ICAdvancedFilterDataRs,
	ICAdvancedFilterProps,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";

export type ModalDefaultProps = {
	opened: boolean;
	onClose: VoidFunction;
};

export type ValueOf<T> = T[keyof T];

export type AddAdvancedFilterNewPageType = Pick<
	ICAdvancedFilterProps<ICAdvancedFilterDataRs>,
	"defaultVariables" | "store"
>;
