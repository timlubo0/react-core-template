import { Alert as MAlert, MantineColor, MantineRadius } from "@mantine/core";

export interface AlertProps {
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
