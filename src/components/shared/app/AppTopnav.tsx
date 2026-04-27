import { SidebarTrigger } from '@/components/ui/sidebar';
import { AppProfileContainer } from '@/components';

const AppTopnav = () => {
  return (
    <header className="flex justify-between h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-3" />
      </div>
      <AppProfileContainer />
    </header>
  );
};
export default AppTopnav;
