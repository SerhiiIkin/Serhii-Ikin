import { useQuery } from '@tanstack/react-query';
import { Suspense, lazy, useContext, useMemo } from 'react';

import FetchDataHandler from '@layouts/FetchDataHandler';
import SectionLayout from '@layouts/SectionLayout';

import { ProjectContext } from '@context/ProjectContext';

import Loader from '@components/Loader';
import Title from '@components/Title';

import Multilanguage from '@utils/Multilanguage';
import { getProjects } from '@utils/axios';
import { classes } from '@utils/classes';

import type { ProjectType } from '@modules/ProjectType';

const ProjectContent = lazy(() => import('@components/ProjectContent'));

const Projects = () => {
  const { classNameProjects, title, isFavorites } = useContext(ProjectContext);
  const { data, error, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const projects = useMemo(
    () =>
      data?.length > 0 && isFavorites
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
    <>
      <SectionLayout
        className={classes(['', classNameProjects?.section ?? ''])}
      >
        <Title typeTitle="h2" className="">
          {title}
        </Title>
        <FetchDataHandler
          data={{
            data,
            error: error?.message ? error.message : '',
            isLoading,
          }}
        >
          <article
            className={classes([
              'grid grid-cols-auto-fit gap-4 md:gap-6 xl:gap-8',
              classNameProjects?.container ?? '',
            ])}
          >
            {projects?.length
              ? projects?.map((project: ProjectType) => {
                  return (
                    <Suspense key={project._id} fallback={<Loader />}>
                      <ProjectContent {...project} />
                    </Suspense>
                  );
                })
              : favoritesProject}
          </article>
        </FetchDataHandler>
      </SectionLayout>
    </>
  );
};

export default Projects;
