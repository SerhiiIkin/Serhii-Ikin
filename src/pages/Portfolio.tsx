import { ProjectContentValue } from '@variables/ProjectContentValuePortfolio';

import IndexLayout from '@components/Layouts/IndexLayout';
import { ProjectContext } from '@components/Layouts/ProjectContext';
import Projects from '@components/Projects';

const Portfolio = () => {
  return (
    <IndexLayout>
      <ProjectContext.Provider value={ProjectContentValue}>
        <Projects />
      </ProjectContext.Provider>
    </IndexLayout>
  );
};

export default Portfolio;
