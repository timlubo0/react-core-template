import {
  Popover as MPopover,
  PopoverFactory,
  StylesApiProps,
  __PopoverProps,
} from "@mantine/core";

export interface PopoverProps
  extends __PopoverProps,
    StylesApiProps<PopoverFactory> {
  __staticSelector?: string;
  children?: React.ReactNode;
  defaultOpened?: boolean;
  opened?: boolean;
  onChange?(opened: boolean): void;
  closeOnClickOutside?: boolean;
  clickOutsideEvents?: string[];
  trapFocus?: boolean;
  closeOnEscape?: boolean;
  id?: string;
  withRoles?: boolean;
}

export const Popover = (props: PopoverProps) => <MPopover {...props} />;
