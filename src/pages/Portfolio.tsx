import { ProjectContext } from '@context/ProjectContext';

import Projects from '@components/Projects';

import { ProjectContentValue } from '@variables/ProjectContentValuePortfolio';

const Portfolio = () => {
  return (
    <ProjectContext.Provider value={ProjectContentValue}>
      <Projects />
    </ProjectContext.Provider>
  );
};

export default Portfolio;
