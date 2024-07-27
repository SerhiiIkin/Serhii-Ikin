import { ProjectContentValue } from '@variables/ProjectContentValuePortfolio';

import { ProjectContext } from '@components/Context/ProjectContext';
import IndexLayout from '@components/Layouts/IndexLayout';
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
