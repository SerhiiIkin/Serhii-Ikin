import { useQuery } from '@tanstack/react-query';
import { useContext, useMemo } from 'react';

import type { ProjectType } from '@modules/ProjectType';

import FetchDataHandler from '@components/Layouts/FetchDataHandlerLayout';
import { ProjectContext } from '@components/Layouts/ProjectContext';
import SectionLayout from '@components/Layouts/SectionLayout';
import ProjectContent from '@components/ProjectContent';
import Title from '@components/Title';

import Multilanguage from '@utils/Multilanguage';
import axios from '@utils/axios';
import { classes } from '@utils/classes';

const Projects = () => {
  const { classNameProjects, title, isFavorites } = useContext(ProjectContext);
  const { data, error, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => axios.get('api/projects').then(res => res.data),
  });

  const projects = useMemo(
    () =>
      data?.length && isFavorites
        ? data?.filter((project: ProjectType) => project.isFavorite)
        : data,
    [data, isFavorites]
  );

  const favoritesProject = Multilanguage({
    ukr: 'Не маю найулюбленіших проектів',
    eng: "I don't have favorite projectss",
    dk: 'Jeg har ikke yndlingsprojekter',
  });

  return (
    <SectionLayout className={classes(['', classNameProjects?.section ?? ''])}>
      <Title typeTitle="h2" className="bg- bg-transparent text-primaryOrange">
        {title}
      </Title>
      <FetchDataHandler
        data={{ data, error: error?.message ? error.message : '', isLoading }}
      >
        <article
          className={classes([
            'grid grid-cols-auto-fit gap-4',
            classNameProjects?.container ?? '',
          ])}
        >
          {projects?.length
            ? projects?.map((project: ProjectType) => {
                return <ProjectContent key={project._id} {...project} />;
              })
            : favoritesProject}
        </article>
      </FetchDataHandler>
    </SectionLayout>
  );
};

export default Projects;
