import type { NavLinkProps } from 'react-router-dom';
import { NavLink as NavLinkRouter } from 'react-router-dom';

import { classes } from '@utils/classes';

const NavLink = ({ to, children, className }: NavLinkProps) => {
  return (
    <NavLinkRouter
      to={to}
      className={({ isPending }) =>
        classes([
          `text-primaryLigth relative mr-2 last:mr-0`,
          'xl:hover:text-primaryLigthBlue xl:after:absolute xl:after:bottom-[-2px] xl:after:left-[50%] xl:after:h-[2px] xl:after:w-0 xl:after:bg-gradient-to-r xl:after:from-green-400 xl:after:to-orange-500 xl:after:transition-all xl:after:duration-1000 xl:after:content-[""] xl:hover:after:left-0 xl:hover:after:w-full',
          className ? (className as string) : '',
          isPending ? 'opacity-50' : '',
        ])
      }
    >
      {children}
    </NavLinkRouter>
  );
};

export default NavLink;
