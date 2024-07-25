import { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Donate from '@components/Donate';
import DonutHandler from '@components/DonutHandler';
import IndexLayout from '@components/Layouts/IndexLayout';
import ProjectHandler from '@components/ProjectHandler';

const Home = lazy(() => import('@pages/Home'));
const About = lazy(() => import('@pages/About'));
const Dashboard = lazy(() => import('@pages/Dashboard'));
const HelpUkraine = lazy(() => import('@pages/HelpUkraine'));
const NotFounded = lazy(() => import('@pages/404'));
const Portfolio = lazy(() => import('@pages/Portfolio'));
const SingleProject = lazy(() => import('@pages/SingleProject'));

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
    path: '/portfolio/:id',
    element: (
      <IndexLayout>
        <SingleProject />
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
    element: <ProjectHandler />,
  },
  {
    path: '/dashboard/editProject/:id',
    element: <ProjectHandler />,
  },
  {
    path: '/dashboard/donut',
    element: <Donate />,
  },
  {
    path: '/dashboard/donut/newDonut',
    element: <DonutHandler />,
  },
  {
    path: '/dashboard/donut/editDonut/:id',
    element: <DonutHandler />,
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
