import { MdOutlineFolderCopy } from 'react-icons/md';
import { LuCircleUserRound } from 'react-icons/lu';
import { MdOutlineHome } from 'react-icons/md';
import { FaRegImage } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { titles } from '.';

export const servicesAppMenu = () => {
  const { pathname } = useLocation();

  const spAppMenu = {
    navMain: [
      {
        title: 'Dashboard',
        url: `${titles.SERVICES_APP_URL}/dashboard`,
        icon: MdOutlineHome,
        isActive: pathname === `${titles.SERVICES_APP_URL}/dashboard`,
      },
      {
        title: 'Banners',
        url: `${titles.SERVICES_APP_URL}/banners`,
        icon: FaRegImage,
        isActive: pathname === `${titles.SERVICES_APP_URL}/banners`,
      },
      {
        title: 'About Us',
        url: '#',
        icon: MdOutlineFolderCopy,
        isActive:
          pathname.includes(`${titles.SERVICES_APP_URL}/about-us/`) ?? false,
        items: [
          {
            title: 'District / Block Offices',
            url: `${titles.SERVICES_APP_URL}/about-us/district-offices`,
          },
          {
            title: 'Organisation Chart',
            url: `${titles.SERVICES_APP_URL}/about-us/organisation-chart`,
          },
        ],
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
            title: 'Update Profile',
            url: `${titles.SERVICES_APP_URL}/profile`,
          },
        ],
      },
    ],
  };

  const spWebMenu = {};

  return { spAppMenu, spWebMenu };
};
