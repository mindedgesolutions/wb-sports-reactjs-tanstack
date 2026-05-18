import { SpwFooter, SpwHeaderBottom, SpwHeaderTop } from '@/components';
import SpwMenu from '@/components/sports/website/header/SpwMenu';
import { FontSizeProvider } from '@/contexts/FontSizeProvider';
import { Menu } from 'lucide-react';
import { Outlet } from 'react-router-dom';

const SpwLayout = () => {
  return (
    <div className="max-w-480 mx-auto">
      <FontSizeProvider>
        <section className="bg-muted">
          <SpwHeaderTop className="max-w-7xl mx-auto" />
        </section>
        <SpwHeaderBottom className="max-w-7xl mx-auto px-2 md:px-0" />
        <div className="bg-primary h-8 md:h-10 flex items-center">
          {/* Desktop menu */}
          <div className="hidden md:flex max-w-7xl mx-auto flex-row justify-center items-center">
            <SpwMenu />
          </div>
          {/* Mobile menu */}
          <div className="md:hidden flex items-center">
            <Menu />
          </div>
        </div>
        <Outlet />
        <SpwFooter />
      </FontSizeProvider>
    </div>
  );
};
export default SpwLayout;
