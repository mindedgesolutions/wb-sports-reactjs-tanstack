import { MdOutlineFolderCopy } from 'react-icons/md';
import { PiSoccerBallFill } from 'react-icons/pi';
import { MdOutlineGroups } from 'react-icons/md';
import { IoMicOutline } from 'react-icons/io5';
import { HiOutlineTrophy } from 'react-icons/hi2';
import { LuCircleUserRound } from 'react-icons/lu';
import { MdOutlineHome } from 'react-icons/md';
import { Headphones, Images, Info, Newspaper, Rss } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { titles } from '.';

export const sportsAppMenu = () => {
  const { pathname } = useLocation();

  const spAppMenu = {
    navMain: [
      {
        title: 'Dashboard',
        url: `${titles.SPORTS_APP_URL}/dashboard`,
        icon: MdOutlineHome,
        isActive: pathname === `${titles.SPORTS_APP_URL}/dashboard`,
      },
      {
        title: 'About Us',
        url: '#',
        icon: MdOutlineFolderCopy,
        isActive:
          pathname.includes(`${titles.SPORTS_APP_URL}/about-us/`) ?? false,
        items: [
          {
            title: 'Vision & Mission',
            url: `${titles.SPORTS_APP_URL}/about-us/vision-mission`,
          },
          {
            title: 'Sports in Bengal',
            url: `${titles.SPORTS_APP_URL}/about-us/sports-in-bengal`,
          },
          {
            title: 'Administrative Structure',
            url: `${titles.SPORTS_APP_URL}/about-us/administrative-structure`,
          },
          {
            title: 'Key Personnel',
            url: `${titles.SPORTS_APP_URL}/about-us/key-personnel`,
          },
          {
            title: 'Achievements',
            url: `${titles.SPORTS_APP_URL}/about-us/achievements`,
          },
        ],
      },
      {
        title: 'Sports',
        url: '#',
        icon: PiSoccerBallFill,
        isActive:
          pathname.includes(`${titles.SPORTS_APP_URL}/sports/`) ?? false,
        items: [
          {
            title: 'Sports Categories',
            url: `${titles.SPORTS_APP_URL}/sports/sports-categories`,
          },
          {
            title: 'Sports Personnel',
            url: `${titles.SPORTS_APP_URL}/sports/sports-personnel`,
          },
          {
            title: 'Sports Events',
            url: `${titles.SPORTS_APP_URL}/sports/sports-events`,
          },
          {
            title: 'Sports Infrastructure',
            url: `${titles.SPORTS_APP_URL}/sports/sports-infrastructure`,
          },
        ],
      },
      {
        title: 'WBS Council of Sports',
        url: '#',
        icon: MdOutlineGroups,
        isActive:
          pathname.includes(`${titles.SPORTS_APP_URL}/wbs-council/`) ?? false,
        items: [
          {
            title: 'WBS Council Members',
            url: `${titles.SPORTS_APP_URL}/wbs-council/wbs-council-members`,
          },
          {
            title: 'Events',
            url: `${titles.SPORTS_APP_URL}/wbs-council/wbs-events`,
          },
          {
            title: 'Khelo India',
            url: `${titles.SPORTS_APP_URL}/wbs-council/khelo-india`,
          },
        ],
      },
      {
        title: 'Announcements',
        url: '#',
        icon: IoMicOutline,
        isActive:
          pathname.includes(`${titles.SPORTS_APP_URL}/announcements/`) ?? false,
        items: [
          {
            title: 'Announcements',
            url: `${titles.SPORTS_APP_URL}/announcements/announcements`,
          },
          {
            title: 'Advertisements',
            url: `${titles.SPORTS_APP_URL}/announcements/advertisements`,
          },
          {
            title: 'Guiding Principles',
            url: `${titles.SPORTS_APP_URL}/announcements/guiding-principles`,
          },
        ],
      },
      {
        title: 'Achievements & Awards',
        url: '#',
        icon: HiOutlineTrophy,
        isActive:
          pathname.includes(`${titles.SPORTS_APP_URL}/achievements-awards/`) ??
          false,
        items: [
          {
            title: 'Players Achievements',
            url: `${titles.SPORTS_APP_URL}/achievements-awards/players-achievements`,
          },
          {
            title: 'Awards',
            url: `${titles.SPORTS_APP_URL}/achievements-awards/awards`,
          },
        ],
      },
      {
        title: 'Information About',
        url: '#',
        icon: Info,
        isActive:
          pathname.includes(`${titles.SPORTS_APP_URL}/info-about/`) ?? false,
        items: [
          {
            title: 'Stadiums',
            url: `${titles.SPORTS_APP_URL}/info-about/stadiums`,
          },
          {
            title: 'Associations',
            url: `${titles.SPORTS_APP_URL}/info-about/associations`,
          },
          {
            title: 'FIFA U-17 World Cup',
            url: `${titles.SPORTS_APP_URL}/info-about/fifa-u17`,
          },
          {
            title: 'Sports Policies',
            url: `${titles.SPORTS_APP_URL}/info-about/sports-policies`,
          },
          {
            title: 'Associated Sites',
            url: `${titles.SPORTS_APP_URL}/info-about/assoc-sites`,
          },
        ],
      },
      {
        title: 'Moments',
        url: '#',
        icon: Images,
        isActive:
          pathname.includes(`${titles.SPORTS_APP_URL}/moments/`) ?? false,
        items: [
          {
            title: 'Photo Gallery',
            url: `${titles.SPORTS_APP_URL}/moments/photo-galleries`,
          },
          {
            title: 'Audio Visuals',
            url: `${titles.SPORTS_APP_URL}/moments/audio-visuals`,
          },
          {
            title: 'Bulletins',
            url: `${titles.SPORTS_APP_URL}/moments/bulletins`,
          },
          {
            title: 'Amphan',
            url: `${titles.SPORTS_APP_URL}/moments/amphan`,
          },
        ],
      },
      {
        title: 'RTI',
        url: '#',
        icon: Rss,
        isActive: pathname.includes(`${titles.SPORTS_APP_URL}/rti/`) ?? false,
        items: [
          {
            title: 'Notices',
            url: `${titles.SPORTS_APP_URL}/rti/notices`,
          },
        ],
      },
      {
        title: 'Contact Us',
        url: `${titles.SPORTS_APP_URL}/dashboard`,
        icon: Headphones,
        isActive: true,
      },
      {
        title: 'New Scroller (Homepage)',
        url: `${titles.SPORTS_APP_URL}/dashboard`,
        icon: Newspaper,
        isActive: true,
      },
    ],
    settings: [
      {
        title: 'Profile',
        url: '#',
        icon: LuCircleUserRound,
        isActive: true,
        items: [
          {
            title: 'Personal Information',
            url: '#',
          },
          {
            title: 'Change Password',
            url: '#',
          },
        ],
      },
    ],
  };

  const spWebMenu = {};

  return { spAppMenu, spWebMenu };
};
