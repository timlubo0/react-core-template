import {
  ElementProps,
  InputBaseProps,
  Textarea as MTextarea,
} from "@mantine/core";

export interface TextareaProps
  extends InputBaseProps,
    ElementProps<"textarea", "size"> {
  autosize?: boolean;
  maxRows?: number;
  minRows?: number;
}

export const Textarea = (props: TextareaProps) => <MTextarea {...props} />;
