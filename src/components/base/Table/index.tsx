import {
  BoxProps,
  Table as MTable,
  MantineColor,
  MantineSpacing,
  StylesApiProps,
  TableFactory,
} from "@mantine/core";

export interface TableProps {
  layout?: React.CSSProperties["tableLayout"];
  captionSide?: "top" | "bottom";
  borderColor?: MantineColor;
  withTableBorder?: boolean;
  withColumnBorders?: boolean;
  withRowBorders?: boolean;
  horizontalSpacing?: MantineSpacing;
  verticalSpacing?: MantineSpacing;
  striped?: boolean | "odd" | "even";
  stripedColor?: MantineColor;
  highlightOnHover?: boolean;
  highlightOnHoverColor?: MantineColor;
  children: React.ReactNode;
}

export const Table = (
  props: TableProps & BoxProps & StylesApiProps<TableFactory>
) => <MTable {...props} />;
