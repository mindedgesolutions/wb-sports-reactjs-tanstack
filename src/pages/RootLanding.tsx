import { Button } from '@/components/ui/button';
import { titles } from '@/constants';
import { Link } from 'react-router-dom';

const RootLanding = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex gap-4">
        <Link to={`${titles.SPORTS_APP_URL}/signin`}>
          <Button>Sports App</Button>
        </Link>
        <Link to={`${titles.SPORTS_WEB_URL}`}>
          <Button>Sports Website</Button>
        </Link>
      </div>
    </div>
  );
};
export default RootLanding;
