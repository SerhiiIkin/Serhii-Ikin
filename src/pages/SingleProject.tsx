import { useQuery } from '@tanstack/react-query';
import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

import FetchDataHandler from '@layouts/FetchDataHandler';
import SectionLayout from '@layouts/SectionLayout';

import { ProjectContext } from '@context/ProjectContext';

import Loader from '@components/Loader';

import { getSingleProjectAxios } from '@utils/axios';

import { ProjectContentSingleValue } from '@variables/ProjectContentSingleValue';

const ProjectContent = lazy(() => import('@components/ProjectContent'));

const SingleProject = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ['project'],
    queryFn: () => getSingleProjectAxios(id ?? ''),
  });

  return (
    <SectionLayout>
      <FetchDataHandler
        data={{ data, error: error?.message ? error.message : '', isLoading }}
      >
        <ProjectContext.Provider value={ProjectContentSingleValue}>
          <Suspense fallback={<Loader />}>
            {data && <ProjectContent {...data} />}
          </Suspense>
        </ProjectContext.Provider>
      </FetchDataHandler>
    </SectionLayout>
  );
};

export default SingleProject;
