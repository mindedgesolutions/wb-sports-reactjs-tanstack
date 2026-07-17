import { ChevronsUpDown, LockKeyhole, LogOut, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { images, titles } from '@/constants';
import { useCurrentUser } from '@/tanstack/shared/auth/auth.query';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDomainFromPath } from '@/utils/functions';
import { useLogout } from '@/tanstack/shared/auth/auth.mutation';
import { showSuccess } from '@/alerts/show.success';
import { FiUser } from 'react-icons/fi';

export function NavUser() {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const domain = getDomainFromPath(pathname);
  const redirect = pathname.includes(titles.SPORTS_APP_URL)
    ? titles.SPORTS_APP_URL
    : titles.SERVICES_APP_URL;

  const logout = useLogout(domain!);
  const { data: user, isLoading } = useCurrentUser(domain) as {
    data: IUser;
    isLoading: boolean;
  };

  const handleRedirect = () => {
    showSuccess('Logged out successfully');
    navigate(`${redirect}/sign-in`);
  };

  const handleSubmit = async () => {
    logout.mutate(undefined, {
      onSuccess: handleRedirect,
      onError: handleRedirect,
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={`${titles.BASE_URL}${user?.user_details.profile_img}`}
                  alt={user?.name}
                />
                <AvatarFallback>
                  <FiUser />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-xs leading-tight">
                {isLoading ? (
                  'Loading ...'
                ) : (
                  <>
                    <span className="truncate font-medium">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </>
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-sm"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={images.profileImg} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-xs leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-xs cursor-pointer mb-1">
                <User className="size-3.5" />
                Personal Information
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs cursor-pointer mb-1">
                <LockKeyhole className="size-3.5" />
                Change Password
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-xs cursor-pointer"
              onClick={handleSubmit}
            >
              <LogOut className="size-3.5" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
