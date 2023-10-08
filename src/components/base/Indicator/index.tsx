import {
  BoxProps,
  ElementProps,
  IndicatorFactory,
  Indicator as MIndicator,
  MantineColor,
  MantineRadius,
  StylesApiProps,
} from "@mantine/core";
import { IndicatorPosition } from "@mantine/core/lib/components/Indicator/Indicator.types";

export interface IndicatorProps
  extends BoxProps,
    StylesApiProps<IndicatorFactory>,
    ElementProps<"div"> {
  position?: IndicatorPosition;
  offset?: number;
  inline?: boolean;
  size?: number | string;
  label?: React.ReactNode;
  radius?: MantineRadius;
  color?: MantineColor;
  withBorder?: boolean;
  disabled?: boolean;
  processing?: boolean;
  zIndex?: string | number;
}

export const Indicator = (props: IndicatorProps) => <MIndicator {...props} />;
