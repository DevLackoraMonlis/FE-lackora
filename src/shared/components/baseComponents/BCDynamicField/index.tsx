import { isNumber } from "lodash";

import type { DynamicFiled } from "./index.types";

import DFInputNumber from "./components/DFInputNumber";
import DFInputText from "./components/DFInputText";
import DFInputTextarea from "./components/DFInputTextarea";
import DFSelect from "./components/DFSelect";

export function getDynamicField<InputProps>({
  objectType,
  type,
  paginate = false,
  name,
  label,
  options,
  required,
  placeholder,
  defaultValue,
  formInputProps,
  otherElementOptions = {},
}: DynamicFiled<InputProps>) {
  switch (objectType) {
    case "connection":
      return null;
    case "webService":
      return null;
    default:
      switch (type) {
        case "Int64":
          return (
            <DFInputNumber
              {...{
                ...otherElementOptions,
                name,
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
          return (
            <DFInputText
              {...{
                ...otherElementOptions,
                name,
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
            <DFSelect
              {...{
                ...otherElementOptions,
                name,
                label,
                data: options,
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
            <DFInputTextarea
              {...{
                ...otherElementOptions,
                name,
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
          return "";
        default:
          return null;
      }
  }
}
