import HandleProjectForms from '@components/HandleProjectForms';
import DashboardLayout from '@components/Layouts/DashboardLayout';
import IndexLayout from '@components/Layouts/IndexLayout';
import SectionLayout from '@components/Layouts/SectionLayout';

const NewProject = () => {
  return (
    <IndexLayout>
      <SectionLayout className="min-h-screen bg-gradient-to-b from-primaryLigthBlue to-primaryGreen">
        <DashboardLayout>
          <HandleProjectForms />
        </DashboardLayout>
      </SectionLayout>
    </IndexLayout>
  );
};

export default NewProject;
