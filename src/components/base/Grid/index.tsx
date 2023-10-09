import {
  BoxProps,
  ElementProps,
  GridFactory,
  Grid as MGrid,
  MantineSpacing,
  StyleProp,
  StylesApiProps,
} from "@mantine/core";

export interface GridProps
  extends BoxProps,
    StylesApiProps<GridFactory>,
    ElementProps<"div"> {
  gutter?: StyleProp<MantineSpacing>;
  grow?: boolean;
  justify?: React.CSSProperties["justifyContent"];
  align?: React.CSSProperties["alignItems"];
  columns?: number;
  children?: React.ReactNode;
}

export const Grid = (props: GridProps) => {
  return <MGrid {...props} />;
};
