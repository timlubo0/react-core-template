import {
  AvatarFactory,
  BoxProps,
  Avatar as MAvatar,
  MantineColor,
  MantineGradient,
  MantineRadius,
  MantineSize,
  StylesApiProps,
} from "@mantine/core";

export interface AvatarProps extends BoxProps, StylesApiProps<AvatarFactory> {
  size?: MantineSize | (string & {}) | number;
  radius?: MantineRadius;
  color?: MantineColor;
  gradient?: MantineGradient;
  src?: string | null;
  alt?: string;
  imageProps?: React.ComponentPropsWithoutRef<"img">;
  children?: React.ReactNode;
}

export const Avatar = (props: AvatarProps) => <MAvatar {...props} />;
