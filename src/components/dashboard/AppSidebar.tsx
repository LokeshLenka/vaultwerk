import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { primaryNavItems, pageNavItems } from "./nav-items";
import { SidebarNavItem } from "./SidebarNavItem";

export const AppSidebar = () => (
  <Sidebar>
    <SidebarContent>
      {/* Primary nav — no group label */}
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {primaryNavItems.map((item) => (
              <SidebarNavItem key={item.href} item={item} inline />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Page nav — labelled group */}
      <SidebarGroup>
        <SidebarGroupLabel>Pages</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {pageNavItems.map((item) => (
              <SidebarNavItem key={item.href} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
);
