import { ProjectContentValue } from '@variables/ProjectContentValueDashboard';

import DashboardLayout from '@components/Layouts/DashboardLayout';
import { ProjectContext } from '@components/Layouts/ProjectContext';
import SectionLayout from '@components/Layouts/SectionLayout';
import Projects from '@components/Projects';

const Dashboard = () => {
  return (
    <SectionLayout>
      <DashboardLayout>
        <ProjectContext.Provider value={ProjectContentValue}>
          <Projects />
        </ProjectContext.Provider>
      </DashboardLayout>
    </SectionLayout>
  );
};

export default Dashboard;
