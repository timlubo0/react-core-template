import {
  BoxProps,
  CenterFactory,
  Center as MCenter,
  StylesApiProps,
} from "@mantine/core";

export interface CenterProps extends BoxProps, StylesApiProps<CenterFactory> {
  children?: React.ReactNode;
  inline?: boolean;
}

export const Center = (props: CenterProps) => <MCenter {...props} />;
