import {
  IconNotification,
  IconCode,
  IconBook,
  IconFingerprint,
  IconCoin,
  IconCar,
  IconUser,
  IconWaterpolo,
  TablerIconsProps,
  IconBookmark,
} from "@tabler/icons-react";
import { Routes } from "./routes";
export interface IMenu{
  icon: (props: TablerIconsProps) => JSX.Element,
  title: string,
  description?: string,
  href: string,
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
    icon: IconCar,
    title: "Type d'automobile",
    description: "Listes d'automobiles et configuration des parametres inclues",
    href: Routes.automobileTypes,
  },
  {
    icon: IconCar,
    title: "Marques des vehicules",
    description: "Listes d'automobiles et configuration des parametres inclues",
    href: Routes.vehicleMarks,
  },
  {
    icon: IconWaterpolo,
    title: "Types des carburants",
    description: "Listes d'automobiles et configuration des parametres inclues",
    href: Routes.vehicleEnergies,
  },
  {
    icon: IconCar,
    title: "Types d'utilisation des vehicule",
    description: "Listes d'automobiles et configuration des parametres inclues",
    href: Routes.vehicleUses,
  },
  {
    icon: IconNotification,
    title: "Modes de paiement",
    description: "Combusken battles with the intensely hot flames it spews",
    href: Routes.payModes,
  },
];

export const configMenu: IMenu[] = [
  {
    icon: IconCode,
    title: "Types des courses",
    description: "",
    href: Routes.raceTypes,
  },
  {
    icon: IconCode,
    title: "Arrets de bus",
    description: "",
    href: Routes.stops,
  },
  {
    icon: IconCode,
    title: "Lignes de transport",
    description: "",
    href: Routes.transportLines,
  },
  {
    icon: IconCoin,
    title: "Prix de courses",
    description: "",
    href: Routes.racePrices,
  },
  {
    icon: IconCoin,
    title: "Gains",
    description: "",
    href: Routes.earnings,
  },
  {
    icon: IconCoin,
    title: "Prix du carburant",
    description: "",
    href: Routes.fuelPrices,
  },
];

export const sideMenu: IMenu[] = [
  {
    icon: IconCode,
    title: "Dashboard",
    description: "",
    href: Routes.home,
  },
  {
    icon: IconUser,
    title: "Chauffeurs",
    description: "Interface de configuration de chauffeurs",
    href: Routes.drivers,
  },
  {
    icon: IconUser,
    title: "Vehicles",
    description: "Interface de configuration de chauffeurs",
    href: Routes.vehicles,
  },
  {
    icon: IconCar,
    title: "Courses",
    description: "Interface de configuration de vehicules",
    href: Routes.races, 
  },
  {
    icon: IconBookmark,
    title: "Rapports",
    description: "Interface de configuration de vehicules",
    href: Routes.reports, 
  },
];
