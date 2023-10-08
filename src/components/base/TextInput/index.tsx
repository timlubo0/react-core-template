import {
  ElementProps,
  InputBaseProps,
  TextInput as MTextInput,
} from "@mantine/core";
export interface TextInputProps
  extends InputBaseProps,
    ElementProps<"input", "size"> {}

export const TextInput = (props: TextInputProps) => <MTextInput {...props} />;
