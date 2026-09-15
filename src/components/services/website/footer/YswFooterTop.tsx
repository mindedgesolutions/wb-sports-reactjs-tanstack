import { images, titles } from '@/constants';
import { Link } from 'react-router-dom';

const links = [
  {
    label: 'About Us',
    value: `${titles.SERVICES_WEB_URL}/about-department`,
  },
  {
    label: 'Org. Chart',
    value: `${titles.SERVICES_WEB_URL}/organisation-chart`,
  },
  {
    label: 'Privacy Policies',
    value: `${titles.SERVICES_WEB_URL}/privacy-policies`,
  },
  {
    label: 'Contact Us',
    value: `${titles.SERVICES_WEB_URL}/contact-us`,
  },
  {
    label: 'E-Tenders',
    value: `${titles.SERVICES_WEB_URL}/e-tenders`,
  },
  {
    label: 'Youth Hostels',
    value: `${titles.SERVICES_WEB_URL}/hostel-list`,
  },
  {
    label: 'Block Offices',
    value: `${titles.SERVICES_WEB_URL}/district-block-offices`,
  },
  {
    label: 'Mountaineering',
    value: `${titles.SERVICES_WEB_URL}/mountaineering`,
  },
  {
    label: 'Feedback',
    value: `${titles.SERVICES_WEB_URL}/feedback`,
  },
  {
    label: 'Privacy Policies',
    value: `${titles.SERVICES_WEB_URL}/privacy-policies`,
  },
  {
    label: 'Site Map',
    value: `${titles.SERVICES_WEB_URL}/site-map`,
  },
  {
    label: 'Site Map',
    value: `${titles.SERVICES_WEB_URL}/site-map`,
  },
];

const relativePath = '../../../../../';

const fimages = [
  `${relativePath}youth-services/footer/chess.jpg`,
  `${relativePath}youth-services/footer/football.jpg`,
  `${relativePath}youth-services/footer/kho_kho.png`,
  `${relativePath}youth-services/footer/hockey1_1.jpg`,
  `${relativePath}youth-services/footer/cricket.jpg`,
  `${relativePath}youth-services/footer/football-2.jpg`,
];

const YswFooterTop = () => {
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
            <span>and sports (youth services wing)</span>
          </div>
        </div>
        <div className="col-span-1 p-2 md:p-4 flex justify-center items-center">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-1">
            {links.map((link) => (
              <Link key={link.value} to={link.value} className="col-span-1">
                <div className="text-[10px] md:text-[11px] font-inter font-medium tracking-wider bg-muted p-3 md:p-3.5 border text-center hover:bg-muted-foreground/20 transition delay-75">
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
                <img
                  src={img}
                  alt={img}
                  className="w-full h-12 md:h-24 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default YswFooterTop;
