import { useMutation, useQueryClient } from '@tanstack/react-query';
import { lazy, useContext, useMemo } from 'react';
import type { MouseEvent } from 'react';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import ProjectLayout from '@layouts/ProjectLayout';

import { ProjectContext } from '@context/ProjectContext';
import { ToastContext } from '@context/ToastContext';

import Button from '@components/Button';
import Title from '@components/Title';

import Multilanguage from '@utils/Multilanguage';
import { deleteProjectAxios, removeImagesAxios } from '@utils/axios';
import { classes } from '@utils/classes';

import type { ProjectContentProps } from '@modules/ProjectContentProps';

const ImageSlider = lazy(() => import('@components/ImageSlider'));

const ProjectContent = ({
  _id,
  images,
  title,
  description,
  link,
}: ProjectContentProps) => {
  const { isAdmin, isDescription, classNameProject, isSlider, isLink, isMore } =
    useContext(ProjectContext);
  const toast = useContext(ToastContext);
  const navigate = useNavigate();
  const linkText = Multilanguage({
    ukr: 'Подивитись онлайн / GitHub',
    eng: 'View online / GitHub',
    dk: 'Se online / GitHub',
  });
  const titleMultilanguage = Multilanguage(title);
  const descriptionMultilanguage = Multilanguage(description);

  const queryClient = useQueryClient();

  const imagesURL = useMemo(
    () =>
      images != undefined && images?.length > 0
        ? images?.map(image => image.fileUrl)
        : [],
    [images]
  );

  const removeImages = useMutation({
    mutationFn: async (folderName: string) => removeImagesAxios(folderName),
    onSuccess: (data: { message?: string }) => {
      if (data?.message) {
        toast.success('Картинки видалено з серверу');
      }
    },
    onError: error => toast.error(error.message),
  });

  const removeProjectMutation = useMutation({
    mutationKey: ['projects'],
    mutationFn: async () => deleteProjectAxios(_id ?? ''),
    onSuccess: (data: { message?: string }) => {
      if (data?.message) {
        toast.success('Проєкт успішно видалено');
      }
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: err => toast.error(err.message),
  });

  const removeProject = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const folderName = images[0]?.fileName.split('/')[0];
    removeProjectMutation.mutate();
    removeImages.mutate(folderName);
  };

  const navigateToEdit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`editProject/${_id}`);
  };

  return (
    <ProjectLayout
      isMore={isMore ?? false}
      id={_id ?? ''}
      classNameProject={classNameProject}
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
        <ImageSlider
          images={imagesURL}
          imageClasses={classNameProject?.img}
          isSlider={isSlider ?? false}
        />

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
