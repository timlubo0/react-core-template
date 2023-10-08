import {
  Pagination as MPagination,
  MantineSize,
  PaginationRootProps,
} from "@mantine/core";
import { PaginationIcon } from "@mantine/core/lib/components/Pagination/Pagination.icons";

export interface PaginationProps {
  withEdges?: boolean;
  withControls?: boolean;
  getControlProps?(
    control: "first" | "previous" | "last" | "next"
  ): Record<string, any>;
  nextIcon?: PaginationIcon;
  previousIcon?: PaginationIcon;
  lastIcon?: PaginationIcon;
  firstIcon?: PaginationIcon;
  dotsIcon?: PaginationIcon;
  gap?: MantineSize | (string & {}) | number;
}

export const Pagination = (props: PaginationProps & PaginationRootProps) => (
  <MPagination {...props} />
);
