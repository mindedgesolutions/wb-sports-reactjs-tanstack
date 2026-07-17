import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as pg from '@/pages';
import { titles } from '@/constants';

const spa = titles.SPORTS_APP_URL;
const spw = titles.SPORTS_WEB_URL;
const ysa = titles.SERVICES_APP_URL;
const ysw = titles.SERVICES_WEB_URL;

const router = createBrowserRouter([
  { path: `/`, element: <pg.RootLanding /> },

  // Sports CMS routes start
  { path: `${spa}/sign-in`, element: <pg.SpaSignin /> },
  { path: `${spa}/forgot-password`, element: <pg.SpaForgotPassword /> },
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
          { path: 'fifa-u17', element: <pg.SpaFifaGallery /> },
          { path: 'fifa/:id?', element: <pg.SpaFifaGallerySingle /> },
          { path: 'sports-policies', element: <pg.SpaSportsPolicies /> },
          { path: 'stadiums', element: <pg.SpaStadiums /> },
          { path: 'stadium/:id?', element: <pg.SpaStadiumSingle /> },
        ],
      },
      {
        path: 'moments',
        children: [
          { path: 'photo-galleries', element: <pg.SpaPhotoGallery /> },
          { path: 'gallery/:id?', element: <pg.SpaPhotoGallerySingle /> },
          { path: 'audio-visuals', element: <pg.SpaAudioVisuals /> },
          { path: 'bulletins', element: <pg.SpaBulletins /> },
          { path: 'amphan', element: <pg.SpaAmphan /> },
        ],
      },
      {
        path: 'rti',
        children: [{ path: 'notices', element: <pg.SpaNotices /> }],
      },
      { path: 'contact-us', element: <pg.SpaContactUs /> },
      { path: 'news-scroller', element: <pg.SpaNewsScroller /> },
      { path: 'homepage-sliders', element: <pg.SpaHomepageSlider /> },
      { path: 'profile', element: <pg.SpaProfile /> },
    ],
  },
  // Sports CMS routes end

  // Sports website routes start
  {
    path: spw,
    element: <pg.SpwLayout />,
    children: [
      { index: true, element: <pg.SpwLanding /> },
      { path: 'vision-mission', element: <pg.SpwVisionMission /> },
      { path: 'sports-in-bengal', element: <pg.SpwSportsInBengal /> },
      { path: 'administrative-structure', element: <pg.SpwAdminStructure /> },
      { path: 'key-personnel', element: <pg.SpwKeyPersonnel /> },
      { path: 'achievements', element: <pg.SpwAchievements /> },
      { path: 'sports-categories', element: <pg.SpwSportsCategories /> },
      { path: 'sports-personnel', element: <pg.SpwSportsPersonnel /> },
      { path: 'sports-events', element: <pg.SpwSportsEvents /> },
      {
        path: 'sports-infrastructure',
        element: <pg.SpwSportsInfrastructure />,
      },
      { path: 'wbs-advisory-board', element: <pg.SpwAdvisoryBoard /> },
      { path: 'wbs-working-committee', element: <pg.SpwWorkingCommittee /> },
      { path: 'wbs-events', element: <pg.SpwEvents /> },
      { path: 'khelo-india', element: <pg.SpwKheloIndia /> },
      { path: 'advertisements', element: <pg.SpwAdvertisements /> },
      { path: 'announcements/:category', element: <pg.SpwAnnouncements /> },
      { path: 'guiding-principles', element: <pg.SpwGudingPrinciples /> },
      { path: 'players-achievements', element: <pg.SpwPlayersAchievements /> },
      { path: 'awards', element: <pg.SpwAwards /> },
      { path: 'stadiums', element: <pg.SpwStadiums /> },
      { path: 'stadium/:slug', element: <pg.SpwStadium /> },
      { path: 'associations', element: <pg.SpwAssociations /> },
      { path: 'fifa-u17-wc', element: <pg.SpwFifaGalleries /> },
      { path: 'fifa-gallery/:slug', element: <pg.SpwFifaGallery /> },
      { path: 'sports-policies', element: <pg.SpwSportsPolicies /> },
      { path: 'associated-sites', element: <pg.SpwAssocSites /> },
      { path: 'photo-galleries', element: <pg.SpwPhotoGalleries /> },
      { path: 'photo-gallery/:slug', element: <pg.SpwPhotoGallery /> },
      { path: 'audio-visuals', element: <pg.SwpAudioVisuals /> },
      { path: 'bulletins', element: <pg.SpwBulletins /> },
      { path: 'amphan', element: <pg.SpwAmphan /> },
      { path: 'rti-act-2005', element: <pg.SpwRtiTwoThousandFive /> },
      { path: 'rti-rules-2006', element: <pg.SpwRtiTwoThousandSix /> },
      { path: 'rti-notices', element: <pg.SpwRtiNotices /> },
      { path: 'contact-us', element: <pg.SpwContactUs /> },
      { path: 'feedback', element: <pg.SpwFeedback /> },
      { path: 'privacy-policies', element: <pg.SpwPrivacyPolicies /> },
      { path: 'site-map', element: <pg.SpwSitemap /> },
    ],
  },
  // Sports website routes end

  // Youth Services CMS routes start
  { path: `${ysa}/sign-in`, element: <pg.YsaSignin /> },
  { path: `${ysa}/forgot-password`, element: <pg.YsaForgotPassword /> },
  { path: `${ysa}/reset-password/:email`, element: <pg.YsaResetPassword /> },
  {
    path: ysa,
    element: <pg.YsaLayout />,
    children: [
      { path: 'dashboard', element: <pg.YsaDashboard /> },
      { path: 'profile', element: <pg.YsaProfile /> },
      { path: 'banners', element: <pg.YsaBanners /> },
      {
        path: 'about-us',
        children: [
          { path: 'about-department', element: <pg.YsaAboutDepartment /> },
          { path: 'address-department', element: <pg.YsaAddressDepartment /> },
          { path: 'district-offices', element: <pg.YsaDistrictOffices /> },
          { path: 'helpline', element: <pg.YsaHelpline /> },
          { path: 'organisation-chart', element: <pg.YsaOrgChart /> },
        ],
      },
      {
        path: 'youth-training-program',
        children: [
          {
            path: 'computer-training',
            children: [
              { path: 'course-details', element: <pg.YsaCourseDetails /> },
              { path: 'course-syllabus', element: <pg.YsaCourseSyllabus /> },
              { path: 'training-centres', element: <pg.YsaTrainingCentres /> },
            ],
          },
          {
            path: 'vocational-training',
            children: [
              { path: 'schemes', element: <pg.YsaSchemes /> },
              {
                path: 'training-centres',
                element: <pg.YsaVocationalCentres />,
              },
            ],
          },
        ],
      },
      {
        path: 'mountaineering',
        children: [
          { path: 'course-details', element: <pg.YsaMountaineeringCourse /> },
          {
            path: 'general-body-members',
            element: <pg.YsaMountaineeringGbm />,
          },
        ],
      },
      {
        path: 'fair-programmes',
        children: [
          { index: true, element: <pg.YsaFairPrograms /> },
          { path: 'fair-programme/:id?', element: <pg.YsaFairProgram /> },
        ],
      },
      { path: 'news-events', element: <pg.YsaNewsEvents /> },
      {
        path: 'youth-hostels',
        children: [
          { index: true, element: <pg.YsaHostelsList /> },
          { path: 'youth-hostel/:id?', element: <pg.YsaYouthHostel /> },
          { path: 'how-to-book', element: <pg.YsaHowToBook /> },
        ],
      },
      {
        path: 'photo-galleries',
        children: [
          { index: true, element: <pg.YsaPhotoGalleries /> },
          { path: 'photo-gallery/:id?', element: <pg.YsaPhotoGallery /> },
        ],
      },
      { path: 'e-tenders', element: <pg.YsaEtenders /> },
      { path: 'homepage-scrollers', element: <pg.YsaHomepageScroller /> },
    ],
  },
  // Youth Services CMS routes end

  // Youth Services website routes start
  {
    path: ysw,
    element: <pg.YswLayout />,
    children: [],
  },
  // Youth Services website routes end
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
