import { useQuery } from '@tanstack/react-query';
import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

import { ProjectContentSingleValue } from '@variables/ProjectContentSingleValue';

import { ProjectContext } from '@components/Context/ProjectContext';
import FetchDataHandler from '@components/Layouts/FetchDataHandlerLayout';
import SectionLayout from '@components/Layouts/SectionLayout';
import Loader from '@components/Loader';

import { getSingleProjectAxios } from '@utils/axios';

const ProjectContent = lazy(() => import('@components/ProjectContent'));

const SingleProject = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getSingleProjectAxios(id ?? ''),
  });

  return (
    <SectionLayout>
      <FetchDataHandler
        data={{ data, error: error?.message ? error.message : '', isLoading }}
      >
        <ProjectContext.Provider value={ProjectContentSingleValue}>
          <Suspense fallback={<Loader />}>
            <ProjectContent {...data} />
          </Suspense>
        </ProjectContext.Provider>
      </FetchDataHandler>
    </SectionLayout>
  );
};

export default SingleProject;
