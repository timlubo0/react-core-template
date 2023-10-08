import {
  BoxProps,
  ComboboxLikeProps,
  ElementProps,
  Select as MSelect,
  SelectFactory,
  StylesApiProps,
  __BaseInputProps,
  __CloseButtonProps,
} from "@mantine/core";

export interface SelectProps
  extends BoxProps,
    __BaseInputProps,
    ComboboxLikeProps,
    StylesApiProps<SelectFactory>,
    ElementProps<"input", "onChange" | "size" | "value" | "defaultValue"> {
  value?: string | null;
  defaultValue?: string | null;
  onChange?(value: string | null): void;
  searchable?: boolean;
  withCheckIcon?: boolean;
  checkIconPosition?: "left" | "right";
  nothingFoundMessage?: React.ReactNode;
  searchValue?: string;
  defaultSearchValue?: string;
  onSearchChange?(value: string): void;
  allowDeselect?: boolean;
  clearable?: boolean;
  clearButtonProps?: __CloseButtonProps & ElementProps<"button">;
  hiddenInputProps?: React.ComponentPropsWithoutRef<"input">;
}

export const Select = (props: SelectProps) => <MSelect {...props} />;
