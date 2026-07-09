import nicLogo from '@/assets/images/NIC_Logo.png';
import profileImg from '@/assets/images/000m.jpg';
import nationalEmblem from '@/assets/images/national-emblem.png';
import nationalEmblemInverted from '@/assets/images/national-emblem-inverted.png';
import saImg from '@/assets/images/sports/ministers/subhendu.jpg.jpeg';
import npImg from '@/assets/images/sports/ministers/indranil-khan.jpeg';
import rpImg from '@/assets/images/sports/ministers/rajesh-pandey.jpg';
import demoImg from '@/assets/images/demo.jpg';
import defaultBanner from '@/assets/images/default_banner.png';
// Icons used throughout
import { GrAttachment } from 'react-icons/gr';
import { SlCloudDownload } from 'react-icons/sl';
import {
  FaRegBuilding,
  FaUserTie,
  FaCloudRain,
  FaRegImage,
  FaMobileAlt,
  FaRegCalendarAlt,
} from 'react-icons/fa';
import {
  IoLocationOutline,
  IoDocumentAttachOutline,
  IoBriefcaseOutline,
} from 'react-icons/io5';
import { FiPhone, FiGlobe } from 'react-icons/fi';
import { MdMailOutline, MdNumbers } from 'react-icons/md';
import { GiSoccerBall } from 'react-icons/gi';
import { TfiGallery } from 'react-icons/tfi';
import { BsFiletypePdf, BsChatSquareText } from 'react-icons/bs';
import { FcInfo } from 'react-icons/fc';
import { User } from 'lucide-react';
import { LuIndianRupee } from 'react-icons/lu';
import { HiOutlinePencilAlt } from 'react-icons/hi';

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

  SPORTS_BANNER: import.meta.env.VITE_BANNER_ASPECT_RATO_SPORTS,
  SERVICES_BANNER: import.meta.env.VITE_BANNER_ASPECT_RATO_SERVICES,
};

// -------------------------------

export const images = {
  nicLogo,
  profileImg,
  nationalEmblem,
  saImg,
  npImg,
  demoImg,
  defaultBanner,
  nationalEmblemInverted,
};

// -------------------------------

export const defaultIcons = {
  attachment: GrAttachment,
  fileAttachment: IoDocumentAttachOutline,
  download: SlCloudDownload,
  user: FaUserTie,
  building: FaRegBuilding,
  location: IoLocationOutline,
  phone: FiPhone,
  email: MdMailOutline,
  internet: FiGlobe,
  football: GiSoccerBall,
  photoGallery: TfiGallery,
  banner: FaRegImage,
  pdf: BsFiletypePdf,
  amphan: FaCloudRain,
  info: FcInfo,
  userOutline: User,
  mobile: FaMobileAlt,
  briefcase: IoBriefcaseOutline,
  chat: BsChatSquareText,
  numbers: MdNumbers,
  calendar: FaRegCalendarAlt,
  inr: LuIndianRupee,
  edit: HiOutlinePencilAlt,
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
    name: 'Shri Suvendu Adhikari',
    designation: `Hon'ble Chief Minister`,
    image: saImg,
    gov: 'Government of West Bengal',
    cm: true,
  },
  {
    name: 'Dr. Indranil Khan',
    designation: `MOS (Independent Charge)`,
    image: npImg,
    gov: 'Department of Youth Services and Sports',
    cm: false,
  },
  {
    name: 'Shri Rajesh Pandey',
    designation: 'Additional Chief Secretary',
    image: rpImg,
    gov: 'Department of Youth Services and Sports',
    cm: false,
  },
];

// -------------------------------

export const compCourseTypes = [
  { label: 'Certificate', value: 'certificate' },
  { label: 'Diploma', value: 'diploma' },
  { label: 'Advanced Diploma', value: 'advanced diploma' },
];

export const compCourseDuration = [
  { label: '6 months', value: '6 months' },
  { label: '1 year', value: '1 year' },
  { label: '1 year 6 months', value: '1 year 6 months' },
];
