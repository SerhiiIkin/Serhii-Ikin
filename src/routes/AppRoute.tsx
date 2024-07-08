import { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import IndexLayout from '@components/Layouts/IndexLayout';
import NewProject from '@components/NewProject';

const Home = lazy(() => import('@pages/Home'));
const About = lazy(() => import('@pages/About'));
const Dashboard = lazy(() => import('@pages/Dashboard'));
const HelpUkraine = lazy(() => import('@pages/HelpUkraine'));
const NotFounded = lazy(() => import('@pages/404'));
const Portfolio = lazy(() => import('@pages/Portfolio'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <IndexLayout>
        <Home />
      </IndexLayout>
    ),
  },
  {
    path: '/about',
    element: (
      <IndexLayout>
        <About />
      </IndexLayout>
    ),
  },
  {
    path: '/portfolio',
    element: (
      <IndexLayout>
        <Portfolio />
      </IndexLayout>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <IndexLayout>
        <Dashboard />
      </IndexLayout>
    ),
  },
  {
    path: '/dashboard/newProject',
    element: <NewProject />,
  },
  {
    path: '/helpUkraine',
    element: (
      <IndexLayout>
        <HelpUkraine />
      </IndexLayout>
    ),
  },
  {
    path: '*',
    element: (
      <IndexLayout>
        <NotFounded />
      </IndexLayout>
    ),
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
