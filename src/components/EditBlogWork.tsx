import SectionLayout from '@layouts/SectionLayout';

import FormCreateJob from '@components/FormCreateJob';
import SectionJobsDashboard from '@components/SectionJobsDashboard';

const EditBlogWork = () => {
  return (
    <SectionLayout>
      <FormCreateJob />
      <SectionJobsDashboard />
    </SectionLayout>
  );
};

export default EditBlogWork;
