import { MdOutlineFolderCopy } from 'react-icons/md';
import { LuCircleUserRound } from 'react-icons/lu';
import { MdOutlineHome } from 'react-icons/md';
import { FaRegImage, FaRegImages } from 'react-icons/fa';
import { RiComputerLine } from 'react-icons/ri';
import { LuMountainSnow } from 'react-icons/lu';
import { MdOutlineRssFeed, MdRssFeed } from 'react-icons/md';
import { FaRegBuilding, FaRegFolderOpen } from 'react-icons/fa';

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
            title: 'About Department',
            url: `${titles.SERVICES_APP_URL}/about-us/about-department`,
          },
          {
            title: 'Organisation Chart',
            url: `${titles.SERVICES_APP_URL}/about-us/organisation-chart`,
          },
          {
            title: 'Address Department / Director',
            url: `${titles.SERVICES_APP_URL}/about-us/address-department`,
          },
          {
            title: 'District / Block Offices',
            url: `${titles.SERVICES_APP_URL}/about-us/district-offices`,
          },
          {
            title: 'Helpline',
            url: `${titles.SERVICES_APP_URL}/about-us/helpline`,
          },
        ] as ISubmenu[],
      },
      {
        title: 'Youth Training Program',
        url: '#',
        icon: RiComputerLine,
        isActive:
          pathname.includes(
            `${titles.SERVICES_APP_URL}/youth-training-program/`,
          ) ?? false,
        items: [
          {
            title: 'Computer Training',
            url: `#`,
            isActive:
              pathname.includes(
                `${titles.SERVICES_APP_URL}/youth-training-program/computer-training/`,
              ) ?? false,
            items: [
              {
                title: 'Course Details',
                url: `${titles.SERVICES_APP_URL}/youth-training-program/computer-training/course-details`,
              },
              {
                title: 'Course Syllabus (PDF)',
                url: `${titles.SERVICES_APP_URL}/youth-training-program/computer-training/course-syllabus`,
              },
              {
                title: 'Training Centres',
                url: `${titles.SERVICES_APP_URL}/youth-training-program/computer-training/training-centres`,
              },
            ] as ISubSubmenu[],
          },
          {
            title: 'Vocational Training',
            url: `#`,
            isActive:
              pathname.includes(
                `${titles.SERVICES_APP_URL}/youth-training-program/vocational-training/`,
              ) ?? false,
            items: [
              {
                title: 'Schemes',
                url: `${titles.SERVICES_APP_URL}/youth-training-program/vocational-training/schemes`,
              },
              {
                title: 'Training Centres',
                url: `${titles.SERVICES_APP_URL}/youth-training-program/vocational-training/training-centres`,
              },
            ] as ISubSubmenu[],
          },
        ] as ISubmenu[],
      },
      {
        title: 'Mountaineering',
        url: '#',
        icon: LuMountainSnow,
        isActive:
          pathname.includes(`${titles.SERVICES_APP_URL}/mountaineering/`) ??
          false,
        items: [
          {
            title: 'General Body Members',
            url: `${titles.SERVICES_APP_URL}/mountaineering/general-body-members`,
          },
          {
            title: 'Course Details',
            url: `${titles.SERVICES_APP_URL}/mountaineering/course-details`,
          },
        ] as ISubmenu[],
      },
      {
        title: 'Fair & Programs',
        url: `${titles.SERVICES_APP_URL}/fair-programmes`,
        icon: FaRegImage,
        isActive: pathname === `${titles.SERVICES_APP_URL}/fair-programmes`,
      },
      {
        title: 'News & Events',
        url: `${titles.SERVICES_APP_URL}/news-events`,
        icon: MdOutlineRssFeed,
        isActive: pathname === `${titles.SERVICES_APP_URL}/news-events`,
      },
      {
        title: 'Youth Hostels',
        url: '#',
        icon: FaRegBuilding,
        isActive:
          pathname.includes(`${titles.SERVICES_APP_URL}/youth-hostels/`) ??
          false,
        items: [
          {
            title: 'List of Hostels',
            url: `${titles.SERVICES_APP_URL}/youth-hostels`,
          },
          {
            title: 'How to Book',
            url: `${titles.SERVICES_APP_URL}/youth-hostels/how-to-book`,
          },
        ] as ISubmenu[],
      },
      {
        title: 'Photo Gallery',
        url: `${titles.SERVICES_APP_URL}/photo-galleries`,
        icon: FaRegImages,
        isActive: pathname === `${titles.SERVICES_APP_URL}/photo-galleries`,
      },
      {
        title: 'E-Tenders',
        url: `${titles.SERVICES_APP_URL}/e-tenders`,
        icon: FaRegFolderOpen,
        isActive: pathname === `${titles.SERVICES_APP_URL}/e-tenders`,
      },
      {
        title: 'Homepage Scroller',
        url: `${titles.SERVICES_APP_URL}/homepage-scrollers`,
        icon: MdRssFeed,
        isActive: pathname === `${titles.SERVICES_APP_URL}/homepage-scrollers`,
      },
    ] as IMenu[],

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
