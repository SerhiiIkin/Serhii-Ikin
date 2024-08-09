export const dashboardLinks = [
  {
    title: 'Projects',
    links: [
      {
        name: 'All projects',
        to: '/dashboard',
      },
      {
        name: 'Ny project',
        to: '/dashboard/newProject',
      },
    ],
  },
  {
    title: 'Donate',
    links: [
      {
        name: 'All donate',
        to: '/dashboard/donut',
      },
      {
        name: 'Ny donate',
        to: '/dashboard/donut/newDonut',
      },
    ],
  },
  {
    title: 'Forside',
    links: [
      {
        name: 'Description',
        to: '/dashboard/forside/welcome-description',
      },
      {
        name: 'Images',
        to: '/dashboard/forside/welcome-images',
      },
    ],
  },
  {
    name: 'Chat',
    to: '/dashboard/chat',
  },
];
