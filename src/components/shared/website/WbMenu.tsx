import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

const WbMenu = ({ menu }: { menu: WebsiteMenuProps }) => {
  const [isHover, setIsHover] = useState(false);

  const hasSubMenu = !!menu.subMenus?.length;

  // safer Tailwind classes
  const gridColsClass =
    menu.gridCols === 3
      ? 'grid-cols-3'
      : menu.gridCols === 2
        ? 'grid-cols-2'
        : 'grid-cols-1';

  const widthClass =
    menu.gridCols === 3
      ? 'min-w-xl'
      : menu.gridCols === 2
        ? 'min-w-md'
        : 'min-w-56';

  return (
    <motion.li
      className="group/link relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* main menu */}
      <Link
        to={menu.link || '#'}
        className="flex items-center gap-1 cursor-pointer px-2 py-2.5 bg-primary/30 hover:bg-primary/40 duration-200 text-white tracking-widest text-xs"
      >
        {menu.name}

        {hasSubMenu && (
          <ChevronDown className="size-4 transition-transform duration-200 group-hover/link:rotate-180" />
        )}
      </Link>

      {/* submenu */}
      <AnimatePresence>
        {hasSubMenu && isHover && (
          <>
            <div className="absolute left-0 top-full h-3 w-full" />
            <motion.div
              initial={{ opacity: 0, rotateX: -15, y: 10 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, rotateX: -15, y: 10 }}
              transition={{ duration: 0.15 }}
              className={`sub-menu absolute top-full left-0 mt-1 ${widthClass} bg-primary`}
              style={{ transformOrigin: 'top center' }}
            >
              <div className={`grid ${gridColsClass} gap-4`}>
                {menu.subMenus?.map((subMenu, index) => (
                  <Link
                    to={subMenu.link}
                    key={index}
                    className="relative cursor-pointer"
                  >
                    <div className="flex items-center gap-x-4 group/menubox">
                      {/* icon */}
                      <div className="bg-white/20 w-fit p-2 rounded-md group-hover/menubox:bg-white/40 duration-300">
                        {subMenu.icon && (
                          <subMenu.icon className="size-4 text-white transition-colors duration-300 group-hover/menubox:text-white" />
                        )}
                      </div>

                      {/* label */}
                      <h6 className="text-white dark:text-white text-sm transition-colors duration-300 group-hover/menubox:text-white">
                        {subMenu.name}
                      </h6>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.li>
  );
};
export default WbMenu;
