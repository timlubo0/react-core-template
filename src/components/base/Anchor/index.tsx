import { Anchor as MAnchor, TextProps } from "@mantine/core";

export interface AnchorProps extends Omit<TextProps, "span"> {
  underline?: "always" | "hover" | "never";
}

export const Anchor = (props: AnchorProps) => <MAnchor {...props} />;
