import {
  BoxProps,
  ElementProps,
  ScrollArea as MScrollArea,
  ScrollAreaFactory,
  StylesApiProps,
} from "@mantine/core";

export interface ScrollAreaProps
  extends BoxProps,
    StylesApiProps<ScrollAreaFactory>,
    ElementProps<"div"> {
  scrollbarSize?: number | string;
  type?: "auto" | "always" | "scroll" | "hover" | "never";
  scrollHideDelay?: number;
  offsetScrollbars?: boolean | "x" | "y";
  viewportRef?: React.ForwardedRef<HTMLDivElement>;
  viewportProps?: React.ComponentPropsWithRef<"div">;
  onScrollPositionChange?(position: { x: number; y: number }): void;
}

export const ScrollArea = (props: ScrollAreaProps) => (
  <MScrollArea {...props} />
);
