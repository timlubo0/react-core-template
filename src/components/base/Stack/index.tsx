import { Stack as MStack, MantineSpacing } from "@mantine/core";
export interface StackProps {
  gap?: MantineSpacing;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  children: React.ReactNode;
}

export const Stack = (props: StackProps) => <MStack {...props} />;
