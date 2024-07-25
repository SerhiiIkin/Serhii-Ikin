import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { ProjectContentSingleValue } from '@variables/ProjectContentSingleValue';

import FetchDataHandler from '@components/Layouts/FetchDataHandlerLayout';
import IndexLayout from '@components/Layouts/IndexLayout';
import { ProjectContext } from '@components/Layouts/ProjectContext';
import SectionLayout from '@components/Layouts/SectionLayout';
import ProjectContent from '@components/ProjectContent';

import axios from '@utils/axios';

const SingleProject = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => axios.get(`api/projects/${id}`).then(res => res.data),
  });

  return (
    <IndexLayout>
      <SectionLayout>
        <FetchDataHandler
          data={{ data, error: error?.message ? error.message : '', isLoading }}
        >
          <ProjectContext.Provider value={ProjectContentSingleValue}>
            <ProjectContent {...data} />
          </ProjectContext.Provider>
        </FetchDataHandler>
      </SectionLayout>
    </IndexLayout>
  );
};

export default SingleProject;
