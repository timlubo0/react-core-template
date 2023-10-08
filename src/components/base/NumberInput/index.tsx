import {
  BoxProps,
  ElementProps,
  NumberInput as MNumberInput,
  NumberInputFactory,
  NumberInputHandlers,
  StylesApiProps,
  __BaseInputProps,
} from "@mantine/core";
import { OnValueChange, NumberFormatValues } from "react-number-format";

export interface NumberInputProps
  extends BoxProps,
    __BaseInputProps,
    StylesApiProps<NumberInputFactory>,
    ElementProps<"input", "size" | "type" | "onChange"> {
  value?: number | string;
  defaultValue?: number | string;
  onChange?(value: number | string): void;
  onValueChange?: OnValueChange;
  allowLeadingZeros?: boolean;
  allowNegative?: boolean;
  allowedDecimalSeparators?: string[];
  decimalScale?: number;
  decimalSeparator?: string;
  fixedDecimalScale?: boolean;
  prefix?: string;
  suffix?: string;
  thousandsGroupStyle?: "thousand" | "lakh" | "wan" | "none";
  isAllowed?(values: NumberFormatValues): boolean;
  type?: "text" | "tel" | "password";
  thousandSeparator?: string | boolean;
  min?: number;
  max?: number;
  step?: number;
  hideControls?: boolean;
  clampBehavior?: "strict" | "blur" | "none";
  allowDecimal?: boolean;
  handlersRef?: React.ForwardedRef<NumberInputHandlers | undefined>;
  startValue?: number;
}

export const NumberInput = (props: NumberInputProps) => (
  <MNumberInput {...props} />
);
