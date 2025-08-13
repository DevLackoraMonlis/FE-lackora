import type { EachPolicyManagementPolicyActions } from "@/http/generated/models";
import { upperFirst } from "lodash";

export const triggerActionHumanReadableText = (actions?: EachPolicyManagementPolicyActions) => {
	const displayAction = "Then ";
	const actionText =
		actions
			?.map(({ configurations }) =>
				configurations
					.map((valuesAsArray) => {
						const text =
							valuesAsArray?.map(
								({ key, value }) => `${upperFirst(key)} is ${upperFirst((value || "") as string)}`,
							) || "";
						return `"Set ${text.join(" with ")}"`;
					})
					.join(" And "),
			)
			.join(" ") || "";

	return displayAction + actionText.replaceAll("_data", "");
};
