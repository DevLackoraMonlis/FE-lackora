import { Select, type SelectProps } from "@mantine/core";

const DFSelect = (props: SelectProps) => {
  return <Select key={props.name} {...props} />;
};

export default DFSelect;
