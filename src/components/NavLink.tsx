import type { NavLinkProps } from 'react-router-dom';
import { NavLink as NavLinkRouter } from 'react-router-dom';

import { classes } from '@utils/classes';

const NavLink = ({ to, children, className }: NavLinkProps) => {
  return (
    <NavLinkRouter
      to={to}
      className={({ isPending }) =>
        classes([
          `relative mr-2 text-primaryLigth last:mr-0 xl:hover:text-primaryOrange`,
          'xl:after:absolute xl:after:bottom-[-2px] xl:after:left-[50%] xl:after:h-[2px] xl:after:w-0 xl:after:bg-gradient-to-r xl:after:from-primaryLigth xl:after:to-primaryOrange xl:after:transition-all xl:after:duration-1000 xl:after:content-[""] xl:hover:after:left-0 xl:hover:after:w-full',
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
