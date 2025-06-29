import { isNumber } from "lodash";

import type { DynamicFiled } from "./index.types";

import { Select, TextInput, Textarea, NumberInput } from "@mantine/core";

export function getDynamicField({
  objectType = "none",
  type = "String",
  paginate = false,
  label = "",
  options = [],
  required: fieldIsRequired,
  placeholder = "",
  defaultValue: defaultValueAsUnknown,
  formInputProps,
  otherElementOptions = {},
}: DynamicFiled) {
  const required = !!fieldIsRequired;
  const defaultValue = isNumber(defaultValueAsUnknown) ? `${defaultValueAsUnknown}` : defaultValueAsUnknown;
  switch (objectType) {
    case "connection":
      return (
        <Select
          {...{
            ...otherElementOptions,
            label,
            data: options || [],
            required,
            placeholder,
            defaultValue,
            ...(formInputProps || {}),
          }}
        />
      );
    default:
      switch (type) {
        case "Int64":
          return (
            <NumberInput
              {...{
                ...otherElementOptions,
                label,
                options,
                required,
                placeholder,
                defaultValue,
                ...(formInputProps || {}),
              }}
            />
          );
        case "Boolean":
          return "";
        case "Select":
          const defaultValueAsString = isNumber(defaultValue) ? `${defaultValue}` : defaultValue;
          return (
            <Select
              {...{
                ...otherElementOptions,
                label,
                data: options || [],
                required,
                placeholder,
                defaultValue: defaultValueAsString,
                ...(formInputProps || {}),
              }}
            />
          );
        case "Datetime":
          return "";
        case "Textarea":
          return (
            <Textarea
              {...{
                ...otherElementOptions,
                label,
                options,
                required,
                placeholder,
                defaultValue,
                ...(formInputProps || {}),
              }}
            />
          );
        case "IP":
          return (
            <TextInput
              {...{
                ...otherElementOptions,
                label,
                options,
                required,
                placeholder,
                defaultValue,
                ...(formInputProps || {}),
              }}
            />
          );
        case "String":
        default:
          return (
            <TextInput
              {...{
                ...otherElementOptions,
                label,
                options,
                required,
                placeholder,
                defaultValue,
                ...(formInputProps || {}),
              }}
            />
          );
      }
  }
}
