import { ProjectContext } from '@context/ProjectContext';

import Projects from '@components/Projects';

import { ProjectContentValue } from '@variables/ProjectContentValueDashboard';

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
