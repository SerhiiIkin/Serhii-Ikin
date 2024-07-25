import type { DashboardLayoutProps } from '@modules/DashboardLayoutProps';
import { dashboardLinks } from '@variables/dashboardLinks';

import DropDown from '@components/DropDown';
import NavLink from '@components/NavLink';

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <nav className="flex justify-center gap-2 py-2">
        {dashboardLinks.map((link, index) => {
          if (link?.title) {
            return (
              <DropDown key={index} links={link.links} title={link.title} />
            );
          } else if (link.name) {
            return (
              <NavLink
                to={link.to}
                key={index}
                className={'xl:hover:text-primaryDarkBlue'}
              >
                {link.name}
              </NavLink>
            );
          }
        })}
      </nav>
      {children}
    </>
  );
};

export default DashboardLayout;
