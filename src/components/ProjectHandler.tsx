import DashboardLayout from '@components/Layouts/DashboardLayout';
import IndexLayout from '@components/Layouts/IndexLayout';
import SectionLayout from '@components/Layouts/SectionLayout';
import ProjectForm from '@components/ProjectForm';
import Title from '@components/Title';

const ProjectHandler = () => {
  return (
    <IndexLayout>
      <SectionLayout>
        <DashboardLayout>
          <Title typeTitle="h1"> Project handler </Title>
          <ProjectForm />
        </DashboardLayout>
      </SectionLayout>
    </IndexLayout>
  );
};

export default ProjectHandler;
