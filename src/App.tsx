import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as pg from '@/pages';
import { titles } from '@/constants';

const spa = titles.SPORTS_APP_URL;
const spw = titles.SPORTS_WEB_URL;

const router = createBrowserRouter([
  { path: `/`, element: <pg.RootLanding /> },
  { path: `${spa}/signin`, element: <pg.SpaSignin /> },
  {
    path: spa,
    element: <pg.SpaLayout />,
    children: [
      { path: 'dashboard', element: <pg.SpaDashboard /> },
      {
        path: 'about-us',
        children: [
          { path: 'vision-mission', element: <pg.SpaVisionMission /> },
          { path: 'sports-in-bengal', element: <pg.SpaSportsInBengal /> },
          {
            path: 'administrative-structure',
            element: <pg.SpaAdminStructure />,
          },
          { path: 'key-personnel', element: <pg.SpaKeyPersonnel /> },
          { path: 'achievements', element: <pg.SpaAchievements /> },
        ],
      },
      {
        path: 'sports',
        children: [
          { path: 'sports-categories', element: <pg.SpaSportsCategories /> },
          { path: 'sports-personnel', element: <pg.SpaSportsPersonnel /> },
          { path: 'sports-events', element: <pg.SpaSportsEvents /> },
          {
            path: 'sports-infrastructure',
            element: <pg.SpaSportsInfrastructure />,
          },
        ],
      },
      {
        path: 'wbs-council',
        children: [
          { path: 'wbs-events', element: <pg.SpaWbsEvents /> },
          { path: 'khelo-india', element: <pg.SpaKheloIndia /> },
          { path: 'wbs-council-members', element: <pg.SpaWbsCouncilMembers /> },
        ],
      },
      {
        path: 'announcements',
        children: [
          { path: 'announcements', element: <pg.SpaAnnouncements /> },
          { path: 'advertisements', element: <pg.SpaAdvertisements /> },
          { path: 'guiding-principles', element: <pg.SpaGudingPrinciples /> },
        ],
      },
      {
        path: 'achievements-awards',
        children: [
          {
            path: 'players-achievements',
            element: <pg.SpaPlayersAchievements />,
          },
          { path: 'awards', element: <pg.SpaAwards /> },
        ],
      },
      {
        path: 'info-about',
        children: [
          { path: 'assoc-sites', element: <pg.SpaAssocSites /> },
          { path: 'associations', element: <pg.SpaAssociations /> },
          { path: 'fifa-u17', element: <pg.SpaFifa /> },
          { path: 'sports-policies', element: <pg.SpaSportsPolicies /> },
          { path: 'stadiums', element: <pg.SpaStadiums /> },
          { path: 'stadium/:id?', element: <pg.SpaStadiumSingle /> },
        ],
      },
    ],
  },
  {
    path: spw,
    element: <pg.SpwLayout />,
    children: [{ index: true, element: <pg.SpwLanding /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
