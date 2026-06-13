import {
  ChartBar,
  BooksIcon,
  StackIcon,
  CompassIcon,
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
  { label: "Collections", href: "/dashboard/collections", icon: StackIcon },
  { label: "Discover", href: "/dashboard/discover", icon: CompassIcon },
  { label: "Settings", href: "/dashboard/settings", icon: GearIcon },
  { label: "Landing Page", href: "/", icon: ArrowLineLeftIcon },
];
