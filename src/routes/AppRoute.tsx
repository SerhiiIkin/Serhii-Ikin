import { lazy } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import DashboardLayout from '@layouts/DashboardLayout';
import IndexLayout from '@layouts/IndexLayout';

import { ErrorBoundary } from '@pages/ErrorBoundary';

import Loader from '@components/Loader';

import ProtectedRoute from '@routes/ProtectedRoute';

const Home = lazy(() => import('@pages/Home'));
const Blog = lazy(() => import('@pages/Blog'));
const Dashboard = lazy(() => import('@pages/Dashboard'));
const HelpUkraine = lazy(() => import('@pages/HelpUkraine'));
const NotFounded = lazy(() => import('@pages/404'));
const Portfolio = lazy(() => import('@pages/Portfolio'));
const SingleProject = lazy(() => import('@pages/SingleProject'));
const ChatDashboard = lazy(() => import('@components/ChatDashboard'));
const Donate = lazy(() => import('@components/Donate'));
const DonutHandler = lazy(() => import('@components/DonutHandler'));
const ProjectHandler = lazy(() => import('@components/ProjectHandler'));
const ForsideEditWelcomeImage = lazy(
  () => import('@components/ForsideEditWelcomeImage')
);
const EditForsideSkills = lazy(() => import('@components/EditForsideSkills'));
const ListSectionTitleText = lazy(
  () => import('@components/ListSectionTitleText')
);

const EditBlogWork = lazy(() => import('@components/EditBlogWork'));

const router = createBrowserRouter([
  {
    element: (
      <IndexLayout>
        <Outlet />
      </IndexLayout>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Home />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: '/blog',
        element: <Blog />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: '/portfolio',
        element: <Portfolio />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: '/portfolio/:id',
        element: <SingleProject />,
        errorElement: <ErrorBoundary />,
      },
      {
        element: (
          <ProtectedRoute
            element={
              <DashboardLayout>
                <Outlet />
              </DashboardLayout>
            }
          />
        ),
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: '/dashboard/newProject',
            element: <ProjectHandler />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: '/dashboard/editProject/:id',
            element: <ProjectHandler />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: '/dashboard/donut',
            element: <Donate />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: '/dashboard/donut/newDonut',
            element: <DonutHandler />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: '/dashboard/donut/editDonut/:id',
            element: <DonutHandler />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: '/dashboard/chat',
            element: <ChatDashboard />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: '/dashboard/chat/:id',
            element: <ChatDashboard />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: '/dashboard/forside/welcome-images',
            element: <ForsideEditWelcomeImage />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: '/dashboard/forside/welcome-skills',
            element: <EditForsideSkills />,
            errorElement: <ErrorBoundary />,
          },

          {
            path: '/dashboard/section-title-description',
            element: <ListSectionTitleText />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: '/dashboard/blog/work',
            element: <EditBlogWork />,
            errorElement: <ErrorBoundary />,
          },
        ],
      },

      {
        path: '/helpUkraine',
        element: <HelpUkraine />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: '*',
        element: <NotFounded />,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);

const AppRouter = () => {
  return (
    <RouterProvider
      fallbackElement={<Loader />}
      future={{ v7_startTransition: true }}
      router={router}
    />
  );
};

export default AppRouter;
