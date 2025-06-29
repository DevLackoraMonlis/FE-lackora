import { useEffect, type ReactNode } from "react";
import { Fieldset, type FieldsetProps, Flex, type FlexProps } from "@mantine/core";
import { type FormValidateInput, isNotEmpty } from "@mantine/form";

import type { DynamicFiled } from "@/shared/components/baseComponents/BCDynamicField/index.types";
import { getDynamicField } from "@/shared/components/baseComponents/BCDynamicField";

import { DynamicFormProvider, type DynamicFormValues, useDynamicForm } from "./index.form";

type ValidateForm = FormValidateInput<DynamicFormValues>;

type Props = {
  formName: string;
  mode?: "uncontrolled" | "controlled";
  onSubmitForm: (formValues: DynamicFormValues) => void;
  fields: DynamicFiled<DynamicFormValues>[];
  flexProps?: FlexProps;
  fieldsetProps?: FieldsetProps;
  ButtonsSection: ReactNode;
  formInitialValues?: DynamicFormValues;
  formValidate?: ValidateForm;
};

const BCDynamicForm = ({
  formName,
  mode,
  onSubmitForm,
  fields,
  ButtonsSection,
  flexProps,
  fieldsetProps = { variant: "unstyled" },
  formInitialValues,
  formValidate,
}: Props) => {
  const form = useDynamicForm({
    name: formName,
    mode,
    validate:
      formValidate ||
      fields.reduce((accumulator, { name, required }) => {
        // @ts-ignore
        accumulator[name] = required ? isNotEmpty("Filed is required") : null;
        return accumulator;
      }, {} as ValidateForm),
  });

  useEffect(() => {
    if (formInitialValues) {
      form.initialize(formInitialValues);
    }
  }, [formInitialValues]);

  return (
    <DynamicFormProvider form={form}>
      <form onSubmit={form.onSubmit(onSubmitForm)}>
        <Fieldset {...fieldsetProps}>
          <Flex {...flexProps}>
            {fields?.map((item) =>
              getDynamicField<DynamicFormValues>({
                formInputProps: {
                  key: form.key(item.name),
                  ...form.getInputProps(item.name),
                },
                ...item,
              })
            )}
          </Flex>
          {ButtonsSection}
        </Fieldset>
      </form>
    </DynamicFormProvider>
  );
};

export default BCDynamicForm;
