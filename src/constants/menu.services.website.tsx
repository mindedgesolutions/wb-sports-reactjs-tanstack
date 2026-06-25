import {
  Building,
  CircleHelp,
  ContactRound,
  Headset,
  House,
  Images,
  LaptopMinimalCheck,
  MapPinned,
  MapPlus,
  MountainSnow,
  Navigation,
  PanelsTopLeft,
  Rss,
  Settings,
} from 'lucide-react';
import { titles } from '.';

function serviceWebsiteMenus() {
  const menus: IWebsiteMenuProps[] = [
    {
      name: 'Home',
      link: `${titles.SERVICES_WEB_URL}`,
      icon: House,
    },
    {
      name: 'About Us',
      subMenus: [
        {
          name: 'About the Department',
          desc: 'NA',
          icon: PanelsTopLeft,
          link: `${titles.SERVICES_WEB_URL}/about-department`,
        },
        {
          name: 'Organisation Chart',
          desc: 'NA',
          icon: Settings,
          link: `${titles.SERVICES_WEB_URL}/organisation-chart`,
        },
        {
          name: 'Address of Department / Director',
          desc: 'NA',
          icon: MapPinned,
          link: `${titles.SERVICES_WEB_URL}/address-of-dept-director`,
        },
        {
          name: 'District / Block Offices',
          desc: 'NA',
          icon: MapPlus,
          link: `${titles.SERVICES_WEB_URL}/district-block-offices`,
        },
        {
          name: 'Helpline',
          desc: 'NA',
          icon: Headset,
          link: `${titles.SERVICES_WEB_URL}/helpline`,
        },
      ],
      gridCols: 2,
    },
    // {
    //   name: "Hon'ble MIC",
    //   link: `${titles.SERVICES_WEB_URL}/hon-mic`,
    //   icon: ContactRound,
    // },
    {
      name: 'Youth Training Program',
      subMenus: [
        {
          name: 'Computer Training',
          desc: 'NA',
          icon: LaptopMinimalCheck,
          link: `${titles.SERVICES_WEB_URL}/computer-training`,
        },
        {
          name: 'Vocational Training',
          desc: 'NA',
          icon: Navigation,
          link: `${titles.SERVICES_WEB_URL}/vocational-training`,
        },
      ],
      gridCols: 1,
    },
    {
      name: 'Mountaineering',
      link: `${titles.SERVICES_WEB_URL}/mountaineering`,
      icon: MountainSnow,
    },
    {
      name: 'Fairs & Programmes',
      link: `${titles.SERVICES_WEB_URL}/fairs-programmes`,
      icon: ContactRound,
      gridCols: 2,
    },
    {
      name: 'News & Events',
      link: `${titles.SERVICES_WEB_URL}/news-events`,
      icon: Rss,
      gridCols: 1,
    },
    {
      name: 'Youth Hostel',
      subMenus: [
        {
          name: 'List of the Hostels',
          desc: 'NA',
          icon: Building,
          link: `${titles.SERVICES_WEB_URL}/hostel-list`,
        },
        {
          name: 'How to book Youth Hostel / Phone Number',
          desc: 'NA',
          icon: CircleHelp,
          link: `${titles.SERVICES_WEB_URL}/how-to-book`,
        },
      ],
      gridCols: 1,
    },
    {
      name: 'Photo Gallery',
      link: `${titles.SERVICES_WEB_URL}/photo-gallery`,
      icon: Images,
    },
    {
      name: 'RTI',
      subMenus: [
        {
          name: 'RTI Act 2005',
          desc: 'NA',
          icon: Rss,
          link: `${titles.SERVICES_WEB_URL}/rti-act-2005`,
        },
        {
          name: 'RTI Rules 2006',
          desc: 'NA',
          icon: Rss,
          link: `${titles.SERVICES_WEB_URL}/rti-rules-2006`,
        },
      ],
      gridCols: 1,
    },
  ];

  return menus;
}
export default serviceWebsiteMenus;
