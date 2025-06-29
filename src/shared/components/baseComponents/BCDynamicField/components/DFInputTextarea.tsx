import { Textarea, type TextareaProps } from "@mantine/core";

const DFInputTextarea = (props: TextareaProps & { name: string }) => {
  return <Textarea key={props.name} {...props} />;
};

export default DFInputTextarea;
