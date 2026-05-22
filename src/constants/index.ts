import logo from '@/assets/images/sports-logo.png';
import nicLogo from '@/assets/images/NIC_Logo.png';
import spSignin from '@/assets/images/sp-signin.jpg';
import profileImg from '@/assets/images/000m.jpg';
import nationalEmblem from '@/assets/images/national-emblem.png';
import cmImg from '@/assets/images/subhendu.jpeg';
import micImg from '@/assets/images/Shri_Nisith_Pramanik_Minister.jpeg';
import demoImg from '@/assets/images/demo.jpg';
// Icons used throughout
import { GrAttachment } from 'react-icons/gr';

export const titles = {
  SPORTS_APP_NAME: import.meta.env.VITE_SPORTS_APP_NAME,
  SPORTS_APP_URL: import.meta.env.VITE_SPORTS_APP_ROOT_URL,
  SPORTS_WEB_URL: import.meta.env.VITE_SPORTS_WEB_ROOT_URL,

  SERVICES_APP_NAME: import.meta.env.VITE_SERVICES_APP_NAME,
  SERVICES_APP_URL: import.meta.env.VITE_SERVICES_APP_ROOT_URL,
  SERVICES_WEB_URL: import.meta.env.VITE_SERVICES_WEB_ROOT_URL,

  BASE_URL: import.meta.env.VITE_BASE_URL,

  ACCESS_TOKEN_SPORTS: import.meta.env.VITE_ACCESS_TOKEN_KEY_SPORTS,
  REFRESH_TOKEN_SPORTS: import.meta.env.VITE_REFRESH_TOKEN_KEY_SPORTS,

  ACCESS_TOKEN_SERVICES: import.meta.env.VITE_ACCESS_TOKEN_KEY_SERVICES,
  REFRESH_TOKEN_SERVICES: import.meta.env.VITE_REFRESH_TOKEN_KEY_SERVICES,

  FOOTER_TEXT_SPORTS: import.meta.env.VITE_FOOTER_TEXT_SPORTS,
  FOOTER_TEXT_SERVICES: import.meta.env.VITE_FOOTER_TEXT_SERVICES,
  FOOTER_TEXT_COMMON: import.meta.env.VITE_FOOTER_TEXT_COMMON,
};

// -------------------------------

export const images = {
  logo,
  nicLogo,
  spSignin,
  profileImg,
  nationalEmblem,
  cmImg,
  micImg,
  demoImg,
};

// -------------------------------

export const icons = {
  GrAttachment,
};

// -------------------------------

export const sportsCategories = [
  { label: 'Football', value: 'football' },
  { label: 'Cricket', value: 'cricket' },
  { label: 'Hockey', value: 'hockey' },
  { label: 'Lawn Tennis', value: 'lawn-tennis' },
  { label: 'Swimming', value: 'swimming' },
  { label: 'Table Tennis', value: 'table-tennis' },
  { label: 'Archery', value: 'archery' },
  { label: 'Body Building', value: 'body-building' },
  { label: 'Chess', value: 'chess' },
  { label: 'Boxing', value: 'boxing' },
  { label: 'Athletics', value: 'athletics' },
  { label: 'Gymnastic', value: 'gymnastic' },
];

// -------------------------------

export const wbsCommitteeTypes = [
  { label: 'Advisory Board', value: 'advisory-board' },
  { label: 'Working Committee', value: 'working-committee' },
];

// -------------------------------

export const spAnnouncementTypes = [
  { label: 'Notice', value: 'notice' },
  { label: 'Circular', value: 'circular' },
  { label: 'Tender', value: 'tender' },
];

// -------------------------------

export const homepageMentions: IHomepageMention[] = [
  {
    name: 'Suvendu Adhikari',
    designation: `Hon'ble Chief Minister`,
    image: images.cmImg,
  },
  {
    name: 'Nisith Pramanik',
    designation: `Hon'ble MIC`,
    image: images.micImg,
  },
  {
    name: 'Ashok Dinda',
    designation: `Hon'ble MOS`,
  },
];
