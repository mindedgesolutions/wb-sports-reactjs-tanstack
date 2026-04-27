import { showSuccess } from '@/alerts/show.success';
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
import { images, titles } from '@/constants';
import { useLogout } from '@/tanstack/shared/auth/auth.mutation';
import { useCurrentUser } from '@/tanstack/shared/auth/auth.query';
import { LockKeyhole, LogOut, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const AppProfileContainer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const domain = pathname.includes(titles.SPORTS_APP_URL)
    ? 'sports'
    : 'services';
  const redirect = pathname.includes(titles.SPORTS_APP_URL)
    ? titles.SPORTS_APP_URL
    : titles.SERVICES_APP_URL;
  const logout = useLogout(domain);
  const user = useCurrentUser().data as IUser;

  // ------------------------

  const handleRedirect = () => {
    showSuccess('Logged out successfully');
    navigate(`${redirect}/signin`);
  };

  // ------------------------

  const handleSubmit = async () => {
    logout.mutate(undefined, {
      onSuccess: handleRedirect,
      onError: handleRedirect,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="mr-1">
        <div className="flex flex-row flex-wrap items-center gap-2 md:gap-3 px-4 mr-2 md:mr-4 cursor-pointer">
          <section className="text-xs tracking-wider text-muted-foreground">
            Welcome, {user?.name || 'Guest'}
          </section>
          <Avatar>
            <AvatarImage
              src={user?.user_details.profile_img || images.profileImg}
              alt={user?.name}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-sm"
        align="end"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user?.user_details.profile_img || images.profileImg}
                  alt={user?.name}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-xs leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
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
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="text-xs cursor-pointer"
            onClick={handleSubmit}
          >
            <LogOut className="size-3.5" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AppProfileContainer;
