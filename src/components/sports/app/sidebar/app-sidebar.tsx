import { NavMain } from '@/components/sports/app/sidebar/nav-main';
import { NavUser } from '@/components/sports/app/sidebar/nav-user';
import { TeamSwitcher } from '@/components/sports/app/sidebar/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavSettings } from '@/components/sports/app/sidebar/nav-settings';
import { sportsAppMenu } from '@/constants/menu.sports';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navMain = sportsAppMenu().spAppMenu.navMain;
  const settings = sportsAppMenu().spAppMenu.settings;

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
