import {
  CssVarsProp,
  Box as MBox,
  MantineBreakpoint,
  MantineStyleProp,
  MantineStyleProps,
} from "@mantine/core";

export interface BoxProps extends MantineStyleProps {
  className?: string;
  style?: MantineStyleProp;
  __vars?: CssVarsProp;
  hiddenFrom?: MantineBreakpoint;
  visibleFrom?: MantineBreakpoint;
  children?: React.ReactNode;
}

export const Box = (props: BoxProps) => <MBox {...props} />;
