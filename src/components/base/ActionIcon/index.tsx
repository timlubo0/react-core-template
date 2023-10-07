import {
  LoaderProps,
  ActionIcon as MActionIcon,
  MantineColor,
  MantineGradient,
  MantineRadius,
  MantineSize,
} from "@mantine/core";

export interface ActionIconProps {
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

export const ActionIcon = ({
  __staticSelector,
  loading,
  loaderProps,
  size,
  color,
  radius,
  gradient,
  disabled,
  children,
}: ActionIconProps) => {
  return (
    <MActionIcon
      __staticSelector={__staticSelector}
      loading={loading}
      loaderProps={loaderProps}
      size={size}
      color={color}
      radius={radius}
      gradient={gradient}
      disabled={disabled}
    >
      {children}
    </MActionIcon>
  );
};
