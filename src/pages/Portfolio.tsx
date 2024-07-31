import { ProjectContentValue } from '@variables/ProjectContentValuePortfolio';

import { ProjectContext } from '@components/Context/ProjectContext';
import Projects from '@components/Projects';

const Portfolio = () => {
  return (
    <ProjectContext.Provider value={ProjectContentValue}>
      <Projects />
    </ProjectContext.Provider>
  );
};

export default Portfolio;
