import {
  MantineSize,
  MantineColor,
  MantineRadius,
  MantineGradient,
  LoaderProps,
  Button as MButton,
} from "@mantine/core";
import { DOMAttributes } from "react";

export interface ButtonProps {
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
}

type Props = ButtonProps & (DOMAttributes<HTMLButtonElement> | undefined);

export const Button = (props: Props) => {
  return <MButton {...props} />;
};
