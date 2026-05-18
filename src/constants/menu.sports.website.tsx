import {
  Award,
  BriefcaseBusiness,
  Camera,
  Eye,
  FileAudio,
  Files,
  House,
  Landmark,
  List,
  ListCheck,
  ListChecks,
  MapPinned,
  Medal,
  Navigation,
  NotebookPen,
  Rss,
  Settings,
  Shapes,
  Shell,
  ShieldUser,
  SquareCheckBig,
  Trophy,
  Volleyball,
} from 'lucide-react';
import { titles } from '.';

function sportsWebsiteMenus() {
  const menus: IWebsiteMenuProps[] = [
    {
      name: 'Home',
      link: `/${titles.SPORTS_WEB_URL}`,
      icon: House,
    },
    {
      name: 'About Us',
      subMenus: [
        {
          name: 'Vision & Mission',
          desc: 'NA',
          icon: Eye,
          link: `/${titles.SPORTS_WEB_URL}/vision-mission`,
        },
        {
          name: 'Sports in Bengal',
          desc: 'NA',
          icon: Volleyball,
          link: `/${titles.SPORTS_WEB_URL}/sports-in-bengal`,
        },
        {
          name: 'Administrative Structure',
          desc: 'NA',
          icon: ShieldUser,
          link: `/${titles.SPORTS_WEB_URL}/administrative-structure`,
        },
        {
          name: 'Key Personnel',
          desc: 'NA',
          icon: Award,
          link: `/${titles.SPORTS_WEB_URL}/key-personnel`,
        },
        {
          name: 'Achievements',
          desc: 'NA',
          icon: Medal,
          link: `/${titles.SPORTS_WEB_URL}/achievements`,
        },
      ],
      gridCols: 2,
    },
    {
      name: 'Sports',
      subMenus: [
        {
          name: 'Sports Categories',
          desc: 'NA',
          icon: Shapes,
          link: `/${titles.SPORTS_WEB_URL}/sports-categories`,
        },
        {
          name: 'Sports Personnel',
          desc: 'NA',
          icon: BriefcaseBusiness,
          link: `/${titles.SPORTS_WEB_URL}/sports-personnel`,
        },
        {
          name: 'Sports Events',
          desc: 'NA',
          icon: MapPinned,
          link: `/${titles.SPORTS_WEB_URL}/sports-events`,
        },
        {
          name: 'Sports Infrastructure',
          desc: 'NA',
          icon: Settings,
          link: `/${titles.SPORTS_WEB_URL}/sports-infrastructure`,
        },
      ],
      gridCols: 1,
    },
    {
      name: 'WBS Council of Sports',
      subMenus: [
        {
          name: 'Advisory Board',
          desc: 'NA',
          icon: ListChecks,
          link: `/${titles.SPORTS_WEB_URL}/wbs-advisory-board`,
        },
        {
          name: 'Working Committee',
          desc: 'NA',
          icon: ListCheck,
          link: `/${titles.SPORTS_WEB_URL}/wbs-working-committee`,
        },
        {
          name: 'Events',
          desc: 'NA',
          icon: MapPinned,
          link: `/${titles.SPORTS_WEB_URL}/wbs-events`,
        },
        {
          name: 'Khelo India',
          desc: 'NA',
          icon: Medal,
          link: `/${titles.SPORTS_WEB_URL}/khelo-india`,
        },
      ],
      gridCols: 1,
    },
    {
      name: 'Announcements',
      subMenus: [
        {
          name: 'Notices',
          desc: 'NA',
          icon: SquareCheckBig,
          link: `/${titles.SPORTS_WEB_URL}/announcements/notices`,
        },
        {
          name: 'Circulars',
          desc: 'NA',
          icon: Navigation,
          link: `/${titles.SPORTS_WEB_URL}/announcements/circulars`,
        },
        {
          name: 'Tenders',
          desc: 'NA',
          icon: Files,
          link: `/${titles.SPORTS_WEB_URL}/announcements/tenders`,
        },
        {
          name: 'Advertisements',
          desc: 'NA',
          icon: NotebookPen,
          link: `/${titles.SPORTS_WEB_URL}/advertisements`,
        },
        {
          name: 'Guiding Principles',
          desc: 'NA',
          icon: List,
          link: `/${titles.SPORTS_WEB_URL}/guiding-principles`,
        },
      ],
      gridCols: 2,
    },
    {
      name: 'Achievements & Awards',
      subMenus: [
        {
          name: 'Players Achievements',
          desc: 'NA',
          icon: Trophy,
          link: `/${titles.SPORTS_WEB_URL}/players-achievements`,
        },
        {
          name: 'Awards',
          desc: 'NA',
          icon: Medal,
          link: `/${titles.SPORTS_WEB_URL}/awards`,
        },
      ],
      gridCols: 1,
    },
    {
      name: 'Information About',
      subMenus: [
        {
          name: 'Stadiums',
          desc: 'NA',
          icon: House,
          link: `/${titles.SPORTS_WEB_URL}/stadiums`,
        },
        {
          name: 'Associations',
          desc: 'NA',
          icon: Landmark,
          link: `/${titles.SPORTS_WEB_URL}/associations`,
        },
        {
          name: 'FIFA U-17 World Cup',
          desc: 'NA',
          icon: Volleyball,
          link: `/${titles.SPORTS_WEB_URL}/fifa-u17-wc`,
        },
        {
          name: 'Sports Policies',
          desc: 'NA',
          icon: List,
          link: `/${titles.SPORTS_WEB_URL}/sports-policies`,
        },
        {
          name: 'Associated Sites',
          desc: 'NA',
          icon: Navigation,
          link: `/${titles.SPORTS_WEB_URL}/associated-sites`,
        },
      ],
      gridCols: 2,
    },
    {
      name: 'Moments',
      subMenus: [
        {
          name: 'Photo Galleries',
          desc: 'NA',
          icon: Camera,
          link: `/${titles.SPORTS_WEB_URL}/photo-galleries`,
        },
        {
          name: 'Audio Visuals',
          desc: 'NA',
          icon: FileAudio,
          link: `/${titles.SPORTS_WEB_URL}/audio-visuals`,
        },
        {
          name: 'Bulletins',
          desc: 'NA',
          icon: ListCheck,
          link: `/${titles.SPORTS_WEB_URL}/bulletins`,
        },
        {
          name: 'Amphan',
          desc: 'NA',
          icon: Shell,
          link: `/${titles.SPORTS_WEB_URL}/amphan`,
        },
      ],
      gridCols: 1,
    },
    {
      name: 'RTI',
      subMenus: [
        {
          name: 'RTI Act 2005',
          desc: 'NA',
          icon: Rss,
          link: `/${titles.SPORTS_WEB_URL}/rti-act-2005`,
        },
        {
          name: 'RTI Rules 2006',
          desc: 'NA',
          icon: Rss,
          link: `/${titles.SPORTS_WEB_URL}/rti-rules-2006`,
        },
        {
          name: 'Notices',
          desc: 'NA',
          icon: ListCheck,
          link: `/${titles.SPORTS_WEB_URL}/rti-notices`,
        },
      ],
      gridCols: 1,
    },
  ];

  return menus;
}
export default sportsWebsiteMenus;
