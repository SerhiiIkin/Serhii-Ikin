import { useQuery } from '@tanstack/react-query';

import FetchDataHandler from '@layouts/FetchDataHandler';
import SectionLayout from '@layouts/SectionLayout';

import JobDashboard from '@components/JobDashboard';
import Title from '@components/Title';

import { getJobsAxios } from '@utils/axios';

import type { JobType } from '@modules/JobType';

const SectionJobsDashboard = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: getJobsAxios,
  });

  return (
    <SectionLayout>
      <Title typeTitle="h1">Jobs Dashboard</Title>
      <FetchDataHandler data={{ data, error: error?.message ?? '', isLoading }}>
        {data?.map((job: JobType) => <JobDashboard key={job._id} {...job} />)}
      </FetchDataHandler>
    </SectionLayout>
  );
};

export default SectionJobsDashboard;
