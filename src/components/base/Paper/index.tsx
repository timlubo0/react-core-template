import {
  BoxProps,
  Paper as MPaper,
  PaperBaseProps,
  PaperFactory,
  StylesApiProps,
} from "@mantine/core";

export interface PaperProps
  extends BoxProps,
    PaperBaseProps,
    StylesApiProps<PaperFactory> {
  children: React.ReactNode;
}

export const Paper = (props: PaperProps) => <MPaper {...props} />;
