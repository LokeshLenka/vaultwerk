import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { pageNavItems } from "./nav-items";
import { SidebarNavItem } from "./SidebarNavItem";
import { Badge } from "../ui/badge";

export const AppSidebar = () => (
  <Sidebar>
    <SidebarContent>
      {/* Primary nav — no group label */}
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {/* {primaryNavItems.map((item) => (
              <SidebarNavItem key={item.href} item={item} inline />
            ))} */}
            <div className="w-full flex items-center p-3">
              <span className="font-brand font-bold text-xl">ValutWerk</span>
              <Badge
                variant="outline"
                className="ml-1 px-1.5 text-xs border-green-500 text-green-500"
              >
                Beta
              </Badge>
            </div>
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
