import { NavMain } from '@/components/services/app/sidebar/nav-main';
import { NavUser } from '@/components/services/app/sidebar/nav-user';
import { TeamSwitcher } from '@/components/services/app/sidebar/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavSettings } from '@/components/services/app/sidebar/nav-settings';
import { servicesAppMenu } from '@/constants/menu.services';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navMain = servicesAppMenu().spAppMenu.navMain;
  const settings = servicesAppMenu().spAppMenu.settings;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSettings settings={settings} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
