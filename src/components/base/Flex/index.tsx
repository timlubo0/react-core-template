import { Flex as MFlex, MantineSize, StyleProp } from "@mantine/core";

export interface FlexProps {
  gap?: StyleProp<MantineSize | (string & {}) | number>;
  rowGap?: StyleProp<MantineSize | (string & {}) | number>;
  columnGap?: StyleProp<MantineSize | (string & {}) | number>;
  align?: StyleProp<React.CSSProperties["alignItems"]>;
  justify?: StyleProp<React.CSSProperties["justifyContent"]>;
  wrap?: StyleProp<React.CSSProperties["flexWrap"]>;
  direction?: StyleProp<React.CSSProperties["flexDirection"]>;
  children: React.ReactNode;
}

export const Flex = ({
  gap,
  rowGap,
  columnGap,
  align,
  justify,
  wrap,
  direction,
}: FlexProps) => {
  return (
    <MFlex
      gap={gap}
      rowGap={rowGap}
      columnGap={columnGap}
      align={align}
      justify={justify}
      wrap={wrap}
      direction={direction}
    />
  );
};
