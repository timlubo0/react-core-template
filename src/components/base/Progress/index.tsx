import {
  Progress as MProgress,
  MantineColor,
  ProgressFactory,
  StylesApiProps,
} from "@mantine/core";
import { __ProgressRootProps } from "@mantine/core/lib/components/Progress/ProgressRoot/ProgressRoot";

export interface ProgressProps
  extends __ProgressRootProps,
    StylesApiProps<ProgressFactory> {
  value: number;
  color?: MantineColor;
  striped?: boolean;
  animated?: boolean;
}

export const Progress = (props: ProgressProps) => <MProgress {...props} />;
