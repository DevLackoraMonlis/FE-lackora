import { isNumber } from "lodash";
import { NumberInput, Select, TextInput, Textarea } from "@mantine/core";

import type { BCDynamicFieldProps } from "./index.types";
import ListDynamicField from "./components/ListDynamicField";

export function getDynamicField<TObjectType extends string>({
  type = "String",
  label = "",
  options = [],
  required: fieldIsRequired,
  placeholder = "",
  defaultValue,
  formInputProps,
  otherElementOptions = {},
  objectType,
  api,
}: BCDynamicFieldProps<TObjectType>) {
  if (objectType) type = "List";

  const commonOptions = {
    label,
    required: !!fieldIsRequired,
    placeholder,
    defaultValue,
    ...otherElementOptions,
    ...(formInputProps || {}),
  };

  switch (type) {
    case "List":
      return (
        <ListDynamicField<TObjectType>
          {...{
            api,
            objectType,
            ...commonOptions,
          }}
        />
      );
    case "Int64":
      return (
        <NumberInput
          {...{
            options,
            ...commonOptions,
          }}
        />
      );
    case "Boolean":
      return "";
    case "Select": {
      const defaultValueAsString = isNumber(defaultValue) ? `${defaultValue}` : defaultValue;
      return (
        <Select
          {...{
						...commonOptions,
            data: options || [],
            defaultValue: defaultValueAsString,
          }}
        />
      );
    }
    case "Datetime":
      return "";
    case "Textarea":
      return (
        <Textarea
          {...{
            options,
            ...commonOptions,
          }}
        />
      );
    case "IP":
      return (
        <TextInput
          {...{
            options,
            ...commonOptions,
          }}
        />
      );
    default:
      return (
        <TextInput
          {...{
            options,
            ...commonOptions,
          }}
        />
      );
  }
}
