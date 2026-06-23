import { images, titles } from '@/constants';
import { Link } from 'react-router-dom';

const links = [
  {
    label: 'Vision & Mission',
    value: `${titles.SPORTS_WEB_URL}/vision-mission`,
  },
  {
    label: 'Notices',
    value: `${titles.SPORTS_WEB_URL}/announcements/notice`,
  },
  {
    label: 'Tenders',
    value: `${titles.SPORTS_WEB_URL}/announcements/tender`,
  },
  {
    label: 'Circulars',
    value: `${titles.SPORTS_WEB_URL}/announcements/circular`,
  },
  {
    label: 'Stadiums',
    value: `${titles.SPORTS_WEB_URL}/stadiums`,
  },
  {
    label: 'Photo Galleries',
    value: `${titles.SPORTS_WEB_URL}/photo-galleries`,
  },
  {
    label: 'Key Personnel',
    value: `${titles.SPORTS_WEB_URL}/key-personnel`,
  },
  {
    label: 'Achievements',
    value: `${titles.SPORTS_WEB_URL}/achievements`,
  },
  {
    label: 'Contact Us',
    value: `${titles.SPORTS_WEB_URL}/contact-us`,
  },
  {
    label: 'Feedback',
    value: `${titles.SPORTS_WEB_URL}/feedback`,
  },
  {
    label: 'Privacy Policies',
    value: `${titles.SPORTS_WEB_URL}/privacy-policies`,
  },
  {
    label: 'Site Map',
    value: `${titles.SPORTS_WEB_URL}/site-map`,
  },
];

const relativePath = '../../../../../';

const fimages = [
  `${relativePath}sports/chess.jpg`,
  `${relativePath}sports/football.jpg`,
  `${relativePath}sports/kho_kho.png`,
  `${relativePath}sports/hockey1_1.jpg`,
  `${relativePath}sports/cricket.jpg`,
  `${relativePath}sports/football-2.jpg`,
];

const SpwFooterTop = () => {
  return (
    <div className="flex flex-col">
      <div
        className="w-full h-20 bg-repeat-x dark:block"
        style={{
          backgroundImage: "url('/kolkata.png')",
          backgroundSize: 'auto 100%',
        }}
      />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-1 py-4 md:py-16 pr-4 flex justify-center items-center gap-4">
          <div>
            <img
              src={images.nationalEmblem}
              alt="National Emblem"
              className="h-12 md:h-28 block dark:hidden"
            />
            <img
              src={images.nationalEmblemInverted}
              alt="National Emblem"
              className="hidden h-12 md:h-28 dark:block"
            />
          </div>
          <div className="flex flex-col gap-0.5 md:gap-1 text-sm md:text-lg font-bold font-oswald uppercase">
            <span>department of youth services</span>
            <span>and sports (sports wing)</span>
          </div>
        </div>
        <div className="col-span-1 p-2 md:p-4 flex justify-center items-center">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {links.map((link) => (
              <Link key={link.value} to={link.value} className="col-span-1">
                <div className="text-[11px] font-inter font-medium tracking-wider bg-muted p-3 md:p-3.5 border text-center hover:bg-muted-foreground/20 transition delay-75">
                  {link.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="col-span-1 p-2 md:p-8">
          <div className="grid grid-cols-6 md:grid-cols-3 max-w-84 float-right gap-1">
            {fimages.map((img, index) => (
              <div key={index} className="col-span-1">
                <img src={img} className="w-full h-12 md:h-24 object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SpwFooterTop;
