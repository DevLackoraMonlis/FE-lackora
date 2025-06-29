export type DynamicFiled<InputProps> = {
  type: "Int64" | "String" | "Boolean" | "Datetime" | "Textarea" | "Select" | "IP";
  objectType?: "connection" | "webService" | "none" | string | null
  name: string;
  label: string;
  formInputProps: InputProps;
  placeholder?: string;
  defaultValue?: string | number;
  paginate?: boolean | null;
  required?: boolean;
  options?: { label: string; value: string }[] | null;
  otherElementOptions?: { [key: string]: unknown };
};
