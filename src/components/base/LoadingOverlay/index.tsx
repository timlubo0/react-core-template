import {
  BoxProps,
  ElementProps,
  LoaderProps,
  LoadingOverlayFactory,
  LoadingOverlay as MLoadingOverlay,
  OverlayProps,
  StylesApiProps,
  TransitionOverride,
} from "@mantine/core";

export interface LoadingOverlayProps
  extends BoxProps,
    StylesApiProps<LoadingOverlayFactory>,
    ElementProps<"div"> {
  transitionProps?: TransitionOverride;
  loaderProps?: LoaderProps;
  overlayProps?: OverlayProps;
  visible?: boolean;
  zIndex?: string | number;
}

export const LoadingOverlay = (props: LoadingOverlayProps) => (
  <MLoadingOverlay {...props} />
);
