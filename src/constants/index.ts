import logo from '@/assets/images/sports-logo.png';
import nicLogo from '@/assets/images/NIC_Logo.png';
import spSignin from '@/assets/images/sp-signin.jpg';
import profileImg from '@/assets/images/000m.jpg';
import nationalEmblem from '@/assets/images/national-emblem.png';
import cmImg from '@/assets/images/subhendu.jpeg';
import micImg from '@/assets/images/Shri_Nisith_Pramanik_Minister.jpeg';
import demoImg from '@/assets/images/demo.jpg';
import defaultBanner from '@/assets/images/default_banner.png';
// Icons used throughout
import { GrAttachment } from 'react-icons/gr';
import { SlCloudDownload } from 'react-icons/sl';
import { FaRegBuilding, FaUserTie } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { FiPhone } from 'react-icons/fi';
import { MdMailOutline } from 'react-icons/md';
import { FiGlobe } from 'react-icons/fi';
import { GiSoccerBall } from 'react-icons/gi';
import { TfiGallery } from 'react-icons/tfi';

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
  defaultBanner,
};

// -------------------------------

export const icons = {
  GrAttachment,
  download: SlCloudDownload,
  user: FaUserTie,
  building: FaRegBuilding,
  location: IoLocationOutline,
  phone: FiPhone,
  email: MdMailOutline,
  internet: FiGlobe,
  football: GiSoccerBall,
  photoGallery: TfiGallery,
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

export const achievementCategories = [
  { label: 'Archery', value: 'archery' },
  { label: 'Athletics', value: 'athletics' },
  { label: 'Badminton', value: 'badminton' },
  { label: 'Billiards & Snooker', value: 'billiards-snooker' },
  { label: 'Boxing', value: 'boxing' },
  { label: 'Chess', value: 'chess' },
  { label: 'Cricket', value: 'cricket' },
  { label: 'Cycling', value: 'cycling' },
  { label: 'Football', value: 'football' },
  { label: 'Hockey', value: 'hockey' },
  { label: 'Kabaddi & Weightlifting', value: 'kabaddi-weightlifting' },
  { label: 'Lawn Tennis', value: 'lawn-tennis' },
  { label: 'Paralympic Athletics', value: 'paralympic-athletics' },
  { label: 'Posthumous Award', value: 'posthumous-award' },
  { label: 'Shooting', value: 'shooting' },
  { label: 'Table Tennis', value: 'table-tennis' },
  { label: 'Waterpolo', value: 'waterpolo' },
  { label: 'Weightlifting', value: 'weightlifting' },
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
];
