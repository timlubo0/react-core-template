import {
  BadgeFactory,
  BoxProps,
  Badge as MBadge,
  MantineColor,
  MantineGradient,
  MantineRadius,
  MantineSize,
  StylesApiProps,
} from "@mantine/core";

export interface BadgeProps extends BoxProps, StylesApiProps<BadgeFactory> {
  size?: MantineSize | (string & {});
  radius?: MantineRadius;
  color?: MantineColor;
  gradient?: MantineGradient;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export const Badge = (props: BadgeProps) => <MBadge {...props} />;
