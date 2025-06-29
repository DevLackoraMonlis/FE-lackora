import { createFormContext } from "@mantine/form";

export type DynamicFormValues = { [key: string]: unknown };

export const [DynamicFormProvider, useDynamicFormContext, useDynamicForm] =
  createFormContext<DynamicFormValues>();
