import { Grid as MGrid, MantineSpacing, StyleProp } from "@mantine/core";

export interface GridProps {
  gutter?: StyleProp<MantineSpacing>;
  grow?: boolean;
  justify?: React.CSSProperties["justifyContent"];
  align?: React.CSSProperties["alignItems"];
  columns?: number;
  children?: React.ReactNode;
}

export const Grid = ({ gutter, grow, justify, align, columns }: GridProps) => {
  return (
    <MGrid
      gutter={gutter}
      grow={grow}
      justify={justify}
      align={align}
      columns={columns}
    />
  );
};
