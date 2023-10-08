import {
  ElementProps,
  InputBaseProps,
  PasswordInput as MPasswordInput,
  PasswordInputFactory,
  StylesApiProps,
} from "@mantine/core";

export interface PasswordInputProps
  extends Omit<InputBaseProps, "classNames" | "styles" | "vars">,
    StylesApiProps<PasswordInputFactory>,
    ElementProps<"input", "size"> {
  visibilityToggleIcon?: React.FC<{
    reveal: boolean;
  }>;
  visibilityToggleButtonProps?: Record<string, any>;
  visible?: boolean;
  defaultVisible?: boolean;
  onVisibilityChange?(visible: boolean): void;
}

export const PasswordInput = (props: PasswordInputProps) => (
  <MPasswordInput {...props} />
);
