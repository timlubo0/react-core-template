import {
  BoxMod,
  BoxProps,
  Text as MText,
  MantineColor,
  MantineGradient,
  MantineSize,
  StylesApiProps,
  TextFactory,
} from "@mantine/core";

export interface TextProps extends BoxProps, StylesApiProps<TextFactory> {
  __staticSelector?: string;
  mod?: BoxMod;
  size?: MantineSize | (string & {});
  lineClamp?: number;
  truncate?: "end" | "start" | boolean;
  inline?: boolean;
  inherit?: boolean;
  gradient?: MantineGradient;
  span?: boolean;
  color?: MantineColor;
  children: React.ReactNode;
}

export const Text = (props: TextProps) => <MText {...props} />;
