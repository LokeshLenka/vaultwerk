import {
  SidebarMenuButton,
  SidebarMenuIcon,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { NavItem } from "./nav-items";

interface SidebarNavItemProps {
  item: NavItem;
  /** Use true for top-level items that render the icon inline (no SidebarMenuIcon wrapper) */
  inline?: boolean;
}

export const SidebarNavItem = ({
  item,
  inline = false,
}: SidebarNavItemProps) => {
  const Icon = item.icon;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton render={<a href={item.href} />}>
        {inline ? (
          <span className="flex size-4 items-center justify-center">
            <Icon />
          </span>
        ) : (
          <SidebarMenuIcon>
            <Icon />
          </SidebarMenuIcon>
        )}
        <span>{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
