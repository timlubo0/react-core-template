import {
  BoxProps,
  ElementProps,
  ThemeIcon as MThemeIcon,
  MantineColor,
  MantineGradient,
  MantineRadius,
  MantineSize,
  StylesApiProps,
  ThemeIconFactory,
} from "@mantine/core";

export interface ThemeIconProps
  extends BoxProps,
    StylesApiProps<ThemeIconFactory>,
    ElementProps<"div"> {
  size?: MantineSize | (string & {}) | number;
  color?: MantineColor;
  radius?: MantineRadius;
  gradient?: MantineGradient;
  children?: React.ReactNode;
}

export const ThemeIcon = (props: ThemeIconProps) => <MThemeIcon {...props} />;
