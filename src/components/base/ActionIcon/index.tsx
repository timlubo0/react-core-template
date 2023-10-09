import {
  ActionIconFactory,
  BoxProps,
  LoaderProps,
  ActionIcon as MActionIcon,
  MantineColor,
  MantineGradient,
  MantineRadius,
  MantineSize,
  StylesApiProps,
} from "@mantine/core";
import { DOMAttributes } from "react";

export interface ActionIconProps
  extends BoxProps,
    StylesApiProps<ActionIconFactory>,
    DOMAttributes<HTMLButtonElement> {
  __staticSelector?: string;
  loading?: boolean;
  loaderProps?: LoaderProps;
  size?: MantineSize | (string & {}) | number;
  color?: MantineColor;
  radius?: MantineRadius;
  gradient?: MantineGradient;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const ActionIcon = (props: ActionIconProps) => {
  return <MActionIcon {...props} />;
};
