import {
  YswFooter,
  YswHeaderBottom,
  YswHeaderTop,
  YswMenu,
} from '@/components';
import { AppSidebar } from '@/components/services/website/mobile-menu/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { FontSizeProvider } from '@/contexts/FontSizeProvider';
import { smoothScrollTo } from '@/utils/functions';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const YswLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      smoothScrollTo(0, 0, 500);
    }, 0);
  }, [pathname]);

  return (
    <>
      {/* Web */}
      <div className="max-w-480 mx-auto hidden md:block">
        <FontSizeProvider>
          <section className="bg-muted">
            <YswHeaderTop className="max-w-7xl mx-auto" />
          </section>
          <YswHeaderBottom className="max-w-7xl mx-auto px-2 md:px-0" />
          <div className="bg-primary dark:bg-card h-8 md:h-10 flex items-center">
            <div className="hidden md:flex max-w-7xl mx-auto flex-row justify-center items-center">
              <YswMenu />
            </div>
          </div>
          <Outlet />
          <YswFooter />
        </FontSizeProvider>
      </div>

      {/* Mobile */}
      <div className="block md:hidden">
        <SidebarProvider>
          <FontSizeProvider>
            <div className="w-full flex flex-col">
              <div className="bg-muted">
                <YswHeaderTop className="w-full md:max-w-7xl md:mx-auto" />
              </div>
              <YswHeaderBottom className="px-2" />
              <div className="bg-primary h-8">
                <AppSidebar />
                <SidebarTrigger className="text-primary-foreground" />
              </div>
              <Outlet />
              <YswFooter />
            </div>
          </FontSizeProvider>
        </SidebarProvider>
      </div>
    </>
  );
};
export default YswLayout;
