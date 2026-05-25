import { NavMain } from '@/components/sports/website/mobile-menu/nav-main';
import { TeamSwitcher } from '@/components/sports/website/mobile-menu/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import sportsWebsiteMenus from '@/constants/menu.sports.website';

export function AppSidebar({ ...props }) {
  const spMenus = sportsWebsiteMenus() as IWebsiteMenuProps[];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-primary">
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent className="bg-primary">
        <NavMain items={spMenus} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
