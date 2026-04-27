import { showError } from '@/alerts/show.error';
import { AppFooter, AppPageWrapper, AppTopnav } from '@/components';
import { AppSidebar } from '@/components/sports/app/sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { titles } from '@/constants';
import { queryClient } from '@/tanstack/query.client';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const SpaLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      queryClient.clear();
      showError('Your session has expired. Please log in again.');
      navigate(`${titles.SPORTS_APP_URL}/signin`, { replace: true });
    };
    window.addEventListener('force-logout', handleLogout);
    return () => {
      window.removeEventListener('force-logout', handleLogout);
    };
  }, [navigate]);

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppTopnav />
          <AppPageWrapper>
            <Outlet />
          </AppPageWrapper>
          <AppFooter text={titles.FOOTER_TEXT_SPORTS} />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
export default SpaLayout;
