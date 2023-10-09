import {
  IconNotification,
  IconCode,
  IconBook,
  IconFingerprint,
  IconCoin,
  TablerIconsProps,
} from "@tabler/icons-react";
import { Routes } from "./routes";
export interface IMenu {
  icon: (props: TablerIconsProps) => JSX.Element;
  title: string;
  description?: string;
  href: string;
}

export const topMenu: IMenu[] = [
  {
    icon: IconCode,
    title: "Utilisateurs",
    description: "",
    href: Routes.users,
  },
  {
    icon: IconCoin,
    title: "Roles & Permissions",
    description: "",
    href: Routes.roles,
  },
  {
    icon: IconBook,
    title: "Villes",
    description: "",
    href: Routes.cities,
  },
  {
    icon: IconFingerprint,
    title: "Devises",
    description: "",
    href: Routes.currencies,
  },
  // {
  //   icon: IconChartPie3,
  //   title: 'Taux de change',
  //   description: 'This Pokémon uses its flying ability to quickly chase',
  //   href: Routes.rates
  // },
  {
    icon: IconNotification,
    title: "Modes de paiement",
    description: "",
    href: Routes.payModes,
  },
];

export const sideMenu: IMenu[] = [
  {
    icon: IconCode,
    title: "Dashboard",
    description: "",
    href: Routes.home,
  },
];
