import {
  BoxProps,
  ElementProps,
  MantineColor,
  MantineComponent,
  MantineRadius,
  StylesApiProps,
  TabsCssVariables,
  TabsFactory,
  TabsList,
  TabsPanel,
  TabsStylesNames,
  TabsTab,
  TabsVariant,
} from "@mantine/core";

export interface TabsProps
  extends BoxProps,
    StylesApiProps<TabsFactory>,
    ElementProps<"div", "defaultValue" | "value" | "onChange"> {
  defaultValue?: string | null;
  value?: string | null;
  onChange?(value: string | null): void;
  orientation?: "vertical" | "horizontal";
  placement?: "left" | "right";
  id?: string;
  loop?: boolean;
  activateTabWithKeyboard?: boolean;
  allowTabDeactivation?: boolean;
  children: React.ReactNode;
  color?: MantineColor;
  radius?: MantineRadius;
  inverted?: boolean;
  keepMounted?: boolean;
}

export declare const Tabs: MantineComponent<{
  props: TabsProps;
  ref: HTMLDivElement;
  variant: TabsVariant;
  stylesNames: TabsStylesNames;
  vars: TabsCssVariables;
  staticComponents: {
    Tab: typeof TabsTab;
    Panel: typeof TabsPanel;
    List: typeof TabsList;
  };
}>;
