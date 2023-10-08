import {
  Menu as MMenu,
  MenuFactory,
  StylesApiProps,
  __PopoverProps,
} from "@mantine/core";

export interface MenuProps extends __PopoverProps, StylesApiProps<MenuFactory> {
  variant?: string;
  children?: React.ReactNode;
  opened?: boolean;
  defaultOpened?: boolean;
  onChange?(opened: boolean): void;
  onOpen?(): void;
  onClose?(): void;
  closeOnItemClick?: boolean;
  loop?: boolean;
  closeOnEscape?: boolean;
  trigger?: "click" | "hover";
  openDelay?: number;
  closeDelay?: number;
  closeOnClickOutside?: boolean;
  clickOutsideEvents?: string[];
  id?: string;
}

export const Menu = (props: MenuProps) => <MMenu {...props} />;
