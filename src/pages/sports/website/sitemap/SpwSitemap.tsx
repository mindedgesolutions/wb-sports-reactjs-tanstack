import { SpwPageBanner, SpwSectionWrapper } from '@/components';
import { titles } from '@/constants';
import sportsWebsiteMenus from '@/constants/menu.sports.website';
import { Link } from 'react-router-dom';

const SpwSitemap = () => {
  document.title = `Site Map | ${titles.SPORTS_APP_NAME}`;
  const menus = sportsWebsiteMenus();

  return (
    <>
      <SpwPageBanner title="Site Map" />
      <SpwSectionWrapper className="max-w-7xl mx-auto">
        <ol className="list-disc list-inside md:list-outside marker:text-primary marker:text-sm md:marker:text-2xl">
          {menus.map((menu: IWebsiteMenuProps) => {
            if (!menu.subMenus) {
              return (
                <li
                  key={menu.link}
                  className="mb-2 text-xs md:text-sm font-inter last-of-type:mb-0 ml-0 md:ml-4 text-justify"
                >
                  <Link
                    to={`${titles.SPORTS_WEB_URL}`}
                    className="hover:text-success"
                  >
                    {menu.name}
                  </Link>
                </li>
              );
            } else {
              return (
                <li
                  key={menu.link}
                  className="mb-2 text-xs md:text-sm font-inter last-of-type:mb-0 ml-0 md:ml-4 text-justify"
                >
                  {menu.name}
                  <ol className="ml-4 list-disc list-inside md:list-outside marker:text-primary marker:text-2xl">
                    {menu.subMenus.map((subMenu: IWebsiteSubMenuProps) => (
                      <li
                        key={subMenu.link}
                        className="text-xs md:text-sm font-inter last-of-type:mb-0 ml-0 md:ml-4 text-justify"
                      >
                        <Link
                          to={`${import.meta.env.VITE_WEBSITE_BASE_URL}${
                            subMenu.link
                          }`}
                          className="hover:text-primary"
                        >
                          {subMenu.name}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </li>
              );
            }
          })}
        </ol>
      </SpwSectionWrapper>
    </>
  );
};
export default SpwSitemap;
