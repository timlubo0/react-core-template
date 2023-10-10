import {
  AlertFactory,
  BoxProps,
  ElementProps,
  Alert as MAlert,
  MantineColor,
  MantineRadius,
  StylesApiProps,
} from "@mantine/core";

export interface AlertProps
  extends BoxProps,
    StylesApiProps<AlertFactory>,
    ElementProps<"div", "title"> {
  radius?: MantineRadius;
  color?: MantineColor;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  withCloseButton?: boolean;
  onClose?(): void;
  closeButtonLabel?: string;
  children?: React.ReactNode;
}

export const Alert = (props: AlertProps) => <MAlert {...props} />;
