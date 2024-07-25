import DonutForm from '@components/DonutForm';
import DashboardLayout from '@components/Layouts/DashboardLayout';
import IndexLayout from '@components/Layouts/IndexLayout';
import SectionLayout from '@components/Layouts/SectionLayout';
import Title from '@components/Title';

const DonutHandler = () => {
  return (
    <IndexLayout>
      <SectionLayout>
        <DashboardLayout>
          <Title typeTitle="h1"> Donut handler </Title>
          <DonutForm />
        </DashboardLayout>
      </SectionLayout>
    </IndexLayout>
  );
};

export default DonutHandler;
