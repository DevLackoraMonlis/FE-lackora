export type DynamicFiled<InputProps> = {
  type: "Int64" | "String" | "Boolean" | "Datetime" | "Textarea" | "Select" | "IP";
  objectType?: "connection" | "webService" | "none";
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: string | number;
  paginate?: boolean;
  required?: boolean;
  options?: { label: string; value: string }[];
  formInputProps?: InputProps;
  otherElementOptions?: { [key: string]: unknown };
};
