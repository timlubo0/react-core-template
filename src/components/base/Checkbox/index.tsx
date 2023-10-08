import {
  BoxProps,
  CheckboxFactory,
  ElementProps,
  Checkbox as MCheckbox,
  MantineColor,
  MantineRadius,
  MantineSize,
  StylesApiProps,
} from "@mantine/core";

export interface CheckboxProps
  extends BoxProps,
    StylesApiProps<CheckboxFactory>,
    ElementProps<"input", "size"> {
  id?: string;
  label?: React.ReactNode;
  color?: MantineColor;
  size?: MantineSize | (string & {});
  radius?: MantineRadius;
  wrapperProps?: Record<string, any>;
  labelPosition?: "left" | "right";
  description?: React.ReactNode;
  error?: React.ReactNode;
  indeterminate?: boolean;
  icon?: React.FC<{
    indeterminate: boolean | undefined;
    className: string;
  }>;
  rootRef?: React.ForwardedRef<HTMLDivElement>;
}

export const Checkbox = (props: CheckboxProps) => <MCheckbox {...props} />;
