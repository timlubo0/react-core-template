import {
  BoxProps,
  ElementProps,
  Stack as MStack,
  MantineSpacing,
  StackFactory,
  StylesApiProps,
} from "@mantine/core";
export interface StackProps
  extends BoxProps,
    StylesApiProps<StackFactory>,
    ElementProps<"div"> {
  gap?: MantineSpacing;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  children: React.ReactNode;
}

export const Stack = (props: StackProps) => <MStack {...props} />;
