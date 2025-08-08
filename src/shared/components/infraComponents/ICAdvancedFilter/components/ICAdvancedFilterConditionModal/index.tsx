import ICAdvancedFilterConditionBuilder from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionBuilder";
import type {
	ICAdvancedFilterConditionBuilderCondition,
	ICAdvancedFilterProps,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { useState } from "react";

type Props<T> = {
	store: ICAdvancedFilterProps<T>["store"];
	allColumns: ICAdvancedFilterProps<T>["allColumns"];
};

export default function ICAdvancedFilterConditionModal<T>(props: Props<T>) {
	// const store = useStore(
	// 	props.store,
	// 	useShallow((state) => ({
	// 		variables: state.variables,
	// 		setConditions: state.setConditions,
	// 	})),
	// );

	const [conditions, setConditions] = useState<ICAdvancedFilterConditionBuilderCondition[]>([]);
	return (
		<ICAdvancedFilterConditionBuilder
			onChange={setConditions}
			allColumns={props.allColumns}
			conditions={conditions}
		/>
	);
}
