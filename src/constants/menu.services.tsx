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
        ],
      },
      {
        title: 'Youth Training Program',
        url: '#',
        icon: MdOutlineFolderCopy,
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
            title: 'Course Syllabus',
            url: `${titles.SERVICES_APP_URL}/youth-training-program/computer-training/course-syllabus`,
          },
          {
            title: 'Training Centres',
            url: `${titles.SERVICES_APP_URL}/youth-training-program/computer-training/training-centres`,
          },
          {
            title: 'Vocational Training',
            url: `${titles.SERVICES_APP_URL}/youth-traning-program/vocational-training`,
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
