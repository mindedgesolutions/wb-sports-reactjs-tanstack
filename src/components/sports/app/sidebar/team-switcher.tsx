import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { images, titles } from '@/constants';
import { showLess } from '@/utils/functions';
import AppTooltip from '@/components/shared/app/AppTooltip';

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <Link to={`${titles.SPORTS_APP_URL}/dashboard`}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
              >
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src={images.biswaBangla} className="size-8" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight gap-0.5">
                  <AppTooltip
                    text={titles.SPORTS_APP_NAME}
                    cropped={showLess(titles.SPORTS_APP_NAME, 20)}
                  />
                  <span className="truncate text-xs text-muted-foreground">
                    Sports Wing
                  </span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
          </Link>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
