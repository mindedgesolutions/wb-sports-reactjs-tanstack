import { titles } from '@/constants';

export function getOrganisationFromPath(): 'sports' | 'services' {
  if (typeof window === 'undefined') return 'sports';

  const path = window.location.pathname;

  if (path.startsWith(titles.SPORTS_APP_URL)) {
    return 'sports';
  }

  if (path.startsWith(titles.SERVICES_APP_URL)) {
    return 'services';
  }

  return 'sports';
}
