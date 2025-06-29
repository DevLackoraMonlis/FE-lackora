import { NumberInput, type NumberInputProps } from "@mantine/core";

const DFInputNumber = (props: NumberInputProps) => {
  return <NumberInput key={props.name} {...props} />;
};

export default DFInputNumber;
