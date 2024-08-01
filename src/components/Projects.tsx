import { useQuery } from '@tanstack/react-query';
import { Suspense, lazy, useContext, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import type { ProjectType } from '@modules/ProjectType';

import { ProjectContext } from '@components/Context/ProjectContext';
import FetchDataHandler from '@components/Layouts/FetchDataHandlerLayout';
import SectionLayout from '@components/Layouts/SectionLayout';
import Loader from '@components/Loader';
import Title from '@components/Title';

import Multilanguage from '@utils/Multilanguage';
import { getProjects } from '@utils/axios';
import { classes } from '@utils/classes';

const ProjectContent = lazy(() => import('@components/ProjectContent'));

const Projects = () => {
  const { classNameProjects, title, isFavorites } = useContext(ProjectContext);
  const { data, error, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
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
    <>
      <SectionLayout
        className={classes(['', classNameProjects?.section ?? ''])}
      >
        <Title typeTitle="h2" className="bg- bg-transparent text-primaryOrange">
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
              'grid grid-cols-auto-fit gap-4',
              classNameProjects?.container ?? '',
            ])}
          >
            {projects?.length
              ? projects?.map((project: ProjectType) => {
                  return (
                    <Suspense key={project._id} fallback={<Loader />}>
                      <ProjectContent {...project} toast={toast} />
                    </Suspense>
                  );
                })
              : favoritesProject}
          </article>
        </FetchDataHandler>
      </SectionLayout>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default Projects;
