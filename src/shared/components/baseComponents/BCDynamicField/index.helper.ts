import type { BCDynamicFieldProps } from "@/shared/components/baseComponents/BCDynamicField/index.types";
import { isNotEmpty } from "@mantine/form";

export const getDynamicFieldValidate = (
	fields: Pick<BCDynamicFieldProps, "key" | "type" | "required">[] = [],
) => {
	return fields.reduce(
		(accumulator, { key, type, required }) => {
			switch (type) {
				case "IP":
					accumulator[key] = (value: string) => {
						return value ? null : required ? isNotEmpty("Filed is required") : null;
					};
					break;
				default:
					accumulator[key] = () => (required ? isNotEmpty("Filed is required") : null);
					break;
			}
			return accumulator;
		},
		{} as Record<string, unknown>,
	);
};
