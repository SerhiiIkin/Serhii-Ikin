import type { DashboardLayoutProps } from '@modules/DashboardLayoutProps';

import NavLink from '@components/NavLink';

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const dashboardLinks = [
    {
      name: 'Ny project',
      to: '/dashboard/newProject',
    },
    {
      name: 'Rediger project',
      to: '/dashboard/editProject',
    },
    {
      name: 'Chat',
      to: '/dashboard/chat',
    },
  ];

  return (
    <>
      <nav className="flex justify-center gap-2 py-2">
        {dashboardLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className="xl:hover:text-primaryDarkBlue"
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
      {children}
    </>
  );
};

export default DashboardLayout;
