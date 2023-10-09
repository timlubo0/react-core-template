import {
  BoxProps,
  ElementProps,
  GroupFactory,
  Group as MGroup,
  MantineSpacing,
  StylesApiProps,
} from "@mantine/core";
import { ReactNode } from "react";

export interface GroupProps
  extends BoxProps,
    StylesApiProps<GroupFactory>,
    ElementProps<"div"> {
  size?: any;
  justify?: React.CSSProperties["justifyContent"];
  align?: React.CSSProperties["alignItems"];
  wrap?: React.CSSProperties["flexWrap"];
  gap?: MantineSpacing;
  grow?: boolean;
  preventGrowOverflow?: boolean;
  children: ReactNode;
}

export const Group = (props: GroupProps) => {
  return <MGroup {...props} />;
};
