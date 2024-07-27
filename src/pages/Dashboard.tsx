import { ProjectContentValue } from '@variables/ProjectContentValueDashboard';

import { ProjectContext } from '@components/Context/ProjectContext';
import Projects from '@components/Projects';

const Dashboard = () => {
  return (
    <>
      <ProjectContext.Provider value={ProjectContentValue}>
        <Projects />
      </ProjectContext.Provider>
    </>
  );
};

export default Dashboard;
