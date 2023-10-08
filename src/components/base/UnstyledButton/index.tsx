import {
  BoxComponentProps,
  UnstyledButton as MUnstyledButton,
  StylesApiProps,
  UnstyledButtonFactory,
} from "@mantine/core";

export interface UnstyledButtonProps
  extends Omit<BoxComponentProps, "vars" | "variant">,
    StylesApiProps<UnstyledButtonFactory> {
  __staticSelector?: string;
  children: React.ReactNode;
}

export const UnstyledButton = (props: UnstyledButtonProps) => (
  <MUnstyledButton {...props} />
);
