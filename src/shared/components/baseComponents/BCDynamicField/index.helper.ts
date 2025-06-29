import { isNotEmpty } from "@mantine/form";

import type { ApiFields } from "@/shared/types/index.types";

export const getDynamicFieldValidate = (fields: ApiFields[] = []) => {
	const validateFormObject = fields.reduce(
		(accumulator, { key, type, required }) => {
			switch (type) {
				case "IP":
					accumulator[key] = (value: string) => {
						return value
							? null
							: required
								? isNotEmpty("Filed is required")
								: null;
					};
					break;
				default:
					accumulator[key] = () =>
						required ? isNotEmpty("Filed is required") : null;
					break;
			}
			return accumulator;
		},
		{} as Record<string, unknown>,
	);

	return validateFormObject;
};
