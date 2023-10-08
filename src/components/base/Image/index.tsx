import {
  BoxProps,
  ImageFactory,
  Image as MImage,
  MantineRadius,
  StylesApiProps,
} from "@mantine/core";

export interface ImageProps extends BoxProps, StylesApiProps<ImageFactory> {
  radius?: MantineRadius;
  fit?: React.CSSProperties["objectFit"];
  fallbackSrc?: string;
  src?: any;
  onError?(event: React.SyntheticEvent<HTMLImageElement, Event>): void;
}

export const Image = (props: ImageProps) => <MImage {...props} />;
