import { Group as MGroup, MantineSpacing } from "@mantine/core";
import { ReactNode } from "react";

export interface GroupProps {
  size?: any;
  justify?: React.CSSProperties["justifyContent"];
  align?: React.CSSProperties["alignItems"];
  wrap?: React.CSSProperties["flexWrap"];
  gap?: MantineSpacing;
  grow?: boolean;
  preventGrowOverflow?: boolean;
  children: ReactNode;
}

export const Group = ({
  size,
  justify,
  align,
  wrap,
  gap,
  grow,
  preventGrowOverflow,
  children
}: GroupProps) => {
  return (
    <MGroup
      __size={size}
      justify={justify}
      align={align}
      wrap={wrap}
      gap={gap}
      grow={grow}
      preventGrowOverflow={preventGrowOverflow}
    >
      {children}
    </MGroup>
  );
};