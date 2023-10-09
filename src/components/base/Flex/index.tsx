import {
  BoxProps,
  ElementProps,
  FlexFactory,
  Flex as MFlex,
  MantineSize,
  StyleProp,
  StylesApiProps,
} from "@mantine/core";

export interface FlexProps
  extends BoxProps,
    StylesApiProps<FlexFactory>,
    ElementProps<"div"> {
  gap?: StyleProp<MantineSize | (string & {}) | number>;
  rowGap?: StyleProp<MantineSize | (string & {}) | number>;
  columnGap?: StyleProp<MantineSize | (string & {}) | number>;
  align?: StyleProp<React.CSSProperties["alignItems"]>;
  justify?: StyleProp<React.CSSProperties["justifyContent"]>;
  wrap?: StyleProp<React.CSSProperties["flexWrap"]>;
  direction?: StyleProp<React.CSSProperties["flexDirection"]>;
  children: React.ReactNode;
}

export const Flex = (props: FlexProps) => {
  return (
    <MFlex {...props} />
  );
};
