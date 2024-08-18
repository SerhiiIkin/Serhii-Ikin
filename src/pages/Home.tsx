import { lazy } from 'react';

import { ProjectContext } from '@context/ProjectContext';

import Welcome from '@components/Welcome';

import { ProjectContentValueHomePage } from '@variables/ProjectContentValueHomePage';

const Projects = lazy(() => import('@components/Projects'));

const Home = () => {
  return (
    <>
      <Welcome />
      <ProjectContext.Provider value={ProjectContentValueHomePage()}>
        <Projects />
      </ProjectContext.Provider>
    </>
  );
};

export default Home;
