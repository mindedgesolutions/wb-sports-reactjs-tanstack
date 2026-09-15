import { NavMain } from '@/components/services/website/mobile-menu/nav-main';
import { TeamSwitcher } from '@/components/services/website/mobile-menu/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import serviceWebsiteMenus from '@/constants/menu.services.website';

export function AppSidebar({ ...props }) {
  const srMenus = serviceWebsiteMenus() as IWebsiteMenuProps[];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-primary">
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent className="bg-primary dark:bg-card">
        <NavMain items={srMenus} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
