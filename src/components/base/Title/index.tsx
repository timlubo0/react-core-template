import {
  BoxProps,
  ElementProps,
  Title as MTitle,
  StylesApiProps,
  TitleFactory,
  TitleOrder,
  TitleSize,
} from "@mantine/core";

export interface TitleProps
  extends BoxProps,
    StylesApiProps<TitleFactory>,
    ElementProps<"h1", "color"> {
  order?: TitleOrder;
  size?: TitleSize;
}

export const Title = (props: TitleProps) => <MTitle {...props} />;
