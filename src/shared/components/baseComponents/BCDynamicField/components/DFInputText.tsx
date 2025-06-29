import { TextInput, type TextInputProps } from "@mantine/core";

const DFInputText = (props: TextInputProps & { name: string }) => {
  return <TextInput key={props.name} {...props} />;
};

export default DFInputText;
