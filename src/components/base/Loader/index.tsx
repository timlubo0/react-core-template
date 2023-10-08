import {
  BoxProps,
  LoaderFactory,
  Loader as MLoader,
  MantineColor,
  MantineLoader,
  MantineLoadersRecord,
  MantineSize,
  StylesApiProps,
} from "@mantine/core";

export interface LoaderProps
  extends BoxProps,
    StylesApiProps<LoaderFactory>,
    Omit<React.ComponentPropsWithoutRef<"svg">, keyof BoxProps> {
  size?: MantineSize | (string & {}) | number;
  color?: MantineColor;
  type?: MantineLoader;
  loaders?: MantineLoadersRecord;
}

export const Loader = (props: LoaderProps) => <MLoader {...props} />;
