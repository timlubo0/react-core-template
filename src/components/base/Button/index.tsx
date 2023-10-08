import {
  MantineSize,
  MantineColor,
  MantineRadius,
  MantineGradient,
  LoaderProps,
  Button as MButton,
  BoxProps,
  ButtonFactory,
  StylesApiProps,
} from "@mantine/core";
import { DOMAttributes } from "react";

export interface ButtonProps extends BoxProps, StylesApiProps<ButtonFactory> {
  "data-disabled"?: boolean;
  size?: MantineSize | `compact-${MantineSize}` | (string & {});
  color?: MantineColor;
  justify?: React.CSSProperties["justifyContent"];
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  fullWidth?: boolean;
  radius?: MantineRadius;
  gradient?: MantineGradient;
  disabled?: boolean;
  children?: React.ReactNode;
  loading?: boolean;
  loaderProps?: LoaderProps;
  type?: "button" | "submit" | "reset"
}

type Props = ButtonProps & (DOMAttributes<HTMLButtonElement> | undefined);

export const Button = (props: Props) => {
  return <MButton {...props} />;
};
