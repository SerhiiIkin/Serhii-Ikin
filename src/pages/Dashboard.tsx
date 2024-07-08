import DashboardLayout from '@components/Layouts/DashboardLayout';
import { ProjectContext } from '@components/Layouts/ProjectContext';
import SectionLayout from '@components/Layouts/SectionLayout';
import Projects from '@components/Projects';

const Dashboard = () => {
  const ProjectContentValue = {
    isAdmin: true,
    isDescription: false,
    classNameProject: {},
    classNameProjects: {},
  };

  return (
    <SectionLayout className="min-h-screen bg-gradient-to-b from-primaryLigthBlue to-primaryGreen">
      <DashboardLayout>
        <ProjectContext.Provider value={ProjectContentValue}>
          <Projects />
        </ProjectContext.Provider>
      </DashboardLayout>
    </SectionLayout>
  );
};

export default Dashboard;
