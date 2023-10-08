import {
  BoxProps,
  DividerFactory,
  ElementProps,
  Divider as MDivider,
  MantineColor,
  MantineSize,
  StylesApiProps,
} from "@mantine/core";

export interface DividerProps
  extends BoxProps,
    StylesApiProps<DividerFactory>,
    ElementProps<"div"> {
  color?: MantineColor;
  size?: MantineSize | number | (string & {});
  label?: React.ReactNode;
  labelPosition?: "left" | "center" | "right";
  orientation?: "horizontal" | "vertical";
}

export const Divider = (props: DividerProps) => <MDivider {...props} />;
