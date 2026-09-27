import {
  ChartBar,
  BooksIcon,
  StackIcon,
  GlobeHemisphereWest,
  GearIcon,
  ArrowLineLeftIcon,
} from "@phosphor-icons/react";
import type { ElementType } from "react";

export interface NavItem {
  label: string;
  href: string;
  icon: ElementType;
}

export const primaryNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: ChartBar },
];

export const pageNavItems: NavItem[] = [
  { label: "Library", href: "/dashboard/library", icon: BooksIcon },
  { label: "Sites", href: "/dashboard/sites", icon: GlobeHemisphereWest },
  { label: "Collections", href: "/dashboard/collections", icon: StackIcon },
  { label: "Settings", href: "/dashboard/settings", icon: GearIcon },
  { label: "Landing Page", href: "/", icon: ArrowLineLeftIcon },
];
