import {
  BoxProps,
  ElementProps,
  SimpleGrid as MSimpleGrid,
  MantineSpacing,
  SimpleGridFactory,
  StyleProp,
  StylesApiProps,
} from "@mantine/core";

export interface SimpleGridProps
  extends BoxProps,
    StylesApiProps<SimpleGridFactory>,
    ElementProps<"div"> {
  cols?: StyleProp<number>;
  spacing?: StyleProp<MantineSpacing>;
  verticalSpacing?: StyleProp<MantineSpacing>;
}

export const SimpleGrid = (props: SimpleGridProps) => (
  <MSimpleGrid {...props} />
);
