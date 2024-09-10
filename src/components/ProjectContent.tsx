import { lazy, useContext } from 'react';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import ProjectLayout from '@layouts/ProjectLayout';

import { ProjectContext } from '@context/ProjectContext';

import Button from '@components/Button';
import Title from '@components/Title';

import { useProjectContent } from '@hooks/useProjectContent';

import { classes } from '@utils/classes';

import type { ProjectContentProps } from '@modules/ProjectContentProps';

const Carousel = lazy(() => import('@components/Carousel'));

const ProjectContent = (props: ProjectContentProps) => {
  const { _id, link } = props;
  const { isAdmin, isDescription, classNameProject, isLink, isMore } =
    useContext(ProjectContext);

  const {
    linkText,
    titleMultilanguage,
    descriptionMultilanguage,
    config,
    navigateToEdit,
    removeProject,
  } = useProjectContent({ ...props });

  return (
    <ProjectLayout
      isMore={isMore ?? false}
      id={_id ?? ''}
      classNameProject={classNameProject ?? {}}
    >
      <>
        <Title
          typeTitle="h2"
          className={classes([
            'capitalize text-primaryDarkBlue duration-1000 xl:group-hover:text-secondaryGrey',
            classNameProject?.title ?? '',
          ])}
        >
          {titleMultilanguage}
        </Title>
        <Carousel {...config} />

        {isDescription && (
          <p
            className={classes([
              'text-primaryDark duration-500 xl:group-hover:text-primaryLigth',
              classNameProject?.description ?? '',
            ])}
          >
            {descriptionMultilanguage}
          </p>
        )}
        {isLink && (
          <Link
            target="_blank"
            to={link}
            className="self-start bg-primaryDarkBlue px-4 py-2 text-primaryLigth duration-500 xl:hover:bg-primaryOrange"
          >
            {linkText}
          </Link>
        )}
        <div className={'mt-auto flex gap-2 sm:pb-0'}>
          {isAdmin && (
            <Button onClick={navigateToEdit} type="button">
              <FaEdit />
            </Button>
          )}
          {isAdmin && (
            <Button onClick={removeProject} type="button">
              <FaRegTrashAlt />
            </Button>
          )}
        </div>
      </>
    </ProjectLayout>
  );
};

export default ProjectContent;
