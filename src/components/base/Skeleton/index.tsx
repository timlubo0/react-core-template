import {
  BoxProps,
  ElementProps,
  Skeleton as MSkeleton,
  SkeletonFactory,
  StylesApiProps,
} from "@mantine/core";

export interface SkeletonProps
  extends BoxProps,
    StylesApiProps<SkeletonFactory>,
    ElementProps<"div"> {
  visible?: boolean;
  height?: React.CSSProperties["height"];
  width?: React.CSSProperties["width"];
  circle?: boolean;
  radius?: React.CSSProperties["borderRadius"];
  animate?: boolean;
}

export const Skeleton = (props: SkeletonProps) => <MSkeleton {...props} />;
