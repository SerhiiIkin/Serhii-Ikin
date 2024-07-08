import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

import type { ProjectType } from '@modules/ProjectType';

import FetchDataHandler from '@components/Layouts/FetchDataHandlerLayout';
import { ProjectContext } from '@components/Layouts/ProjectContext';
import SectionLayout from '@components/Layouts/SectionLayout';
import ProjectContent from '@components/ProjectContent';

import axios from '@utils/axios';
import { classes } from '@utils/classes';

const Projects = () => {
  const { classNameProjects } = useContext(ProjectContext);
  const { data, error, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => axios.get('api/projects').then(res => res.data),
  });

  return (
    <SectionLayout
      className={classes(['', classNameProjects.section ?? ''])}
      classNameContainer={classes([
        'grid grid-cols-auto-fit gap-4',
        classNameProjects.container ?? '',
      ])}
    >
      <FetchDataHandler
        data={{ data, error: error?.message ? error.message : '', isLoading }}
      >
        {data?.map((project: ProjectType) => {
          return <ProjectContent key={project._id} {...project} />;
        })}
      </FetchDataHandler>
    </SectionLayout>
  );
};

export default Projects;
