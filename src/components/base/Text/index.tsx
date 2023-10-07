import {
  BoxMod,
  Text as MText,
  MantineColor,
  MantineGradient,
  MantineSize,
} from "@mantine/core";

export interface TextProps {
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
