import { HoverCard as MHoverCard, PopoverProps } from "@mantine/core";

export interface HoverCardProps extends PopoverProps {
  variant?: string;
  initiallyOpened?: boolean;
  onOpen?(): void;
  onClose?(): void;
  openDelay?: number;
  closeDelay?: number;
}

export const HoverCard = (props: HoverCardProps) => <MHoverCard {...props} />;
