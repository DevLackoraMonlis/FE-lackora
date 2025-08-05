import type { Dispatch, SetStateAction } from "react";

type Props = {
	triggerActions: string[];
	setTriggerActions: Dispatch<SetStateAction<string[]>>;
};

const triggerActionGenerator = (type: string, _setTriggerActions: Props["setTriggerActions"]) => {
	switch (type) {
		case "email":
			return null;

		default:
			return null;
	}
};

export default function TriggerActionGenerator({ triggerActions, setTriggerActions }: Props) {
	return triggerActions.map((type) => triggerActionGenerator(type, setTriggerActions));
}
