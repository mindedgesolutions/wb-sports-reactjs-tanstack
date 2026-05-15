import { SpwHeaderBottom, SpwHeaderTop } from '@/components';
import { Outlet } from 'react-router-dom';

const SpwLayout = () => {
  return (
    <>
      <SpwHeaderTop />
      <SpwHeaderBottom />
      <Outlet />
    </>
  );
};
export default SpwLayout;
